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
import ChatBoxAll from './ChatBoxAll';
import GroupInfo from '../GroupInfo';
import Dialog from 'material-ui/Dialog';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import ChangeGroupName from '../ChangeGroupName';
import base64 from 'base-64';
import restUrl from '../../../restUrl';
//
// var username = (JSON.parse(base64.decode(localStorage.token.split('.')[1])).sub);
// username = username.split("@")[0];

const style = {margin : 5};

export default class ChatBox extends React.Component{

  constructor(props){
    super(props);
    // console.log("========Inside Chatbox in its constructor=======");
    var socket1 = io.connect(restUrl+'/chat');
    this.state={
      view:'chatbox',popoverOpen : false, GroupData:[], dialogOpen: false,groupFlag: this.props.GroupFlag,
      socket:socket1 , FriendId: this.props.SelectedFriendId , GroupId :this.props.SelectedGroupId
    }
  }

  componentDidMount(){
  // console.log("====inisde did mount of chat box, the flag is ",this.props.GroupFlag);
    // this.setState({socket:socket1});
    var outerThis = this;
    if(this.props.GroupFlag){
      this.setState({
        GroupData : this.props.SelectedGroupData,
        FriendId : null,
        // UserArray : this.props.SelectedGroupData.users,
        titleName : this.props.SelectedName,
      })
    }
    else{
      this.setState({
        GroupData : null,
        UserArray : null,
        FriendId : this.props.FriendId,
        titleName : this.props.SelectedName,
      })
    }

    // console.log("Inside ChatBox,user data is====",this.props.UserData);
    // console.log("Inside ChatBox,user name is====",this.props.Name);
    // this.props.UserData.map(function(data){
    //   console.log("Before if loop of chatbox, the props name is,",outerThis.props.Name);
    //   if(data.name===outerThis.props.Name){
    //     console.log("Inside if loop of chatbox, the props name is,",outerThis.props.Name);
    //     console.log("Inside if loop of chatbox, the userdata name is,",data.name);
    //     outerThis.setState({
    //       friendid: data.username
    //     })
    //   }
    // })

  };

  popoverOpen(event) {
    event.preventDefault();
    this.setState({
      popoverOpen: true,
      anchorEl: event.currentTarget,
    });
  }

  popoverClose(){
    this.setState({
    popoverOpen: false,
  });
  }

  viewGroupInfo(){
    // console.log("Inside viewGroupInfo");
    this.setState({
      view:'groupinfo',popoverOpen: false,
    })
  }

  leaveGroup(){
    this.setState({
        dialogOpen:true ,popoverOpen :false,
    })
  }

  closeDialog(){
    this.setState({
      dialogOpen:false
    })
  }

  confirmLeave(){
    // console.log(typeof(this.state.GroupData));
    // var url = "http://localhost:8080/groups/"+this.state.GroupData.id;
    // this.state.UserArray.splice(this.state.UserArray.indexOf(user),1);
    // this.setState({
    //   UserArray : this.state.UserArray
    // },function(){
    //   console.log(this.state.UserArray);
    //   $.ajax({
    //     url: url,
    //     dataType: 'json',
    //     type: 'PUT',
    //     data : {groupname : this.state.GroupData.groupname ,
    //             users : JSON.stringify(this.state.UserArray),
    //             }
    //   });
    // })
    // this.setState({
    //   dialogOpen : false
    // })
  }

  changeName(){
    this.setState({
      view: 'changename' ,popoverOpen: false,
    })
  }

  closeChangeGroup(text){
    // console.log("inside close change group");
    this.setState({
      view: 'chatbox',
    })
  }

  closeChatBox(){
    // console.log("=====Inside Chat Box , closing the socket connection====");
    // socket1.close();
    this.state.socket.disconnect();
    // socket1.disconnect();
    this.props.closeChatBox("Close Chatbox");
  }


  render(){

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.closeDialog.bind(this)}
      />,
      <FlatButton
        label="Leave"
        primary={true}
        onTouchTap={this.confirmLeave.bind(this)}
      />,
    ];
    var outerThis=this;
    // console.log("=====Insisde chatbox check flag ,state of groupflag",this.state.groupFlag);log

    return(
      <div>
        <div>
            <Dialog
            actions={actions}
            modal={false}
            open={this.state.dialogOpen}
            onRequestClose={this.closeDialog.bind(this)}
            >
            Are you Sure, You Want to Leave this Group?
          </Dialog>
        </div>
      <div style={{height:'100vh'}}>
        <div className="row" style={{height:'10%'}}>
              <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3" >
                <div style={{marginLeft:20,marginTop:19}}><span style={{cursor:'pointer'}}>
                  <FontIcon className="muidocs-icon-navigation-arrow_back" onTouchTap={this.closeChatBox.bind(this)}/>
                </span></div>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="row">
                  <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <Avatar src='http://lorempixel.com/100/100' size={30} style={style} />
                  </div>
                  <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <h3 style={{textAlign:'center'}}>{this.props.SelectedName}</h3>
                  </div>
                </div>
              </div>
              <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                {this.state.groupFlag?
                  <center style={{margin:19}}>
                    <span style={{cursor:'pointer'}}>
                      <FontIcon className="muidocs-icon-navigation-more_vert" onTouchTap={this.popoverOpen.bind(this)}/>
                    </span>
                  </center>:null}

                <Popover
                  open={this.state.popoverOpen}
                  anchorEl={this.state.anchorEl}
                  autoCloseWhenOffScreen={true}
                  anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                  onRequestClose={this.popoverClose.bind(this)}
                >
                <Menu>
                  <MenuItem primaryText="Group Info" leftIcon={<FontIcon className="muidocs-icon-action-people_outline"/>}
                  onTouchTap={outerThis.viewGroupInfo.bind(outerThis)}/>
                  <MenuItem primaryText="Leave Group" leftIcon={<FontIcon className="muidocs-icon-action-exit_to_app"/>}
                  onTouchTap={outerThis.leaveGroup.bind(outerThis)}/>
                  <MenuItem primaryText="Change Picture" leftIcon={<FontIcon className="muidocs-icon-av-album"/>}/>
                  <MenuItem primaryText="Change Group Name" leftIcon={<FontIcon className="muidocs-icon-image-edit"/>}
                  onTouchTap={outerThis.changeName.bind(outerThis)}/>
                </Menu>
                </Popover>
              </div>
        </div>
        <Divider />
        <div >
          {this.state.view==="chatbox" ?
              <ChatBoxAll friendid={this.state.FriendId} groupid = {this.state.GroupId} socket={this.state.socket}/> :
              this.state.view==="groupinfo" ? <GroupInfo GroupData={this.state.GroupData}/> : null
          }

        </div>
      </div>
    </div>
    )
  }


};
//
//
// (this.state.view==="groupinfo" && this.state.groupFlag === true) ?
// <GroupInfo GroupData={this.state.GroupData} UserData={this.state.UserData}/> :
// (this.state.view==="changename" && this.state.groupFlag === true)?
// <ChangeGroupName GroupData={this.state.GroupData} close={this.closeChangeGroup.bind(this)}/> : null
