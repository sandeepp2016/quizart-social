var should = require('should');

var seneca = require('seneca');

const baseMicroservice = seneca();
const tournamentMicroservice = seneca();
const consumerMicroservice = seneca();

const tournamentToCreate = {
  title: "SomeTitle",
  avatarURL: "http://lorempixel.com/600/337/nature/",
  imageURL: "http://lorempixel.com/600/337/nature/",
  overlayTitle: "SomeTitle",
  overlaySubtitle: "SubTitle",
  description: "Description",
  instructions: "Instructions",
  prizes: "Prize",
  level: 3,
  regEndDate:new Date(2016,6,14,13,00,00,00),
  tourStartDate:new Date(2016,6,14,14,00,00,00),
  tourEndDate:new Date(2016,6,14,15,00,00,00),
  topics: "All",
  playersPerGame: 4,
  registeredPlayers: []
}

describe('Setup', function() {
  this.timeout(15000)
  it('Mesh Base', function(done) {
    baseMicroservice.use('mesh', {base:true});
    baseMicroservice.ready(done);
  });

  it('Tournament Microservice', function(done) {
    tournamentMicroservice.use('.', {
      mongoUrl: 'mongodb://localhost:27017/tournament-test'
    });

    tournamentMicroservice.use('mesh', {auto:true, pin: 'role:tournaments,cmd:*'});

    tournamentMicroservice.ready(done);
  });

  it('Consumer Microservice', function(done) {
    consumerMicroservice.use('mesh');
    consumerMicroservice.ready(done);
  });
});

describe('Before', function() {
  it('Clear tournaments collection', function(done) {
    consumerMicroservice.act('role:tournaments,cmd:dangerouslyDeleteAllTournaments', function(err, response) {
      if(err) { return done(err); }
      response.should.have.property('response');
      response.response.should.be.exactly('success');
      done();
    });
  });
});
var createdTournamentId;
describe('Tournaments Microservice API', function() {
  this.timeout(15000)
  it('Create a tournament', function(done) {
    this.timeout(15000)
    consumerMicroservice.act('role:tournaments,cmd:create', tournamentToCreate, function(err, response) {
      console.log('\n\n\n\n'+JSON.stringify(response.entity[0])+'\n\n\n\n');
      if(err) {return done(err);}
      response.should.have.property('response');
      response.response.should.be.exactly('success');
      response.should.have.property('entity');
      response.entity.should.have.property('_id');
      createdTournamentId = response.entity._id;
      response.entity.should.have.property('title');
      response.entity.title.should.be.exactly(tournamentToCreate.title);
      response.entity.should.have.property('avatarURL');
      response.entity.avatarURL.should.be.exactly(tournamentToCreate.avatarURL);
      response.entity.should.have.property('imageURL');
      response.entity.imageURL.should.be.exactly(tournamentToCreate.imageURL);
      response.entity.should.have.property('overlayTitle');
      response.entity.overlayTitle.should.be.exactly(tournamentToCreate.overlayTitle);
      response.entity.should.have.property('overlaySubtitle');
      response.entity.overlaySubtitle.should.be.exactly(tournamentToCreate.overlaySubtitle);
      response.entity.should.have.property('description');
      response.entity.description.should.be.exactly(tournamentToCreate.description);
      response.entity.should.have.property('instructions');
      response.entity.instructions.should.be.exactly(tournamentToCreate.instructions);
      response.entity.should.have.property('prizes');
      response.entity.prizes.should.be.exactly(tournamentToCreate.prizes);
      response.entity.should.have.property('regEndDate');
      //response.entity.regEndDate.should.be.exactly(tournamentToCreate.regEndDate);
      response.entity.should.have.property('tourStartDate');
      //response.entity.tourStartDate.should.be.exactly(tournamentToCreate.tourStartDate);
      response.entity.should.have.property('tourEndDate');
      //response.entity.tourEndDate.should.be.exactly(tournamentToCreate.tourEndDate);
      response.entity.should.have.property('topics');
      response.entity.topics.should.be.exactly(tournamentToCreate.topics);
      response.entity.should.have.property('playersPerGame');
      response.entity.playersPerGame.should.be.exactly(tournamentToCreate.playersPerGame);
      response.entity.should.have.property('level');
      response.entity.level.should.be.exactly(tournamentToCreate.level);
      done();
    })
  });

  it('Retrieve tournaments by id', function(done) {
    this.timeout(15000)
    consumerMicroservice.act('role:tournaments,cmd:retrieveById',{id:createdTournamentId},function(err, response) {
      if(err) {return done(err);}
      response.should.have.property('response');
      response.response.should.be.exactly('success');
      response.should.have.property('entity');
      response.entity.should.have.property('title');
      response.entity.title.should.be.exactly(tournamentToCreate.title);
      response.entity.should.have.property('avatarURL');
      response.entity.avatarURL.should.be.exactly(tournamentToCreate.avatarURL);
      response.entity.should.have.property('imageURL');
      response.entity.imageURL.should.be.exactly(tournamentToCreate.imageURL);
      response.entity.should.have.property('overlayTitle');
      response.entity.overlayTitle.should.be.exactly(tournamentToCreate.overlayTitle);
      response.entity.should.have.property('overlaySubtitle');
      response.entity.overlaySubtitle.should.be.exactly(tournamentToCreate.overlaySubtitle);
      response.entity.should.have.property('description');
      response.entity.description.should.be.exactly(tournamentToCreate.description);
      response.entity.should.have.property('instructions');
      response.entity.instructions.should.be.exactly(tournamentToCreate.instructions);
      response.entity.should.have.property('prizes');
      response.entity.prizes.should.be.exactly(tournamentToCreate.prizes);
      response.entity.should.have.property('regEndDate');
      //response.entity.regEndDate.should.be.exactly(tournamentToCreate.regEndDate);
      response.entity.should.have.property('tourStartDate');
      //response.entity.tourStartDate.should.be.exactly(tournamentToCreate.tourStartDate);
      response.entity.should.have.property('tourEndDate');
      //response.entity.tourEndDate.should.be.exactly(tournamentToCreate.tourEndDate);
      response.entity.should.have.property('topics');
      response.entity.topics.should.be.exactly(tournamentToCreate.topics);
      response.entity.should.have.property('playersPerGame');
      response.entity.playersPerGame.should.be.exactly(tournamentToCreate.playersPerGame);
      response.entity.should.have.property('level');
      response.entity.level.should.be.exactly(tournamentToCreate.level);
      done();
    });
  });


  it('Register Players to tournament', function(done) {
    this.timeout(15000)
    consumerMicroservice.act('role:tournaments,cmd:registerPlayer',{id:createdTournamentId,userId:"deepak@gmail.com"},function(err, response) {
      console.log('\n\n\n\n'+JSON.stringify(response.entity)+'\n\n\n\n');
      if(err) {return done(err);}
      response.should.have.property('response');
      response.response.should.be.exactly('success');
      response.should.have.property('entity');
      response.entity.should.have.property('title');
      response.entity.title.should.be.exactly(tournamentToCreate.title);
      response.entity.should.have.property('avatarURL');
      response.entity.avatarURL.should.be.exactly(tournamentToCreate.avatarURL);
      response.entity.should.have.property('imageURL');
      response.entity.imageURL.should.be.exactly(tournamentToCreate.imageURL);
      response.entity.should.have.property('overlayTitle');
      response.entity.overlayTitle.should.be.exactly(tournamentToCreate.overlayTitle);
      response.entity.should.have.property('overlaySubtitle');
      response.entity.overlaySubtitle.should.be.exactly(tournamentToCreate.overlaySubtitle);
      response.entity.should.have.property('description');
      response.entity.description.should.be.exactly(tournamentToCreate.description);
      response.entity.should.have.property('instructions');
      response.entity.instructions.should.be.exactly(tournamentToCreate.instructions);
      response.entity.should.have.property('prizes');
      response.entity.prizes.should.be.exactly(tournamentToCreate.prizes);
      response.entity.should.have.property('regEndDate');
      //response.entity.regEndDate.should.be.exactly(tournamentToCreate.regEndDate);
      response.entity.should.have.property('tourStartDate');
      //response.entity.tourStartDate.should.be.exactly(tournamentToCreate.tourStartDate);
      response.entity.should.have.property('tourEndDate');
      //response.entity.tourEndDate.should.be.exactly(tournamentToCreate.tourEndDate);
      response.entity.should.have.property('topics');
      response.entity.topics.should.be.exactly(tournamentToCreate.topics);
      response.entity.should.have.property('playersPerGame');
      response.entity.playersPerGame.should.be.exactly(tournamentToCreate.playersPerGame);
      response.entity.should.have.property('level');
      response.entity.level.should.be.exactly(tournamentToCreate.level);
      done();
    });
  });

  it('Retrieve all tournaments', function(done) {
    this.timeout(15000)
    consumerMicroservice.act('role:tournaments,cmd:retrieveAll',function(err, response) {
      console.log('\n\n\n\n'+JSON.stringify(response.entity[0])+'\n\n\n\n');
      if(err) {return done(err);}
      response.should.have.property('response');
      response.response.should.be.exactly('success');
      response.should.have.property('entity');
      response.entity[0].should.have.property('title');
      response.entity[0].title.should.be.exactly(tournamentToCreate.title);
      response.entity[0].should.have.property('avatarURL');
      response.entity[0].avatarURL.should.be.exactly(tournamentToCreate.avatarURL);
      response.entity[0].should.have.property('imageURL');
      response.entity[0].imageURL.should.be.exactly(tournamentToCreate.imageURL);
      response.entity[0].should.have.property('overlayTitle');
      response.entity[0].overlayTitle.should.be.exactly(tournamentToCreate.overlayTitle);
      response.entity[0].should.have.property('overlaySubtitle');
      response.entity[0].overlaySubtitle.should.be.exactly(tournamentToCreate.overlaySubtitle);
      response.entity[0].should.have.property('description');
      response.entity[0].description.should.be.exactly(tournamentToCreate.description);
      response.entity[0].should.have.property('instructions');
      response.entity[0].instructions.should.be.exactly(tournamentToCreate.instructions);
      response.entity[0].should.have.property('prizes');
      response.entity[0].prizes.should.be.exactly(tournamentToCreate.prizes);
      response.entity[0].should.have.property('regEndDate');
      //response.entity[0].regEndDate.should.be.exactly(tournamentToCreate.regEndDate);
      response.entity[0].should.have.property('tourStartDate');
      //response.entity[0].tourStartDate.should.be.exactly(tournamentToCreate.tourStartDate);
      response.entity[0].should.have.property('tourEndDate');
      //response.entity[0].tourEndDate.should.be.exactly(tournamentToCreate.tourEndDate);
      response.entity[0].should.have.property('topics');
      response.entity[0].topics.should.be.exactly(tournamentToCreate.topics);
      response.entity[0].should.have.property('playersPerGame');
      response.entity[0].playersPerGame.should.be.exactly(tournamentToCreate.playersPerGame);
      response.entity[0].should.have.property('level');
      response.entity[0].level.should.be.exactly(tournamentToCreate.level);
      done();
    });
  });

});

describe('Teardown', function() {
  it('consumerMicroservice', function(done) {
    consumerMicroservice.close(done);
  });

  it('tournamentMicroservice', function(done) {
    tournamentMicroservice.close(done);
  });

  it('baseMicroservice', function(done) {
    baseMicroservice.close(done);
  });
});
