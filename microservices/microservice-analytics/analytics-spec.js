var should = require('should');
var seneca = require('seneca');

const baseMicroservice = seneca();
const timelineMicroservice = seneca();
const consumerMicroservice = seneca();``

const newpost = {
  userId: String,
  gameId: String,
  tournamentId: String,
  topicId: String,
  responseType : String,
  responseTime: Number
};

describe('Setup', function() {
  it('Setup Mesh Base', function(done) {
    baseMicroservice.use('mesh', {base:true});
    baseMicroservice.ready(done);
  });

  it('Setup Analytics Microservice', function(done) {
    this.timeout(10000);
    timelineMicroservice.use('.', {
      mongoUrl: 'mongodb://localhost:27017/analytics-test'
    });

    timelineMicroservice.use('mesh', {auto:true, pin:'role:analytics,type:user,cmd:*'});
    timelineMicroservice.ready(done);

  });

  it('Setup Consumer Microservice', function(done) {
    consumerMicroservice.use('mesh');
    consumerMicroservice.ready(done);
  });
});


describe('User Analytics', function() {

  it('post', function(done) {
    consumerMicroservice.act('role:analytics,cmd:create,type:user',newpost, function(err, response) {
      if(err) { return done(err); }
      response.should.have.property('response');
      response.response.should.be.exactly('success');
      response.should.have.property('Id');
      console.log("======"+response.postId+"========");
      done();
    });
});
});
