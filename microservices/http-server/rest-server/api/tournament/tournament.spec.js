const should = require('should');
const request = require('supertest');
const seneca = require('seneca');

const app = require('../../app');

const consumerMicroservice = seneca();

const microservicesDecorator = require('../../start-microservices-decorator-for-testing');

const tournamentToCreate = {
  title:"SomeTitle",
  avatarURL:"http://lorempixel.com/600/337/nature/",
  imageURL:"http://lorempixel.com/600/337/nature/",
  overlayTitle:"SomeTitle",
  overlaySubtitle:"SubTitle",
  description:"Description",
  rules:"Rules",
  prizes:"Prize",
  regEndDate:new Date(2016,6,14,13,00,00,00),
  tourStartDate:new Date(2016,6,14,14,00,00,00),
  tourEndDate:new Date(2016,6,14,15,00,00,00),
  topics:"All",
  playersPerGame:"4",
  elimination:"50",
  level:"5"
}

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

  it('Clear tournaments collection', function(done) {
    consumerMicroservice.act('role:tournaments,cmd:dangerouslyDeleteAllTournaments', function(err, response) {
      if(err) { return done(err); }
      response.should.have.property('response');
      response.response.should.be.exactly('success');
      done();
    });
  });
});

describe('Tournaments Microservice API', function() {
  var createdTournamentId;
  it('Create a tournament', function(done) {
    request(app)
    .post('/api/v1/tournaments')
    .send(tournamentToCreate)
    .expect(201)
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      if(err) { return done(err); }
      res.body.should.have.property('_id');
      createdTournamentId = res.body._id;
      res.body.should.have.property('title');
      res.body.title.should.be.exactly(tournamentToCreate.title);
      res.body.should.have.property('avatarURL');
      res.body.avatarURL.should.be.exactly(tournamentToCreate.avatarURL);
      res.body.should.have.property('imageURL');
      res.body.imageURL.should.be.exactly(tournamentToCreate.imageURL);
      res.body.should.have.property('overlayTitle');
      res.body.overlayTitle.should.be.exactly(tournamentToCreate.overlayTitle);
      res.body.should.have.property('overlaySubtitle');
      res.body.overlaySubtitle.should.be.exactly(tournamentToCreate.overlaySubtitle);
      res.body.should.have.property('description');
      res.body.description.should.be.exactly(tournamentToCreate.description);
      res.body.should.have.property('rules');
      res.body.rules.should.be.exactly(tournamentToCreate.rules);
      res.body.should.have.property('prizes');
      res.body.prizes.should.be.exactly(tournamentToCreate.prizes);
      res.body.should.have.property('regEndDate');
      //res.body.regEndDate.should.be.exactly(tournamentToCreate.regEndDate);
      res.body.should.have.property('tourStartDate');
      //res.body.tourStartDate.should.be.exactly(tournamentToCreate.tourStartDate);
      res.body.should.have.property('tourEndDate');
      //res.body.tourEndDate.should.be.exactly(tournamentToCreate.tourEndDate);
      res.body.should.have.property('topics');
      res.body.topics.should.be.exactly(tournamentToCreate.topics);
      res.body.should.have.property('playersPerGame');
      res.body.playersPerGame.should.be.exactly(tournamentToCreate.playersPerGame);
      res.body.should.have.property('elimination');
      res.body.elimination.should.be.exactly(tournamentToCreate.elimination);
      res.body.should.have.property('level');
      res.body.level.should.be.exactly(tournamentToCreate.level);
      done();
    });
  });

  it('Retrieve all tournaments', function(done) {
    request(app)
    .get('/api/v1/tournaments')
    .expect(201)
    .end(function(err, res) {
      if(err) { return done(err); }
      res.body[0].should.have.property('_id');
      createdTournamentId = res.body[0]._id;
      res.body[0].should.have.property('title');
      res.body[0].title.should.be.exactly(tournamentToCreate.title);
      res.body[0].should.have.property('avatarURL');
      res.body[0].avatarURL.should.be.exactly(tournamentToCreate.avatarURL);
      res.body[0].should.have.property('imageURL');
      res.body[0].imageURL.should.be.exactly(tournamentToCreate.imageURL);
      res.body[0].should.have.property('overlayTitle');
      res.body[0].overlayTitle.should.be.exactly(tournamentToCreate.overlayTitle);
      res.body[0].should.have.property('overlaySubtitle');
      res.body[0].overlaySubtitle.should.be.exactly(tournamentToCreate.overlaySubtitle);
      res.body[0].should.have.property('description');
      res.body[0].description.should.be.exactly(tournamentToCreate.description);
      res.body[0].should.have.property('rules');
      res.body[0].rules.should.be.exactly(tournamentToCreate.rules);
      res.body[0].should.have.property('prizes');
      res.body[0].prizes.should.be.exactly(tournamentToCreate.prizes);
      res.body[0].should.have.property('regEndDate');
      //res.body[0].regEndDate.should.be.exactly(tournamentToCreate.regEndDate);
      res.body[0].should.have.property('tourStartDate');
      //res.body[0].tourStartDate.should.be.exactly(tournamentToCreate.tourStartDate);
      res.body[0].should.have.property('tourEndDate');
      //res.body[0].tourEndDate.should.be.exactly(tournamentToCreate.tourEndDate);
      res.body[0].should.have.property('topics');
      res.body[0].topics.should.be.exactly(tournamentToCreate.topics);
      res.body[0].should.have.property('playersPerGame');
      res.body[0].playersPerGame.should.be.exactly(tournamentToCreate.playersPerGame);
      res.body[0].should.have.property('elimination');
      res.body[0].elimination.should.be.exactly(tournamentToCreate.elimination);
      res.body[0].should.have.property('level');
      res.body[0].level.should.be.exactly(tournamentToCreate.level);
      done();
    });
  });
});

describe('Teardown', function() {
  it('Stop all microservices', function(done) {
    microservicesDecorator.stopAllMicroservices(done);
  });
});
