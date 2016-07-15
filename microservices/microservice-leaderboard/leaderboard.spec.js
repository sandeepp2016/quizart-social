var should = require('should');

var seneca = require('seneca');

const baseMicroservice = seneca();
const leaderboardMicroservice = seneca();
const consumerMicroservice = seneca();

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
  this.timeout(5000);
  it('Mesh Base', function(done) {
    baseMicroservice.use('mesh', {base:true});
    baseMicroservice.ready(done);
  });

  it('Leaderboard Microservice', function(done) {
    leaderboardMicroservice.use('.', {
      mongoUrl: 'mongodb://localhost:27017/leaderboard-test'
    });

    leaderboardMicroservice.use('mesh', {auto:true, pin: 'role:leaderboards,cmd:*'});

    leaderboardMicroservice.ready(done);
  });

  it('Consumer Microservice', function(done) {
    consumerMicroservice.use('mesh');
    consumerMicroservice.ready(done);
  });
});

describe('Before', function() {
  it('Clear leaderboards collection', function(done) {
    consumerMicroservice.act('role:leaderboards,cmd:dangerouslyDeleteAllLeaderboards', function(err, response) {
      if(err) { return done(err); }
      response.should.have.property('response');
      response.response.should.be.exactly('success');
      done();
    });
  });
});
var createdLeaderboardId;
describe('Leaderboards Microservice API', function() {
  this.timeout(5000);
  it('Create a leaderboard', function(done) {
    consumerMicroservice.act('role:leaderboards,cmd:create', leaderboardToCreate, function(err, response) {
      if(err) {return done(err);}
      response.should.have.property('response');
      response.response.should.be.exactly('success');
      response.should.have.property('entity');
      response.entity.should.have.property('_id');
      createdLeaderboardId = response.entity._id;
      response.entity.should.have.property('leaderboard');
      response.entity.leaderboard[0].should.have.property('name');
      response.entity.leaderboard[0].name.should.be.exactly(leaderboardToCreate.leaderboard[0].name);
      response.entity.leaderboard[0].should.have.property('score');
      response.entity.leaderboard[0].score.should.be.exactly(leaderboardToCreate.leaderboard[0].score);
      response.entity.leaderboard[1].should.have.property('name');
      response.entity.leaderboard[1].name.should.be.exactly(leaderboardToCreate.leaderboard[1].name);
      response.entity.leaderboard[1].should.have.property('score');
      response.entity.leaderboard[1].score.should.be.exactly(leaderboardToCreate.leaderboard[1].score);
      response.entity.leaderboard[2].should.have.property('name');
      response.entity.leaderboard[2].name.should.be.exactly(leaderboardToCreate.leaderboard[2].name);
      response.entity.leaderboard[2].should.have.property('score');
      response.entity.leaderboard[2].score.should.be.exactly(leaderboardToCreate.leaderboard[2].score);
      done();
    })
  });

  it('Retrieve leaderboards by id', function(done) {
    consumerMicroservice.act('role:leaderboards,cmd:retrieveById',{id:createdLeaderboardId},function(err, response) {
      if(err) {return done(err);}
      response.should.have.property('response');
      response.response.should.be.exactly('success');
      response.should.have.property('entity');
      response.entity.should.have.property('leaderboard');
      response.entity.leaderboard[0].should.have.property('name');
      response.entity.leaderboard[0].name.should.be.exactly(leaderboardToCreate.leaderboard[0].name);
      response.entity.leaderboard[0].should.have.property('score');
      response.entity.leaderboard[0].score.should.be.exactly(leaderboardToCreate.leaderboard[0].score);
      response.entity.leaderboard[1].should.have.property('name');
      response.entity.leaderboard[1].name.should.be.exactly(leaderboardToCreate.leaderboard[1].name);
      response.entity.leaderboard[1].should.have.property('score');
      response.entity.leaderboard[1].score.should.be.exactly(leaderboardToCreate.leaderboard[1].score);
      response.entity.leaderboard[2].should.have.property('name');
      response.entity.leaderboard[2].name.should.be.exactly(leaderboardToCreate.leaderboard[2].name);
      response.entity.leaderboard[2].should.have.property('score');
      response.entity.leaderboard[2].score.should.be.exactly(leaderboardToCreate.leaderboard[2].score);
      done();
    });
  });

  it('Retrieve all leaderboards', function(done) {
    consumerMicroservice.act('role:leaderboards,cmd:retrieveAll',function(err, response) {
      if(err) {return done(err);}
      response.should.have.property('response');
      response.response.should.be.exactly('success');
      response.should.have.property('entity');
      response.entity[0].should.have.property('leaderboard');
      response.entity[0].leaderboard[0].should.have.property('name');
      response.entity[0].leaderboard[0].name.should.be.exactly(leaderboardToCreate.leaderboard[0].name);
      response.entity[0].leaderboard[0].should.have.property('score');
      response.entity[0].leaderboard[0].score.should.be.exactly(leaderboardToCreate.leaderboard[0].score);
      response.entity[0].leaderboard[1].should.have.property('name');
      response.entity[0].leaderboard[1].name.should.be.exactly(leaderboardToCreate.leaderboard[1].name);
      response.entity[0].leaderboard[1].should.have.property('score');
      response.entity[0].leaderboard[1].score.should.be.exactly(leaderboardToCreate.leaderboard[1].score);
      response.entity[0].leaderboard[2].should.have.property('name');
      response.entity[0].leaderboard[2].name.should.be.exactly(leaderboardToCreate.leaderboard[2].name);
      response.entity[0].leaderboard[2].should.have.property('score');
      response.entity[0].leaderboard[2].score.should.be.exactly(leaderboardToCreate.leaderboard[2].score);
      done();
    });
  });

});

describe('Teardown', function() {
  it('consumerMicroservice', function(done) {
    consumerMicroservice.close(done);
  });

  it('leaderboardMicroservice', function(done) {
    leaderboardMicroservice.close(done);
  });

  it('baseMicroservice', function(done) {
    baseMicroservice.close(done);
  });
});
