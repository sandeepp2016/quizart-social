import React from 'react';
import SignUPComponent from './SignUPComponent.jsx';
import Paper from 'material-ui/Paper';

export default class SignUP extends React.Component {
  render(){
    return (
      <div className="row center-xs">
        <div className="col-lg-5 col-md-6 col-sm-7">
          <Paper style={{padding: '50px', margin: '50px'}}>
            <SignUPComponent />
          </Paper>
        </div>
      </div>
    );
  }
}
