import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import LinearStepper from './Stepper';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';


export default class CreateGroupDialog extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      groupName:'', OnlineUsers:[] , searchText :'' ,selectedusers:[]
    }
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
  }

  handleGroupName(e){
    console.log("Inside handlegroupname");
    this.setState({
      groupName : e.target.value
    })
  }

  handleSubmit(groupName){
    console.log("Inside Handle Submit");
    this.props.submit(groupName);
    this.props.close;
    this.setState({
      groupName : ''
    })
  }

  handelCancel(){
    this.props.close;
    this.setState({
      groupName : ''
    })
  }

  autoSubmit(e){
    if(e.keyCode===13){
        this.handleListDisplay(e.target.value)
        e.target.value='';
    }
  }

  handleListDisplay(text){
    console.log("inside handlelist display");
    this.setState({
      selected:text
    }, function(){
      console.log(this.state.selected);
      this.setState({
        selectedusers:this.state.selectedusers.concat(this.state.selected)
      }, function(){
        console.log(this.state.selectedusers.length);
      })
    })
  }

  handleBlur(e){
    console.log("inside Blur");
    e.target.value='';
    this.setState({
      searchText:''
    })
  }


  render(){
    var outerThis =this;
    var friends = this.props.data.map(function(data){
                return(data.Name)
        })


    return(
          <Dialog
            title="Create your Group"
            modal={false}
            open={this.props.open}
            autoDetectWindowHeight= {true}
            autoScrollBodyContent= {true}
            onRequestClose={this.props.close}
          >

              <div>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <form>
                        <TextField
                        hintText="Group Name"
                        fullWidth={true}
                        value={this.state.groupName}
                        floatingLabelText="Enter your Group Name"
                        onChange={this.handleGroupName.bind(this)}
                        />
                    </form>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <AutoComplete
                      floatingLabelText="Search Friend"
                      filter={AutoComplete.fuzzyFilter}
                      dataSource={friends}
                      maxSearchResults={5}
                      onKeyDown={this.autoSubmit.bind(this)}
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">

                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <h4>Selected Friends </h4>
                      <ul>{this.state.selectedusers.map(function(l){
                          return(
                            <li>{l}</li>
                          )
                      })}
                      </ul>
                  </div>
                </div>

                <div className="row">
                    <FlatButton
                      label="Create Group"
                      primary={true}
                      onTouchTap={outerThis.handleSubmit.bind(outerThis,this.state.groupName)}
                    />
                    <FlatButton
                      label="Cancel"
                      primary={true}
                      onTouchTap={this.props.close}
                    />
                </div>
            </div>

          </Dialog>
    )
  }
};
