import React from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import Divider from 'material-ui/Divider';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Download from 'material-ui/svg-icons/file/file-download';
import Delete from 'material-ui/svg-icons/action/delete';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import MediaQuery from 'react-responsive';
import {Link} from 'react-router';
import Drawer from 'material-ui/Drawer';
import Avatar from 'material-ui/Avatar';
import Badge from 'material-ui/Badge';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import base64 from 'base-64';

import ActionAccountbox from 'material-ui/svg-icons/action/account-box';
import ActionTurnedin from 'material-ui/svg-icons/action/turned-in';
import ActionViewmodule from 'material-ui/svg-icons/action/view-module';
import ActionViewquilt from 'material-ui/svg-icons/action/view-quilt';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionFingerprint from 'material-ui/svg-icons/action/fingerprint';


export default class MainAppBar extends React.Component {
  constructor() {
    super();
    this.state = {dropDown: false, open: false,appbarContainer: {
    	position: 'fixed',
    	width: '100%',
    	zIndex: 1,
    },
      Profile: {
        username: { value: JSON.parse(base64.decode(localStorage.token.split('.')[1])).sub},
      }
    };
  }

  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    }
  }

  showMenu() {
    this.setState({dropDown: !this.state.dropDown});
    if(!this.state.dropDown) {
      this.setState({appbarContainer: {
      	position: 'fixed',
      	width: '100%',
      	zIndex: 1
      }});
    } else {
      console.log("here");
      this.setState({appbarContainer: {}});
    }
  }

  clearLogin() {
    delete localStorage.token;
    this.context.router.push('/login');
  }

  handleTopics(e){
    e.preventDefault();
    this.context.router.push('/topics');
  }

  handleProfile(e){
    e.preventDefault();
    this.context.router.push(
      '/profilePage/'+this.state.Profile.username.value
    );
  }

  goToDashBoard(e){
    e.preventDefault();
    this.context.router.push('/');
  }

  handleDrawerOpen() {
    this.setState({open: true});
  }

  handleClick(){
    this.context.router.push(
      '/profilePage/'+"deepak1@gmail.com"
    );
  }

  render() {
    const style = {
      margin: 12,
      color: "white"
    };

    return (
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <AppBar title="QuizRT-Social" style={this.state.appbarContainer} onLeftIconButtonTouchTap={this.handleDrawerOpen.bind(this)}  >
              <RaisedButton label="Go to Deepak's Profile" onTouchTap={this.handleClick.bind(this)}/>
              <Badge
                badgeContent={2}
                default={true}
              >
              <span style={{cursor:'pointer'}}>
              <FontIcon className="muidocs-icon-social-notifications" style={{color:'white'}} />
              </span>

              </Badge>
              <span style={{cursor:'pointer'}}>
              <FontIcon className="muidocs-icon-action-exit_to_app" style={{color:'white',margin:19}} onTouchTap={this.clearLogin.bind(this)}/>
              </span>
        </AppBar>
        <Drawer
          docked={false}
          width={250}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <div style={{width: '100%', textAlign: 'center'}}>
            <Avatar size={200} style={{margin: '30px 0 30px'}}>A</Avatar>
          </div>
          <Divider />
          <List>
            <ListItem primaryText="Home" leftIcon={<ActionHome />}
              onTouchTap={this.goToDashBoard.bind(this)}/>
            <ListItem primaryText="View Profile" leftIcon={<ActionAccountbox />}
            onTouchTap={this.handleProfile.bind(this)}
            />
            <ListItem primaryText="Topics" leftIcon={<ActionViewmodule />}
              onTouchTap={this.handleTopics.bind(this)}/>
            <ListItem primaryText="Tournaments" leftIcon={<ActionViewquilt />} containerElement={<Link to="/tournament" />}/>
            <ListItem primaryText="Create Tournament" leftIcon={<ActionViewquilt />} containerElement={<Link to="/create" />}/>
            <ListItem primaryText="Change Password" leftIcon={<ActionFingerprint />} containerElement={<Link to="/my-account/change-password" />}/>
          </List>
        </Drawer>
        </div>
      </div>
    );
  }
}
