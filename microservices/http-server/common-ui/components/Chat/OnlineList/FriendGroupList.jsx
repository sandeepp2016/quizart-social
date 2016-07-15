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
import IconMenu from 'material-ui/IconMenu';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MediaQuery from 'react-responsive';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import CreateGroupDialog from './CreateGroupDialog';

export default class FriendGroupList extends React.Component{

  constructor(props){
    super(props);
  }


  render(){
    var outerThis = this;
    return(
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <List>
              <Subheader>Friends</Subheader>
                {this.props.usersData.map(function(data){
                  return(  <ListItem id = {data._id}
                    primaryText={data.name}
                    leftAvatar={<Avatar src={data.useravatar} />}
                    rightIcon={<FontIcon className="muidocs-icon-communication-chat_bubble" />}
                    onTouchTap={outerThis.props.selectList.bind(outerThis,data.name)}
                    />);
                })}
                </List>
              <Divider/>
            <List>
              <Subheader>Groups</Subheader>
              {this.props.groupData.map(function(data){
                return(  <ListItem id = {data._id}
                  primaryText={data.groupname}
                  leftAvatar={<Avatar src={data.groupavatar} />}
                  rightIcon={<FontIcon className="muidocs-icon-social-group"/>}
                  onTouchTap={outerThis.props.selectList.bind(outerThis,data.groupname)}
                  />);
              })}
            </List>
        </div>
      </div>
    )
  };


};
