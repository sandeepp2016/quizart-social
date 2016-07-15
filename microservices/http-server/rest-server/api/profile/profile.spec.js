const should = require('should');
const request = require('supertest');
const seneca = require('seneca');

const app = require('../../app');

const consumerMicroservice = seneca();

const microservicesDecorator = require('../../start-microservices-decorator-for-testing');

const profile = {
  username:"SomeName",
  name:"SomeNmae",
  imageLink:"http://lorempixel.com/600/337/nature/",
  age:"25",
  country:"SomeCountry",
  totalGames:"5",
  }

describe('Setup', function() {
  it('Start all microservices', function(done) {
    microservicesDecorator.startAllMicroservices(done);
  });

  it('Consumer Microservice', function(done) {
    consumerMicroservice.use('mesh');
    consumerMicroservice.ready(done);
  });

  it('Delete all profiles', function(done) {
    consumerMicroservice.act('role:authentication,cmd:dangerouslyDeleteAllProfile', function(err, response) {
      if(err) { done(err); }
      response.should.have.property('response');
      response.response.should.be.exactly('success');
      done();
    });
  });
});

describe('Profile Microservice API', function() {
  var createdProfileId;
  it('Create a profile', function(done) {
    request(app)
    .post('/api/v1/profile')
    .send(profile)
    .expect(201)
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      if(err) { return done(err); }
      res.body.should.have.property('_id');
      createdProfileId = res.body[0]._id;
      res.body.should.have.property('username');
      res.body.username.should.be.exactly(profile.username);
      res.body.should.have.property('name');
      res.body.name.should.be.exactly(profile.name);
      res.body.should.have.property('imageLink');
      res.body.imageLink.should.be.exactly(profile.imageLink);
      res.body.should.have.property('age');
      res.body.age.should.be.exactly(profile.age);
      res.body.should.have.property('country');
      res.body.country.should.be.exactly(profile.country);
      res.body.should.have.property('totalGames');
      res.body.totalGames.should.be.exactly(profile.totalGames);
      res.body.should.have.property('userId');
      res.body.userId.should.be.exactly(profile.userId);
      done();
    });
  });

  it('Retrieve all profile', function(done) {
    request(app)
    .get('/api/v1/profile')
    .expect(201)
    .end(function(err, res) {
      if(err) { return done(err); }
      res.body[0].should.have.property('_id');
      createdProfileId = res.body[0]._id;
      res.body[0].should.have.property('username');
      res.body[0].username.should.be.exactly(profile.username);
      res.body[0].should.have.property('name');
      res.body[0].name.should.be.exactly(profile.name);
      res.body[0].should.have.property('imageLink');
      res.body[0].imageLink.should.be.exactly(profile.imageLink);
      res.body[0].should.have.property('age');
      res.body[0].age.should.be.exactly(profile.age);
      res.body[0].should.have.property('country');
      res.body[0].country.should.be.exactly(profile.country);
      res.body[0].should.have.property('totalGames');
      res.body[0].totalGames.should.be.exactly(profile.totalGames);
      res.body[0].should.have.property('userId');
      res.body[0].userId.should.be.exactly(profile.userId);
      done();
    });
  });

});

describe('Teardown', function() {
  it('Stop all microservices', function(done) {
    microservicesDecorator.stopAllMicroservices(done);
  });
});
