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
import base64 from 'base-64';

  const style ={
    margin: 5,
  }


  export default class Group extends React.Component{

  constructor(props){
    super(props);
    var username = (JSON.parse(base64.decode(localStorage.token.split('.')[1])).sub);
    this.state=({
      groupName: "",selectedusers:[],selected:'', users:[] ,username :username
    })
  }

  handleGroupName(e){
    this.setState({
      groupName : e.target.value
    })
  }

  autoSubmit(e){
    if(e.keyCode===13){
        this.handleListDisplay(e.target.value)
        e.target.value='';
    }
  }

  handleListDisplay(text){
    this.setState({
        selectedusers:this.state.selectedusers.concat(text)
      })

  }

  handleSubmit(){
    console.log("======Inside Add group client, selected users ,",this.state.selectedusers);
    console.log("=======InsideAdd group client, username is === ", this.state.username);
    this.setState({selectedusers:this.state.selectedusers.push(this.state.username)})
    this.props.addGroup(this.state.groupName,this.state.selectedusers);
    this.props.close;
    this.setState({
      groupName : ''
    })
  }


  deleteUser(index){
    if(index===0){
      this.state.selectedusers.splice(-1,1)
      this.setState({
        selectedusers :this.state.selectedusers
      })
    }
    this.state.selectedusers.splice(index,1)
    this.setState({
      selectedusers :this.state.selectedusers
    })

  }
  render(){
    var outerThis = this;
    // console.log("+++Inside Group component UserData ",this.props.data);
    var friends = this.props.data.map(function(data){
                return(data.username)
        })
        console.log("+++Inside Group, Friends for Autocomplete",friends);

    return(
      <div>
          <div className="row">
            <div className="col-lg-11 col-md-11 col-sm-11 col-xs-11" style={style}>
              <h4>Create your Group</h4>
              <form>
                  <TextField
                  hintText="Group Name"
                  value={this.state.groupName}
                  floatingLabelText="Group Name"
                  onChange={this.handleGroupName.bind(this)}
                  />
              </form>
            </div>
          </div>

            <div className="row" >
                <div className="col-lg-11 col-md-11 col-sm-11 col-xs-11" style={style}>
                  <AutoComplete
                    floatingLabelText="Add a Friend"
                    hintText="Add a Friend"
                    filter={AutoComplete.fuzzyFilter}
                    dataSource={friends}
                    maxSearchResults={5}
                    onKeyDown={this.autoSubmit.bind(this)}
                  />
                </div>
            </div>

            <div className="row" >
                <div className="col-lg-11 col-md-11 col-sm-11 col-xs-11" style={style} >
                    <ul>{this.state.selectedusers.map(function(l,index){
                        return(
                          <div className="row">
                            <div className="col-lg-8" >
                              <li style={{display:'inline'}} >{l}</li>
                            </div>
                            <div className="col-lg-4" >
                                <span style={{cursor:'pointer'}}>
                                <FontIcon className="muidocs-icon-navigation-close" onTouchTap={outerThis.deleteUser.bind(outerThis,index)}/>
                                </span>
                            </div>
                          </div>
                        )
                    })}
                    </ul>
                </div>
            </div>

            <div className="row">
              <div className="colxs-11 col-sm-11 col-md-11 col-lg-11" style={style}>
                <FlatButton
                  label="Create Group"
                  secondary={true}
                  onTouchTap={outerThis.handleSubmit.bind(outerThis)}
                />
                <FlatButton
                  label="Cancel"
                  secondary={true}
                  onTouchTap={this.props.close}
                />
              </div>
            </div>
        </div>
    )
  }

};


// <div className="col-lg-4" >
//     <span style={{cursor:'pointer'}}>
//     <FontIcon className="muidocs-icon-navigation-close" onTouchTap={outerThis.deleteUser.bind(outerThis,index)}/>
//     </span>
// </div>
