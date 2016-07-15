import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin:12,
  width:'100%'
}
export default class Questions extends React.Component{
render (){
  if(!this.props.data.question) return null;
return (

  <div class="ques">
    <div >
    <div className='row' >
      <div className='col-xs-12'>
        <div className='row center-xs'>
          <p>Captial{this.props.data.question}</p>
        </div>
      </div>
    </div>
    <div className='row' >
      <div className='col-xs-6 col-sm-6 col-lg-4 col-md-4'>
          <RaisedButton label={this.props.data.question}  primary={true} style={style} />
      </div>
      <div className='col-xs-6 col-sm-6 col-lg-4 col-md-4'>
          <RaisedButton label={this.props.data.question} primary={true} style={style} />
      </div>
      <div className='col-xs-6 col-sm-6 col-lg-4 col-md-4'>
          <RaisedButton label={this.props.data.question} primary={true} style={style} />
      </div>
      <div className='col-xs-6 col-sm-6 col-lg-4 col-md-4'>
          <RaisedButton label={this.props.data.question} primary={true} style={style} />
      </div>
      <div className='col-xs-6 col-sm-6 col-lg-4 col-md-4'>
          <RaisedButton label="kolkata" primary={true} style={style} />
      </div>
      <div className='col-xs-6 col-sm-6 col-lg-4 col-md-4'>
          <RaisedButton label="kolkata" primary={true} style={style}  />
      </div>
    </div>
    </div>
  </div>
);
}
};
