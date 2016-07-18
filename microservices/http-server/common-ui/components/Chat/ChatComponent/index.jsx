import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import ChatBox from '../ChatBox';
import {blue300, red500, greenA200} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import OnlineList from '../OnlineList';


export default class ChatComponent extends React.Component{

  constructor(props) {
    super(props);
    this.state ={view:'OnlineList'}
    console.log("===Inside Chat Component, Initial View : ",this.state.view);
  }

 openChatBox(name,FriendId,GroupData,groupFlag) {
   console.log("===Inside Chat Component, Chat Box being opened for: ",name);
   var GroupId = null;
   if(groupFlag){
     GroupId = GroupData.topicid;
   }
   console.log("====Inside Chat Component, the group id selected is====",GroupId);
   this.setState({SelectedName:name , SelectedFriendId:FriendId , SelectedGroupData: GroupData , SelectedGroupId:GroupId,groupFlag:groupFlag,view:'ChatBox'});
 }
 closeChatBox(text){
    this.setState({view:'OnlineList'});
 }

 closeDrawer(text){
   this.props.onHandleClose("close");
 }

  render(){
    return(
        <div>
        {this.state.view=="OnlineList"?<OnlineList closeDrawer={this.closeDrawer.bind(this)} openChatBox={this.openChatBox.bind(this)}/>
        :this.state.view=="ChatBox"?<ChatBox closeChatBox={this.closeChatBox.bind(this)}
         SelectedName={this.state.SelectedName} SelectedGroupData={this.state.SelectedGroupData} SelectedFriendId={this.state.SelectedFriendId}
         GroupFlag={this.state.groupFlag} SelectedGroupId={this.state.SelectedGroupId}/>  : null}
        </div>
    )
  }

};
