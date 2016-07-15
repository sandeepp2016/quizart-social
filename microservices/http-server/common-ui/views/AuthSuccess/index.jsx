import React from 'react';
import {Link} from 'react-router';
import restUrl from '../../restUrl';



const style = {
  marginBottom:12,
  width:'100%',
};

const text = {
  margin:0,
  padding:0,
  textAlign:'center'
}


export default class AuthSuccess extends React.Component{
  constructor(props,context){
    super(props,context);
    console.log("Inside Auth Success View Constructor");
  }

  static get contextTypes() {
    return {
      router: React.PropTypes.object
    }
  } // Used to provide property validation.Currently we are saying that we need a context prop of type "React.PropTypes.object"

  componentDidMount(){
    console.log("=====Inside Componenet did mount of Auth Success=====",this.props.params.token);
    var token = this.props.params.token;
    localStorage.token = this.props.params.token;
    this.context.router.push('/');
  }

  render (){
    console.log("=====Inside the Auth Success render function=======");
    return (
      <div>

        <p>Google/Facebook Login is Successful...Redirecting to Dashboard....</p>

      </div>

    );
  }
};
