import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import MediaQuery from 'react-responsive';
import TextField from 'material-ui/TextField';
import EachTopic from '../AbtTopic';
import ChatComponent from '../Chat/ChatComponent';
import SubTopicContainer from '../SubTopics/SubTopicContainer';
import ProfilePage from '../Profile';
import Dashboard from '../dashboard';

var bodyContainer = {
  // padding: "16px",
  paddingTop: "64px",

}

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 30,
    overflow:'hidden',
  },
  formStyle :{
      position : 'fixed',
      bottom : 0,
      paddingTop : 10,
  }
};

var socket = io();
export default class TabsMobile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
    this.state = {messages : [],msg: "" , focusmsg:"" };
    socket.on('chat message',function(msgserver){
      var newmsg = this.state.messages.concat([{text : msgserver , id:Date.now()}])
      this.setState({messages : newmsg});
    }.bind(this));
    socket.on('focusText',function(focusm){
      this.setState({focusmsg : focusm});
    }.bind(this));
  }

  handleChat(e){
    this.setState({msg: e.target.value});
  }

  submitForm(e){
    e.preventDefault();
    socket.emit('chat message', this.state.msg);
    this.setState({msg : ''});
  }

  handleChange(value){
    this.setState({
      slideIndex: value,
    });
  };

  handleCheck(_id,topic){
    var username = Cookie.load("username");
    var newtopics;
    console.log('handle check functi =----------------');
    var likedTopic = this.state.topics;
    var result = $.grep(likedTopic, function(e){ return e._id == topic._id; });
    if (result.length == 0) {
  // not found
    topic.topicFollowers = topic.topicFollowers+1;
    newtopics = likedTopic.concat([topic]);
    } else if (result.length == 1) {
  // access the foo property using result[0].foo
  var result = $.grep(likedTopic, function(e){ return e._id != topic._id; });
  newtopics = result;
  console.log('this topic u already liked');
    }
    this.state.incre=!this.state.incre;
    this.setState({topics:newtopics});
      var data1 = {
        incre: this.state.incre,
        id:_id,
        uName:username,
        t:topic
      }
      console.log('before ajax');
      $.ajax({
        type:'POST',
        data :JSON.stringify(data1),
        contentType : 'application/json',
        url:restUrl+'/api/check',
        success:(function(data){
          console.log('folowers increamented--------------now -----------'+data);
        }).bind(this),
        error:function(err){
          console.log(err);
          console.log('error ');
        }
      })
 }


  render() {
    return (
      <div>
        <Tabs
          onChange={this.handleChange.bind(this)}
          value={this.state.slideIndex}
          style={bodyContainer}
        >
          <Tab label={this.props.page.toString()} value={0} />
          <Tab label="Chat" value={1} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange.bind(this)}
        >
          <div className="container-fluid" style={{height:'80vh' , overflow:'auto'}}>

            {this.props.page.toString()=="Profile"?
            <div>
              <ProfilePage/>
              <Dashboard/>
            </div>
            :
             this.props.page.toString()=="Topics"?<SubTopicContainer topics ={this.props.topics} fun={this.handleCheck}/>:
             this.props.page.toString()=="Home"?<Dashboard />:
             this.props.page.toString()=="TopicPage"?<EachTopic id={this.props.id}/>:null}
          </div>
          <div style={styles.slide}>
                <div style={{height:'70vh' , overflow:'auto'}}>
                    <ChatComponent />
                </div>
          </div>
        </SwipeableViews>

      </div>
    );
  }
}
