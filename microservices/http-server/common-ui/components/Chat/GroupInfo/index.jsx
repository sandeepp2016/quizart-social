 import React from 'react';
import TextField from 'material-ui/TextField';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import restUrl from '../../../restUrl';

export default class GroupInfo extends React.Component{

constructor(props){
  super(props);
  this.state = ({
    userInfo:[],
  })
}

componentDidMount(){
  var outerThis=this;
  console.log(typeof(this.props.GroupData));
  console.log(this.props.GroupData);
  // console.log(this.props.UserData);

  $.ajax({
    url: restUrl + '/api/v1/groupslist/getgroupmembers/'+this.props.GroupData.topicid,
    type: 'GET',
    contentType: 'application/json',
    cache: false,
    success : function(data){
      console.log("=====inside Group info success method");
      console.log("====Inside Group info retrieved group members ",data.data);
      console.log("====Inside client groups",data.data[0]);
      this.setState({userInfo: data.data});
    }.bind(this)
  });
  // var temp =[];
  // this.props.GroupData.map(function(u){
  //   outerThis.props.UserData.map(function(d){
  //     if(u===d.username){
  //       console.log(d.username);
  //       console.log(d.useravatar);
  //       temp= temp.concat({name:d.username , img:d.useravatar})
  //     }
  //   })
  // })
  // console.log(temp);
  // this.setState({
  //   userInfo : temp
  // })
}

render(){
  var outerThis=this;
  return(
      <div>
        <div className="row">
        <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12">
          <List>
              <Subheader>Members</Subheader>
                {this.state.userInfo.map(function(u){
                  return(
                    <ListItem
                      primaryText={u.name}
                      leftAvatar={<Avatar src={u.useravatar} />}
                      rightIcon={<FontIcon className="muidocs-icon-social-person"/>}
                      />
                  )
                })}
          </List>
          </div>
        </div>
      </div>
  )
}

};
