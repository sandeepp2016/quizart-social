import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';

export default class ProgressBar extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      completed:100,
    };
  }
  componentDidMount(){
    var outerThis = this;
    var sec = this.props.seconds;
    var diff = (100/sec);


    var t = setInterval(function(){

      outerThis.setState({completed:outerThis.state.completed-diff});
      if(outerThis.state.completed===0 ){
      outerThis.setState({completed:100});
      }
    },1000)
  }
  render(){
    if(this.props.seconds==1) return null;
  return(

    <div>
      <LinearProgress mode="determinate" value={this.state.completed} style={{height:this.props.height}} />
  </div>
  );
  }
};
ProgressBar.defaultProps={
  height:10,
  seconds:20
};
