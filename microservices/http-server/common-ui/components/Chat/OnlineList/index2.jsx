import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import AppBar from 'material-ui/AppBar';

import RaisedButton from 'material-ui/RaisedButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MediaQuery from 'react-responsive';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import CreateGroupDialog from './CreateGroupDialog';
import Group from './Group';
import FriendGroupList from './FriendGroupList';

var user = 'Vigneshwar';
export default class OnlineList extends React.Component{

    constructor(props){
      super(props);
      this.state = {
      popoverOpen: false,groupName: "",OnlineUsers:[], GroupData:[],
      view:'List' , username:'vigneshwar'
      };
    }

    componentDidMount(){
      $.ajax({
        url: "http://localhost:8080/posts/all/4",
        dataType: 'json',
        type: 'GET',
        cache: false,
        success: function(data) {
          this.setState({
            OnlineUsers : JSON.stringify(data)
          })
          console.log("All Posts" ,this.state.OnlineUsers);
        }.bind(this),
        error: function(xhr, status, err) {
          console.error("http://localhost:8080/posts/all", status, err.toString());
        }.bind(this)
      });
    }


      addPost(){
        $.ajax({
          url: "http://localhost:8080/addpost/4",
          dataType: 'json',
          type: 'POST',
          data: {
                  id : 3,
                  post :"this had been posted"
          }
      })
    };

    deletePost(){
      $.ajax({
        url: "http://localhost:8080/deletepost/3",
        dataType: 'json',
        type: 'DELETE',
        success: function(data) {
          console.log("Delete post success");
        }.bind(this),
        error: function(xhr, status, err) {
          console.error("http://localhost:8080/deletepost/3", status, err.toString());
        }.bind(this)
    })
    }

    putPost(){
      $.ajax({
        url: "http://localhost:8080/putpost/3",
        dataType: 'json',
        type: 'PUT',
        data:{id : 3,
        post :"this had been posted and updated"},
        success: function(data) {
          console.log("PUT post success");
        }.bind(this),
        error: function(xhr, status, err) {
          console.error("http://localhost:8080/putpost/3", status, err.toString());
        }.bind(this)
    })
    }

    render(){
      return(
        <div>
            <h4>hi</h4>
            <RaisedButton primary={true} onTouchTap={this.addPost.bind(this)} label="Add post" />
            <RaisedButton primary={true} onTouchTap={this.deletePost.bind(this)} label="Delete" />
            <RaisedButton primary={true} onTouchTap={this.putPost.bind(this)} label="Put" />
        </div>
      )
    }


};

//
// {this.state.OnlineUsers.map(function(d){
//   return(
//     <div>
//     <h4>{d.id}</h4>
//     <h3>{d.post}</h3>
//     </div>
//   )
// })}
