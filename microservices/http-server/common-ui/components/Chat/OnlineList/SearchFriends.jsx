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


export default class SearchFriends extends React.Component{

  constructor(props){
    super(props);
    this.state ={
      searchString : ''
    }
  }

  handleChange(e){
    this.setState({searchString : e.target.value});
  }

  render(){
    var onlineList= this.props.userList,
    searchString = this.state.searchString.trim().toLowerCase();

        if(searchString.length > 0){
                onlineList = onlineList.filter(function(l){
                    return l.Name.toLowerCase().match( searchString );
                });
              }

              // console.log(this.props.userList.map(function(l){
              //
              // });

              return (
                <div>
                  <input type="text" value={this.state.searchString} onChange={this.handleChange.bind(this)} placeholder="Search Friend" />
                      <ul>
                          { this.props.userList.map(function(l){
                            return <li>{l.Name}</li>
                          }) }
                      </ul>
                </div>
              );

};
}
