const should = require('should');
const request = require('supertest');
const seneca = require('seneca');

const app = require('../../app');

const consumerMicroservice = seneca();

const microservicesDecorator = require('../../start-microservices-decorator-for-testing');

const knownAdmin = {
  username: 'admin',
  password: '5ivel!fe'
}

describe('Setup', function() {
  this.timeout(10000);
  it('Start all microservices', function(done) {
    this.timeout(10000);
    microservicesDecorator.startAllMicroservices(done);
  });

  it('Consumer Microservice', function(done) {
    consumerMicroservice.use('mesh');
    consumerMicroservice.ready(done);
  });

  it('Delete all accounts', function(done) {
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

  it('Change Password without token', function(done) {
    request(app)
    .put('/api/v1/account')
    .send({oldPassword: knownAdmin.password, password: 'newPassword'})
    .expect(404, done);
  });

  var token;

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

  it('Change Password with token', function(done) {
    request(app)
    .put('/api/v1/account')
    .set('JWT', token)
    .send({oldPassword: knownAdmin.password, password: 'newPassword'})
    .expect(200, done);
  });
});

describe('Teardown', function() {
  it('Stop all microservices', function(done) {
    microservicesDecorator.stopAllMicroservices(done);
  });
});
