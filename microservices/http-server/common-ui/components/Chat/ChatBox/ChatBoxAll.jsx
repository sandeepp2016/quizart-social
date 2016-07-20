import React from 'react';
import ChatList from './ChatList';
import TextField from 'material-ui/TextField';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import FlatButton from 'material-ui/FlatButton';

import base64 from 'base-64';
import restUrl from '../../../restUrl';


var username, ids;

const style = {
  paddingTop:40,
  marginTop:20,
  height:"100%"
}

const chatListStyle ={
  height:'80%',
  overflowY:'auto'
}

// var socket = io.connect(restUrl+'/chat1');

export default class ChatBoxAll extends React.Component {
  constructor(props) {
    super(props);
    username = (JSON.parse(base64.decode(localStorage.token.split('.')[1])).sub);
    this.state = {messages : [],msg: "" , focusmsg:"" ,roomId:"ChatRoom" ,pagecount:0};
    //console.log(this.props.UserName);
    // console.log("Inside ChatBoxAll, the friend id is==",this.props.friendid);
    // console.log("Inside ChatBoxAll, the group id is==",this.props.groupid);
    if(this.props.friendid!=null){
      // console.log("inside chatboxa all constructor if loop");
      ids = [username,this.props.friendid];
    }
    else{
      ids = [this.props.groupid];
    }
  }

  componentDidMount(){
    var outerThis = this ;
    // console.log("Inside component did mount of chatbox all");
    this.props.socket.emit('create_room',ids);
    this.props.socket.on('channelId',function(channelid){
      outerThis.setState({
        channelId : channelid
      },function(){

        console.log("Inside the chatboxall, channel ild recived from express is==",outerThis.state.channelId);
      })
    });
    this.props.socket.on('retrievedHistory',function(historymsgserver){
      console.log(historymsgserver);
      console.log("Message received as history is ",historymsgserver.text);
        if(historymsgserver.text){
          this.setState({messages : this.state.messages.concat(historymsgserver.text)});
      }
    }.bind(this));
    this.props.socket.on('received_msg',function(msgserver){
      console.log("Message received is ",msgserver.text);
      console.log("Message received and is sent by",msgserver.sentBy);
      this.setState({messages : this.state.messages.concat([{text : msgserver.text, sentBy: msgserver.sentBy}])});
    }.bind(this));
  }

  handleChat(e){
    this.setState({msg: e.target.value});
  }

  retrieveHistory(e){
    e.preventDefault();
    console.log("inside retrieve Historuy method");
    this.setState({pagecount : this.state.pagecount+1});
    console.log("Message Count:",this.state.pagecount);
    this.props.socket.emit('retrieveHistory',this.state.channelId);
  }

  submitForm(e){
    e.preventDefault();
    this.props.socket.emit('chat_message',{msg:this.state.msg,user:username,topicid:this.state.channelId});
    console.log("Chat message you sent",this.state.msg);
    this.setState({msg : ''});
  }


  // componentWillUnmount(){
  //   socket.emit('disconnect');
  // }

  render() {
    return (
          <div style={{height:'100vh'}}>
            <div className="row" style={{height:'5%' }}>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <center><FlatButton
                  label="Load Earlier Messages"
                  labelPosition="before"
                  primary={true}
                  icon={<FontIcon className="muidocs-icon-action-history" />}
                  onTouchTap={this.retrieveHistory.bind(this)}
                />
                </center>
            </div>
            </div>
            <div className="row" style={{height:'75%' , overflowY:'auto'}}>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <ChatList data={this.state.messages} />
              </div>
            </div>
            <div className="row" style={{height:'20%'}}>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <form onSubmit={this.submitForm.bind(this)}>
                  <TextField
                  hintText="Message"
                  value={this.state.msg}
                  onChange={this.handleChat.bind(this)}
                  />
                  </form>
              </div>
            </div>
          </div>
    );
  }
}

// var text =[];
// var sentBy =[];
// historymsgserver.text.map(function(data){
//
// });
// forEach(historymsgserver.text){
//
// }
//
// <span style={{cursor:'pointer'}}>
//   <FontIcon className="muidocs-icon-action-history" onTouchTap={this.retrieveHistory.bind(this)}/>
// </span>
