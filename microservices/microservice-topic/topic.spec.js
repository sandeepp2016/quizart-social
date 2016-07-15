var should = require('should');

var seneca = require('seneca');

const baseMicroservice = seneca();
const topicMicroservice = seneca();
const consumerMicroservice = seneca();

const topic = {
  _id:"SomeName",
  topicName:"SomeName",
  topicIcon:"http://lorempixel.com/600/337/nature/",
  topicDescription:"SomeDescription",
  topicFollowers:23,
  playersPerMatch:4,
  topicCategory:"india",
  }

describe('Setup', function() {
  this.timeout(5000)
  it('Mesh Base', function(done) {
    baseMicroservice.use('mesh', {base:true});
    baseMicroservice.ready(done);
  });

  it('Topic Microservice', function(done) {
    topicMicroservice.use('.', {
      mongoUrl: 'mongodb://localhost:27017/topic-test'
    });

    topicMicroservice.use('mesh', {auto:true, pin: 'role:topic,cmd:*'});

    topicMicroservice.ready(done);
  });

  it('Consumer Microservice', function(done) {
    consumerMicroservice.use('mesh');
    consumerMicroservice.ready(done);
  });
});



describe('Topic Microservice API', function() {
  this.timeout(5000)
  it('Retrieve Topic by id', function(done) {
    consumerMicroservice.act('role:topic,cmd:getTopic',{_id:"SomeName"},function(err, response) {
      if(err) {return done(err);}
      response.should.have.property('response');
      response.response.should.be.exactly('success');
      response.should.have.property('entity');
      response.entity.should.have.property('_id');
      createdProfileId = response.entity._id;
      response.entity.should.have.property('topicName');
      response.entity.topicName.should.be.exactly(topic.topicName);
      response.entity.should.have.property('topicIcon');
      response.entity.topicIcon.should.be.exactly(topic.topicIcon);
      response.entity.should.have.property('topicDescription');
      response.entity.topicDescription.should.be.exactly(topic.topicDescription);
      response.entity.should.have.property('topicFollowers');
      response.entity.topicFollowers.should.be.exactly(topic.topicFollowers);
      response.entity.should.have.property('playersPerMatch');
      response.entity.playersPerMatch.should.be.exactly(topic.playersPerMatch);
      response.entity.should.have.property('topicCategory');
      response.entity.topicCategory.should.be.exactly(topic.topicCategory);
      done();
    })
  });




});

// describe('Edit Profile', function() {
//   it('Edit Profile', function(done) {
//     const editProfileRequest = {
//       username: profile.username,
//       }
//
//     consumerMicroservice.act('role:profile,cmd:editProfile', editProfileRequest, function(err, response) {
//       if(err) { return done(err); }
//       response.should.have.property('response');
//       response.response.should.be.exactly('success');
//       done();
//     });
//   });
//
//   it('Edit profile of different user', function(done) {
//     const editProfileRequest = {
//       username: 'username',
//     }
//
//     consumerMicroservice.act('role:profile,cmd:editProfile', editProfileRequest, function(err, response) {
//       if(err) { return done(err); }
//       response.should.have.property('response');
//       response.response.should.be.exactly('fail');
//       done();
//     });
//   });
// });
//
// describe('Delete Profile', function() {
//   it('Delete profile', function(done) {
//     consumerMicroservice.act('role:profile,cmd:delete', profile, function(err, response) {
//       if(err) { return done(err); }
//       response.should.have.property('response');
//       response.response.should.be.exactly('success');
//       done();
//     });
//   });
// });

describe('Teardown', function() {
  it('consumerMicroservice', function(done) {
    consumerMicroservice.close(done);
  });

  it('topicMicroservice', function(done) {
    topicMicroservice.close(done);
  });

  it('baseMicroservice', function(done) {
    baseMicroservice.close(done);
  });
});
