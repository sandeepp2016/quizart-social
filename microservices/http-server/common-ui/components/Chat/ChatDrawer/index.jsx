import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FontIcon from 'material-ui/FontIcon';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

import {blue300, red500, greenA200} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import OnlineList from '../OnlineList';
import ChatComponent from '../ChatComponent';


const style = {
  fontSize:40,
};

export default class ChatDrawer extends React.Component{

  constructor(props) {
    super(props);
    this.state ={isOpen:''}
  }

  openDrawer(){
    this.setState({isOpen:"open"});
  }

  closeDrawer() {
    this.setState({isOpen: 'close'});
  }

  handleClose(text){
    console.log(text);
    this.setState({isOpen:'close'});
  }


  render(){
    const chatDrawerOpen ={width: 300,
      height: '100vh',
      transition: '0.3s',
      zIndex:2,
      backgroundColor:'white',
      position: 'fixed',
      top:0,
      right:0,
    };

    const chatDrawerClose ={width: 0,
      height: 10,
      background: 'inherit',
      transition: '0.3s',
      zIndex:2,
      opacity:0.6,
      position: 'fixed',
      top:0,
      right:0,

    };

    return(
            <div >
                <div style={{marginLeft:20,position:'fixed'}}>

                    <span style={{cursor:'pointer'}}><FontIcon
                        className="muidocs-icon-communication-chat"
                        color="inherit"
                        onTouchTap={this.openDrawer.bind(this)}
                    /></span>

                </div>

                <div style={this.state.isOpen==='open'?chatDrawerOpen:chatDrawerClose}>
                  <ChatComponent onHandleClose={this.handleClose.bind(this)}/>
                 </div>


            </div>
          )
      }
}

//
// <div style={this.state.isOpen?chatDrawerOpen:chatDrawerClose}>
//   {this.state.view=="OnlineList"?<OnlineList onChatDrawerClose={this.handleClose.bind(this)}
//                                   openChatBox={this.openChatBox.bind(this)} />:<ChatBoxAll  openOnlineList={this.displayOnlineList.bind(this)} />}
// </div>
