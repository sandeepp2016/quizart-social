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
import base64 from 'base-64';
import restUrl from '../../../restUrl';


var username ;

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
    this.state = {messages : [],msg: "" , focusmsg:"" ,roomId:"ChatRoom" };
    //console.log(this.props.UserName);
  }

  componentDidMount(){

    var ids = [username,this.props.friendid];
    this.props.socket.emit('create_room',ids);
    // socket.emit('call_socket2',"From socket 2");
    this.props.socket.on('received_msg',function(msgserver){
      console.log(msgserver);
      // var newmsg = this.state.messages.concat([{text : msgserver}])  //, id:Date.now(
      this.setState({messages : this.state.messages.concat([{text : msgserver}])});
    }.bind(this));
  }

  handleChat(e){
    this.setState({msg: e.target.value});
  }

  submitForm(e){
    e.preventDefault();
    this.props.socket.emit('chat_message', this.state.msg);
    console.log("Chat message you sent",this.state.msg);
    this.setState({msg : ''});
  }


  // componentWillUnmount(){
  //   socket.emit('disconnect');
  // }

  render() {
    return (
          <div style={{height:'100vh'}}>
            <div className="row" style={{height:'80%' , overflowY:'auto'}}>
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
