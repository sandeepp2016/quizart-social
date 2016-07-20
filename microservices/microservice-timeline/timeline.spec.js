var should = require('should');
var seneca = require('seneca');

const baseMicroservice = seneca();
const timelineMicroservice = seneca();
const consumerMicroservice = seneca();
const env = process.env.NODE_ENV || 'dev';
const newAuth = {
 username: "sandeep",
 key: "751412456090578944-eu50jZvaL0cTb3Ay5qLviBDQmvgCEit",
 secret:"RLLipUmpibS73BBIWryC6arhVNgx1txdrKDtLRv6EluOO",
 userId:"sandeeppatelgs"
};

describe('Setup', function() {
  it('Setup Mesh Base', function(done) {
    baseMicroservice.use('mesh', {base:true});
    baseMicroservice.ready(done);
  });

  it('Setup Timeline Microservice', function(done) {
    this.timeout(10000);
    timelineMicroservice.use('./timeline-plugin', {
    mongoUrl: 'mongodb://localhost:27017/boilerplate-'+env
    });

    timelineMicroservice.use('mesh', {auto:true, pin:'role:timelineservice,cmd:*'});
    timelineMicroservice.ready(done);

  });

  it('Setup Consumer Microservice', function(done) {
    consumerMicroservice.use('mesh');
    consumerMicroservice.ready(done);
  });
});


 describe('before timeline operation',function(){

     it('dangerouslyDelete user all post',function(done){
       consumerMicroservice.act('role:timelineservice,cmd:dangerouslyDelete',function(err,response){
       if(err){done(err)}
       response.should.have.property('response');
       response.response.should.be.exactly('success');
       done();
       });

      });

  });

describe('timeline operation', function() {

  it('create Auth', function(done) {
    consumerMicroservice.act('role:timelineservice,cmd:createAuth',newAuth, function(err, response) {
      if(err) { return done(err); }
      response.should.have.property('response');
      response.response.should.be.exactly('success');
      console.log("======auth created",response.newAuth);
      done();
    });
});
    it('get Auth ',function(done){
     consumerMicroservice.act('role:timelineservice,cmd:getTwitterAuth',{username:"sandeep"},function(err,response){
     if(err){done(err)}
       response.should.have.property('response');
       response.response.should.be.exactly('success');
       console.log("======AuthData======",response.TwitterAuth);
      done();

      }) ;
    });

    it('delete auth ',function(done){
     consumerMicroservice.act('role:timelineservice,cmd:removeAuth',{username:"sandeep"},function(err,response){
     if(err){done(err)}
       response.should.have.property('response');
       response.response.should.be.exactly('success');
       console.log(response.deletedAuth);
      done();
      }) ;
    });
  });
