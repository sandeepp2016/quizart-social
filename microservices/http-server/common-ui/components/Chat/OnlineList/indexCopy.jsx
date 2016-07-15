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

export default class OnlineList extends React.Component{

    constructor(props){
      super(props);
      this.state = {
      menuOpen: false, dialogOpen: false,groupName: "",OnlineUsers:[], GroupData:[],
      view:'OnlineList'
      };
    }

    componentDidMount(){
      $.ajax({
        url: "http://localhost:8080/users",
        dataType: 'json',
        type: 'GET',
        cache: false,
        success: function(data) {

          this.setState({OnlineUsers: data});

        }.bind(this),
        error: function(xhr, status, err) {
          console.error("http://localhost:8080/users", status, err.toString());
        }.bind(this)
      });

      $.ajax({
        url: "http://localhost:8080/groups",
        dataType: 'json',
        type: 'GET',
        cache: false,
        success: function(data) {
          this.setState({GroupData: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error("http://localhost:8080/groups", status, err.toString());
        }.bind(this)
      });
    }

    handleTouchTap(username) {
      console.log("Inside handleTouchTap");
      this.props.openChatBox(username);
    }

    menuOpen(event) {
      event.preventDefault();
      this.setState({
        menuOpen: true,
        anchorEl: event.currentTarget,
      });
    }

    menuClose(){
      this.setState({
      menuOpen: false,
    });
    }

    createGroup(){
        this.setState({
          dialogOpen: true,
        })
    };

    postGroupName(group){
      console.log("inside post group name");
      $.ajax({
        url: "http://localhost:8080/groups",
        dataType: 'json',
        type: 'POST',
        data: group,
        error: function(xhr, status, err) {
          console.error("http://localhost:8080/groups", status, err.toString());
        }.bind(this)
      });
    }

    addGroup(text){
      console.log("Inside add group");
      this.postGroupName({groupname:text});
      this.setState({
        groupName : '' ,dialogOpen : false,
      })
    }

    closeDialog(){
      this.setState({
        dialogOpen:false,
      })
    }

    render(){

      var outerThis = this;
      return(
            <div style={{height:'100vh', overflowY:'auto'}}>
              <CreateGroupDialog open={this.state.dialogOpen} close={this.closeDialog.bind(this)} submit={this.addGroup.bind(this)} data={this.state.OnlineUsers}/>
            <MediaQuery query='(min-device-width: 800px)'>
              <MediaQuery query='(min-width: 800px)'>
                  <div className="row" >
                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                      <center style={{margin:19}}>
                        <span style={{cursor:'pointer'}}>
                          <FontIcon className="muidocs-icon-navigation-close" onTouchTap={this.props.closeList }/>
                        </span>
                      </center>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                      <h2 style={{textAlign:'center'}}>Chat</h2>
                    </div>
                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <center style={{margin:19}}>
                      <span style={{cursor:'pointer'}}>
                        <FontIcon className="muidocs-icon-navigation-more_vert" onTouchTap={this.menuOpen.bind(this)}/>
                      </span>
                    </center>
                      <Popover
                        open={this.state.menuOpen}
                        anchorEl={this.state.anchorEl}
                        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        onRequestClose={this.menuClose.bind(this)}
                      >
                      <Menu>
                        <MenuItem primaryText="Create Group" onTouchTap={this.createGroup.bind(this)}/>
                        <MenuItem primaryText="Settings" />
                        <MenuItem primaryText="Sign out" />
                      </Menu>
                      </Popover>
                    </div>
                  </div>
              <Divider />
            </MediaQuery>
            </MediaQuery>

            <MediaQuery query='(max-device-width: 800px)'>
              <MediaQuery query='(max-width: 800px)'>
                <div className="row">
                  <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                    <TextField hintText="Search Friend" />
                  </div>
                  <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                    <span style={{cursor:'pointer'}} >
                      <FontIcon className="muidocs-icon-social-group_add" style={{margin:19}} onTouchTap={this.createGroup.bind(this)}/>
                    </span>
                  </div>
                </div>
              </MediaQuery>
            </MediaQuery>



              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <List>
                      <Subheader>Friends</Subheader>
                        {this.state.OnlineUsers.map(function(data){
                          return(  <ListItem id = {data.id}
                            primaryText={data.Name}
                            leftAvatar={<Avatar src={data.img} />}
                            rightIcon={<CommunicationChatBubble />}
                            onTouchTap={outerThis.handleTouchTap.bind(outerThis,data.Name)}
                            />);
                        })}
                        </List>
                      <Divider/>
                    <List>
                      <Subheader>Groups</Subheader>
                      {this.state.GroupData.map(function(data){
                        return(  <ListItem id = {data.id}
                          primaryText={data.groupname}
                          leftAvatar={<Avatar src={data.img} />}
                          rightIcon={<FontIcon className="muidocs-icon-social-group"/>}
                          onTouchTap={outerThis.handleTouchTap.bind(outerThis,data.groupname)}
                          />);
                      })}
                    </List>
                </div>
              </div>
            </div>

      )
    };
};
