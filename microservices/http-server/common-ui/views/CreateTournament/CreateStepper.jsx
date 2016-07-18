import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Slider from 'material-ui/Slider';
import TimePicker from 'material-ui/TimePicker';

import restUrl from '../../restUrl';

export default class CreateStepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
      error: false,
      title: "", subTitle: "", desc: "", imgUrl: "http://lorempixel.com/600/337/nature/", avatarUrl: "http://lorempixel.com/600/337/nature/",
      topics: "", games: "", level: "", instructions: "", prize: "",
      regEndDate: "", regEndTime: "", tourStartDate: [], tourStartTime: [], tourEndDate:[], tourEndTime:[],
      registeredPlayers: [], gamePlayedPlayers: [],
      finished1: false,
      stepIndex1: 0,
      step: []
    };
  }

  disableWeekends(date) {
    return date.getDay() === 0 || date.getDay() === 6;
  }

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
    if(stepIndex == 1) {
      for(var i=1;i<=this.state.level;i++) {
        this.state.step.push(
          <Step>
            <StepLabel>Level {i} dates</StepLabel>
          </Step>
        );
        this.state.tourStartDate.push("");
        this.state.tourStartTime.push("");
        this.state.tourEndDate.push("");
        this.state.tourEndTime.push("");
      }
    }
    if(stepIndex >= 2) {
      var levels = [];
      for(var i=0;i<this.state.level;i++) {
        var date = this.state.tourStartDate[i];
        var date1 = this.state.tourEndDate[i];
        var time = this.state.tourStartTime[i];
        var time1 = this.state.tourEndTime[i];
        levels.push(
          {
            tourStartDate: new Date(date.getFullYear(),date.getMonth(),date.getDate(),time.getHours(),time.getMinutes(),time.getSeconds(),time.getMilliseconds()),
            tourEndDate: new Date(date1.getFullYear(),date1.getMonth(),date1.getDate(),time1.getHours(),time1.getMinutes(),time1.getSeconds(),time1.getMilliseconds()),
            registeredPlayers: [],
            gamePlayedPlayers: []
          }
        )
      }
      var date = this.state.regEndDate;
      var time = this.state.regEndTime;
      var tournamentData = {
        title: this.state.title,
        avatarURL: this.state.avatarUrl,
        imageURL: this.state.imgUrl,
        overlayTitle: this.state.title,
        overlaySubtitle: this.state.subTitle,
        description: this.state.desc,
        instructions: this.state.instructions,
        prizes: this.state.prize,
        noOfLevels: this.state.level,
        topics: this.state.topics,
        playersPerGame: this.state.games,
        regEndDate: new Date(date.getFullYear(),date.getMonth(),date.getDate(),time.getHours(),time.getMinutes(),time.getSeconds(),time.getMilliseconds()),
        levels: levels
      };
      console.log(JSON.stringify(tournamentData));
      console.log(this.state.regEndDate+"T"+this.state.regEndTime);
      var request = $.ajax({
        url: restUrl + '/api/v1/tournaments',
        type: 'POST',
        data: JSON.stringify(tournamentData),
        contentType: 'application/json'
      });
      request.done(function(data) {
        console.log('POST success' + JSON.stringify(data));
      }.bind(this));
      request.fail(function() {
        this.setState({
          error: true
        });
      }.bind(this));
    }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    const {stepIndex1} = this.state;
    if(stepIndex === 2) {
      this.setState({
        stepIndex: stepIndex - 1,
        tourStartDate: [],
        tourStartTime: [],
        tourEndDate: [],
        tourEndTime: []
      });
    } else if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  handleNext1 = () => {
    const {stepIndex1} = this.state;
    if (stepIndex1 < this.state.level-1) {
      this.setState({stepIndex1: stepIndex1 + 1});
    }
  };

  handlePrev1 = () => {
    const {stepIndex1} = this.state;
    if (stepIndex1 > 0) {
      this.setState({stepIndex1: stepIndex1 - 1});
    }
  };

  handleTitle(event) {
    this.setState({title: event.target.value});
  };

  handleSubTitle(event) {
    this.setState({subTitle: event.target.value});
  };

  handleDesc(event) {
    this.setState({desc: event.target.value});
  };

  handleImgUrl(event) {
    this.setState({imgUrl: event.target.value});
  };

  handleAvatarUrl(event) {
    this.setState({avatarUrl: event.target.value});
  };

  handleTopics(event) {
    this.setState({topics: event.target.value});
  };

  handleGames(event) {
    this.setState({games: event.target.value});
  };

  handleLevel(event) {
    this.setState({level: event.target.value});
  };

  handleInstructions(event) {
    this.setState({instructions: event.target.value});
  };

  handlePrize(event) {
    this.setState({prize: event.target.value});
  };

  handleRegEndDate(event, date) {
    this.setState({regEndDate: date});
  };

  handleRegEndTime(event, time) {
    this.setState({regEndTime: time});
  };

  handleTourStartDate(event, date) {
    console.log("date: "+date);
    var arr = this.state.tourStartDate;
    arr[this.state.stepIndex1] = new Date(date);
    console.log(arr);
    this.setState({tourStartDate: arr});
  };

  handleTourStartTime(event, time) {
    console.log("start_time: "+time);
    var arr = this.state.tourStartTime;
    arr[this.state.stepIndex1] = new Date(time);
    console.log(arr);
    this.setState({tourStartTime: arr});
  };

  handleTourEndDate(event, date) {
    var arr = this.state.tourEndDate;
    arr[this.state.stepIndex1] = new Date(date);
    this.setState({tourEndDate: arr});
  };

  handleTourEndTime(event, time) {
    var arr = this.state.tourEndTime;
    arr[this.state.stepIndex1] = new Date(time);
    this.setState({tourEndTime: arr});
  };

  getStepContent1(stepIndex) {
    const dateStyle = {paddingTop: '25px'};
    return (
      <div>
        <div className="row">
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <DatePicker hintText="Tournament Start Date" style={dateStyle}
              fullWidth={true}
              value={this.state.tourStartDate[stepIndex]}
              onChange={this.handleTourStartDate.bind(this)}/>
          </div>
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <TimePicker hintText="Tournament Start Time" style={dateStyle} fullWidth={true}
              value={this.state.tourStartTime[stepIndex]} onChange={this.handleTourStartTime.bind(this)} format="24hr" hintText="24hr Format"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <DatePicker hintText="Tournament End Date" style={dateStyle}
              fullWidth={true}
              value={this.state.tourEndDate[stepIndex]}
              onChange={this.handleTourEndDate.bind(this)}/>
          </div>
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <TimePicker hintText="Tournament End Time" style={dateStyle} fullWidth={true}
              value={this.state.tourEndTime[stepIndex]} onChange={this.handleTourEndTime.bind(this)} format="24hr" hintText="24hr Format"
            />
          </div>
        </div>
      </div>
    );
  }

  getStepContent(stepIndex) {
    const dateStyle = {paddingTop: '25px'};
    const styles = {
      block: {
        maxWidth: 250,
      },
      radioButton: {
        marginBottom: 16,
      },
    };
    const contentStyle = {margin: '0 16px'};
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TextField fullWidth={true}
                  hintText="Title"
                  floatingLabelText="Title"
                  value={this.state.title}
                  onChange={this.handleTitle.bind(this)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TextField fullWidth={true}
                  hintText="Sub Title"
                  floatingLabelText="Sub Title"
                  value={this.state.subTitle}
                  onChange={this.handleSubTitle.bind(this)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TextField fullWidth={true}
                  hintText="Description"
                  floatingLabelText="Description"
                  multiLine={true}
                  rows={4}
                  value={this.state.desc}
                  onChange={this.handleDesc.bind(this)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TextField fullWidth={true}
                  hintText="Image Url"
                  floatingLabelText="Image Url"
                  value={this.state.imgUrl}
                  onChange={this.handleImgUrl.bind(this)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TextField fullWidth={true}
                  hintText="Avatar Url"
                  floatingLabelText="Avatar Url"
                  value={this.state.avatarUrl}
                  onChange={this.handleAvatarUrl.bind(this)}
                />
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TextField fullWidth={true}
                  hintText="Topics"
                  floatingLabelText="Topics"
                  value={this.state.topics}
                  onChange={this.handleTopics.bind(this)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TextField fullWidth={true}
                  hintText="Players Per Game"
                  floatingLabelText="Players Per Game"
                  type="number" min="2" max="1000" step="2"
                  value={this.state.games}
                  onChange={this.handleGames.bind(this)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TextField fullWidth={true}
                  hintText="Level"
                  floatingLabelText="Level"
                  type="number" min="1" max="10" step="1"
                  value={this.state.level}
                  onChange={this.handleLevel.bind(this)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TextField fullWidth={true}
                  hintText="Instructions"
                  floatingLabelText="Instructions"
                  multiLine={true}
                  rows={4}
                  value={this.state.instructions}
                  onChange={this.handleInstructions.bind(this)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TextField fullWidth={true}
                  hintText="Prize"
                  floatingLabelText="Prize"
                  value={this.state.prize}
                  onChange={this.handlePrize.bind(this)}
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
          <div className="row">
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <DatePicker hintText="Registration End Date" style={dateStyle}
                fullWidth={true}
                value={this.state.regEndDate}
                onChange={this.handleRegEndDate.bind(this)}/>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <TimePicker hintText="Registration End Time" style={dateStyle} fullWidth={true}
                value={this.state.regEndTime} onChange={this.handleRegEndTime.bind(this)} format="24hr" hintText="24hr Format"
              />
            </div>
          </div>
          <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
            <Stepper activeStep={this.state.stepIndex1}>
              {this.state.step}
            </Stepper>
            <div style={contentStyle}>
              <div>
                <p>{this.getStepContent1(this.state.stepIndex1)}</p>
                <div style={{marginTop: 12}}>
                  <FlatButton
                    label="Back"
                    disabled={this.state.stepIndex1 === 0}
                    onTouchTap={this.handlePrev1}
                    style={{marginRight: 12}}
                  />
                  <RaisedButton
                    label="Next"
                    disabled={this.state.stepIndex1 === this.state.level-1}
                    primary={true}
                    onTouchTap={this.handleNext1}
                  />
                </div>
              </div>
            </div>
          </div>
          </div>
        );
      default:
        return 'You\'re a long way from creating Tournament';
    }
  }

  render() {
    const {finished, stepIndex, error} = this.state;
    const contentStyle = {margin: '0 16px'};

    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Basic Info</StepLabel>
          </Step>
          <Step>
            <StepLabel>Tournament Info</StepLabel>
          </Step>
          <Step>
            <StepLabel>Dates</StepLabel>
          </Step>
        </Stepper>
        <div style={contentStyle}>
          {finished ? (error ?
            (
              <div>
                Something went wrong!!!.&nbsp;
                <br/>
                <a
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    this.setState({stepIndex: 0, finished: false, regEndDate: "", regEndTime: "", tourStartDate: [], tourStartTime: [], tourEndDate:[], tourEndTime:[], step: []});
                  }}
                >
                  Click here
                </a> to create tournament.
              </div>
            ) :
            (
              <div>
                Congratulations. Tournament Created Successfully.&nbsp;
                <br/>
                <a
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    this.setState({stepIndex: 0, finished: false, regEndDate: "", regEndTime: "", tourStartDate: [], tourStartTime: [], tourEndDate:[], tourEndTime:[], step: []});
                  }}
                >
                  Click here
                </a> to create another tournament.
              </div>
            )
          ) : (
            <div>
              <div>{this.getStepContent(stepIndex)}</div>
              <div style={{marginTop: 12}}>
                <FlatButton
                  label="Back"
                  disabled={stepIndex === 0}
                  onTouchTap={this.handlePrev}
                  style={{marginRight: 12}}
                />
                <RaisedButton
                  label={stepIndex === 2 ? 'Finish' : 'Next'}
                  primary={true}
                  onTouchTap={this.handleNext}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
