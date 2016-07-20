const should = require('should');
const request = require('supertest');
const seneca = require('seneca');
const app = require('../../app');
const consumerMicroservice = seneca();
const microservicesDecorator = require('../../start-microservices-decorator-for-testing');
const knownAdmin = {
  username: 'sandeep',
  password: 'abc123'
}
var token;
var authToken;
var id = "EngvsPak";

describe('Setup', function() {
  it('Start all microservices', function(done) {
    this.timeout(5000);
    microservicesDecorator.startAllMicroservices(done);
  });

  it('Consumer Microservice', function(done) {
    this.timeout(5000);
    consumerMicroservice.use('mesh');
    consumerMicroservice.ready(done);
  });

  it('Delete all accounts', function(done) {
      this.timeout(5000);
    consumerMicroservice.act('role:authentication,cmd:dangerouslyDeleteAllAccounts', function(err, response) {
      if(err) { done(err); }
      response.should.have.property('response');
      response.response.should.be.exactly('success');
      done();
    });
  });
});

describe('Accounts API', function() {
  it('Create account from API', function(done) {
     request(app)
    .post('/api/v1/account')
    .send(knownAdmin)
    .expect(201, done);
  });



  it('Generate JWT Token', function(done) {
    consumerMicroservice.act('role:jwt,cmd:generate', knownAdmin, function(err, response) {
      if(err) { return done(err); }
      response.should.have.property('response');
      response.response.should.be.exactly('success');
      response.should.have.property('token');
      token = response.token;
      done();
    });
  });
});

describe("timeline tests",function(){

 it("timeline api create twitter auth token",function(done){
     this.timeout(6000);
     request(app)
    .get('/api/v1/timeline/twitter/createAuthToken')
    .set('JWT', token)
    .expect(201)
    .expect('Content-Type', /json/)
    .end(function(err,res){
      if(err) { return done(err); }
          res.body.should.have.property("authToken");
          authToken = res.body.authToken;
          console.log("====authToken",authToken);
        done();
    });

 });

 it("timeline api get twitter data",function(done){
     this.timeout(6000);
     request(app)
    .get('/api/v1/timeline/twitter/getTwitterData/'+id)
    .set('JWT', authToken)
    .expect(201)
    .expect('Content-Type', /json/)
    .end(function(err,res){
      if(err) { return done(err); }
          res.body.should.have.property("success");
        //  authToken = res.body.authToken;
          console.log("====",authToken);
        done();
    });

 });


 it("timeline api post to twitter ",function(done){
     this.timeout(6000);
     request(app)
    .get('/api/v1/timeline/twitter/postToTwitter')
    .set('JWT', authToken)
    .expect(201)
    .expect('Content-Type', /json/)
    .end(function(err,res){
      if(err) { return done(err); }
        //  res.body.should.have.property("success");
          //authToken = res.body.authToken;
        
        done();
    });

 });



});

describe('Teardown', function() {
  it('Stop all microservices', function(done) {
    microservicesDecorator.stopAllMicroservices(done);
  });
});
