import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import { Router, Route, Link, browserHistory } from 'react-router'



export default class LinearStepper extends React.Component {
constructor() {
    super();
  this.state = {
    finished: false,
    stepIndex: 0,

  };
}

  handleNext  ()  {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev ()  {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  renderStepActions(step) {
    const {stepIndex} = this.state;

    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label={stepIndex === 2 ? 'Finish' : 'Next'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={this.handleNext.bind(this)}
          style={{marginRight: 12}} />
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={this.handlePrev.bind(this)} />
        )}
      </div>
    );
  }

  render() {
    const {finished, stepIndex} = this.state;

    return (
      <div style={{width: 380, height: 600, margin: 'auto'}}>

      <Stepper activeStep={stepIndex} orientation="horizontal">
          <Step>
            <StepLabel>Enter the Tournament Name </StepLabel>
            <StepContent>
              <div>
            <TextField style={{marginTop: 0}} floatingLabelText="Tournament Name" />
              {this.renderStepActions(0)} </div>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Topic Name </StepLabel>
            <StepContent>
              <div>
            <TextField style={{marginTop: 0}} floatingLabelText="Topic Name" />
              {this.renderStepActions(1)} </div>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Create an ad</StepLabel>
            <StepContent>
              <p>
                Ok lets add more featues and do it
              </p>
              {this.renderStepActions(2)}
            </StepContent>
          </Step>
        </Stepper>

      </div>
    );
  }
}
