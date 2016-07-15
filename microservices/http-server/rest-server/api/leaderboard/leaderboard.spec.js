const should = require('should');
const request = require('supertest');
const seneca = require('seneca');

const app = require('../../app');

const consumerMicroservice = seneca();

const microservicesDecorator = require('../../start-microservices-decorator-for-testing');

const leaderboardToCreate = {
  leaderboard: [
    {
      name: '1@gmail.com',
      score: 50
    },
    {
      name: '2@gmail.com',
      score: 40
    },
    {
      name: '3@gmail.com',
      score: 30
    }
  ]
};

describe('Setup', function() {
  this.timeout(100000);
  it('Start all microservices', function(done) {
    this.timeout(100000);
    microservicesDecorator.startAllMicroservices(done);
  });

  it('Consumer Microservice', function(done) {
    consumerMicroservice.use('mesh');
    consumerMicroservice.ready(done);
  });

  it('Clear leaderboards collection', function(done) {
    consumerMicroservice.act('role:leaderboards,cmd:dangerouslyDeleteAllLeaderboards', function(err, response) {
      if(err) { return done(err); }
      response.should.have.property('response');
      response.response.should.be.exactly('success');
      done();
    });
  });
});

describe('Leaderboards Microservice API', function() {
  this.timeout(100000);
  var createdLeaderboardId;
  it('Create a leaderboard', function(done) {
    request(app)
    .post('/api/v1/leaderboard')
    .send(leaderboardToCreate)
    .expect(201)
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      console.log('\n\n'+JSON.stringify(res.body)+'\n\n');
      if(err) { return done(err); }
      res.body.should.have.property('_id');
      createdLeaderboardId = res.body._id;
      res.body.should.have.property('leaderboard');
      res.body.leaderboard.should.be.instanceof(Array);
      res.body.leaderboard.length.should.be.exactly(3);
      res.body.leaderboard[0].should.have.property('name');
      res.body.leaderboard[0].name.should.be.exactly(leaderboardToCreate.leaderboard[0].name);
      res.body.leaderboard[0].should.have.property('score');
      res.body.leaderboard[0].score.should.be.exactly(leaderboardToCreate.leaderboard[0].score);
      res.body.leaderboard[1].should.have.property('name');
      res.body.leaderboard[1].name.should.be.exactly(leaderboardToCreate.leaderboard[1].name);
      res.body.leaderboard[1].should.have.property('score');
      res.body.leaderboard[1].score.should.be.exactly(leaderboardToCreate.leaderboard[1].score);
      res.body.leaderboard[2].should.have.property('name');
      res.body.leaderboard[2].name.should.be.exactly(leaderboardToCreate.leaderboard[2].name);
      res.body.leaderboard[2].should.have.property('score');
      res.body.leaderboard[2].score.should.be.exactly(leaderboardToCreate.leaderboard[2].score);
      done();
    });
  });

  it('Retrieve leaderboard by id', function(done) {
    request(app)
    .get('/api/v1/leaderboard/'+createdLeaderboardId)
    .expect(200)
    .end(function(err, res) {
      console.log('\n\n'+createdLeaderboardId+"   "+JSON.stringify(res.body)+'\n\n');
      if(err) { return done(err); }
      res.body.should.have.property('leaderboard');
      res.body.leaderboard[0].should.have.property('name');
      res.body.leaderboard[0].name.should.be.exactly(leaderboardToCreate.leaderboard[0].name);
      res.body.leaderboard[0].should.have.property('score');
      res.body.leaderboard[0].score.should.be.exactly(leaderboardToCreate.leaderboard[0].score);
      res.body.leaderboard[1].should.have.property('name');
      res.body.leaderboard[1].name.should.be.exactly(leaderboardToCreate.leaderboard[1].name);
      res.body.leaderboard[1].should.have.property('score');
      res.body.leaderboard[1].score.should.be.exactly(leaderboardToCreate.leaderboard[1].score);
      res.body.leaderboard[2].should.have.property('name');
      res.body.leaderboard[2].name.should.be.exactly(leaderboardToCreate.leaderboard[2].name);
      res.body.leaderboard[2].should.have.property('score');
      res.body.leaderboard[2].score.should.be.exactly(leaderboardToCreate.leaderboard[2].score);
      done();
    });
  });
});

describe('Teardown', function() {
  it('Stop all microservices', function(done) {
    microservicesDecorator.stopAllMicroservices(done);
  });
});
