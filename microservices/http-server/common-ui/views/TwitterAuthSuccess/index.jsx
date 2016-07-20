import React from 'react';
import {Link} from 'react-router';
import restUrl from '../../restUrl';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


const style = {
  marginBottom:12,
  width:'100%',
};

const text = {
  margin:0,
  padding:0,
  textAlign:'center'
}


export default class TwitterAuthSuccess extends React.Component{
  constructor(props,context){
    super(props,context);
     console.log("Inside Auth Success View Constructor");
     this.state = {open:false,text:""};
  }

  static get contextTypes() {
    return {
      router: React.PropTypes.object
    }
  } // Used to provide property validation.Currently we are saying that we need a context prop of type "React.PropTypes.object"

  componentDidMount(){
    console.log("=====Inside Componenet did mount of Auth Success=====",this.props.params.token);
    var token = this.props.params.token;
    //localStorage.authToken = this.props;
    console.log("===token is ====",token);
    if(token=="error"){
       this.setState({open:true,text:"something went wrong please try again"});
    }
    else {
       localStorage.authToken = token;
       this.setState({open:true,flag:true,text:"you have successfully linked with twitter"});

    }
  }
    handleClose(){
       this.setState({open: false});
       this.context.router.push('/');
     }

  render (){

    const actions = [
     <FlatButton
       label="Close"
       primary={true}
       onTouchTap={this.handleClose.bind(this)}
     />
     ];

    console.log("=====Inside the Auth Success render function=======");
    return (
       <div>
       <Dialog
         actions={actions}
         modal={false}
         open={this.state.open}
         onRequestClose={this.handleClose}
       >
       {this.state.text}
      </Dialog>
      </div>

    );
  }
};
