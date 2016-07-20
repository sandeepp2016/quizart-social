import React from 'react';
import CommentForm from  './CommentForm';
import Tweet from 'react-tweet';
var socket = io.connect('/tweets');
var terms = ['QuizRT','QuizRTSocail','@Stackroute'];
export default class Timeline extends React.Component{
  constructor (props){
     super(props);
     this.state = {tweets:[],flag:'loading'};

  }

loadDataFromSever(){
  var id;
  if(this.props.user!=undefined){
    id ="user";
    console.log("====user timeline");
  }
 else {
    id ="QuizRT";
   console.log("topic timeline");
 }
 var request =  $.ajax({
    url: "api/v1/timeline/twitter/getTwitterData/"+id,
    contentType: 'application/json',
    cache: false,
    headers: {JWT: localStorage.authToken}

  });

  request.done(function(data) {
                console.log("=====id===",id);
               console.log("=======retrievedPosts=======",data);
               if(data instanceof Array){
                  console.log("=====tweets====",data);
                  this.setState({tweets:data,flag:'loaded'})
               }
               else {
                   this.setState({tweets:data.statuses,flag:'loaded'});
               }

    }.bind(this));

      request.fail(function(xhr, status, err) {
      console.error("api/v1/timeline/gettweet/", status, err.toString());
      setTimeout(loadDataFromSever(),20000);
    }.bind(this));


}

  componentDidMount(){

          var index = Math.floor(Math.random() * 3) + 0;
          var term =  terms[index];
          console.log("=====================track term is",term);
          this.loadDataFromSever();
          socket.emit('creatstream',{token:localStorage.authToken,term:term});
          console.log("=====token",localStorage.authToken);
          var  that = this;
           socket.on('tweetdata', function getTweet (tweet) {
           console.log("============tweet ",tweet);
          if(tweet.user.id!="undefined"){
             console.log("====username====",tweet.user.name);
             that.setState({tweets:[tweet].concat(that.state.tweets)});
          }
});

}

   handlePost(post){

     console.log("====post=====",post);
     var request  =  $.ajax({
       url: "api/v1/timeline/twitter/postToTwitter",
       type: 'POST',
       data: JSON.stringify({text:post}),
       contentType: 'application/json',
       headers: {JWT: localStorage.authToken}
     });

     request.done(function(data) {
     console.log("=========tweeted: "+JSON.stringify(data)+"========");

       }.bind(this));
        request.fail( function(err) {
         console.error("api/v1/timeline/twitter/postToTwitter", status, err.toString());
       }.bind(this));
  }

  render() {

     console.log("state===",this.state.flag);
     var createPost = this.state.tweets.map(function(data) {

         return (<Tweet data = {data}/>);
    });
    return (
      <div>
        <CommentForm newPost = {this.handlePost.bind(this)}/>
         {this.state.flag ==='loading'?<div className="loader">Loading...</div>:null}
        <div style = {{marginTop:5}}>
            {
              createPost
            }
       </div>

      </div>
    )
  }
}
