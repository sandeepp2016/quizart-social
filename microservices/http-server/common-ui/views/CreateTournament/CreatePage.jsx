import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Slider from 'material-ui/Slider';

export default class CreatePage extends React.Component {
  constructor() {
    super();
  }

  disableWeekends(date) {
    return date.getDay() === 0 || date.getDay() === 6;
  }

  render() {
    var style = {textAlign:'right',paddingTop: '20px'};
    var dateStyle = {paddingTop: '25px'};
    const styles = {
      block: {
        maxWidth: 250,
      },
      radioButton: {
        marginBottom: 16,
      },
    };
    return (
      <div className="container-fluid">

        <Card style={{marginRight: '100px', marginLeft: '100px'}}>
          <CardHeader style={{textAlign:'center'}}
            title={<h1>Create Tournament</h1>}
          />
          <CardActions>
            <div className="row">
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <h4 style={style}>Title</h4>
              </div>
              <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                <TextField fullWidth="true"
                  hintText="Title"
                  floatingLabelText="Title"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <h4 style={style}>Description</h4>
              </div>
              <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                <TextField fullWidth="true"
                  hintText="Description"
                  floatingLabelText="Description"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <h4 style={style}>Image</h4>
              </div>
              <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                <input type="file" name="pic" accept="image/*" style={{paddingTop: '45px'}}/>
              </div>
            </div>
            <div className="row" style={{paddingTop: '20px'}}>
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <h4 style={{textAlign:'right',paddingBottom: '20px'}}>Type</h4>
              </div>
              <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                <RadioButtonGroup name="tournamentType" defaultSelected="not_light">
                  <RadioButton
                    value="light"
                    label="Knockout"
                    style={styles.radioButton}
                  />
                  <RadioButton
                    value="not_light"
                    label="Tournamnt"
                    style={styles.radioButton}
                  />
                </RadioButtonGroup>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <h4 style={style}>Difficulty Level</h4>
              </div>
              <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                <Slider step={0.1} style={{paddingTop: '20px'}}/>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <h4 style={style}>Number of Players</h4>
              </div>
              <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                <TextField fullWidth="true"
                  hintText="Number of Players"
                  floatingLabelText="Number of Players"
                  type="number" min="2" max="1000" step="2"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <h4 style={style}>Rules</h4>
              </div>
              <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                <TextField fullWidth="true"
                  hintText="Rules"
                  floatingLabelText="Rules"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <h4 style={style}>Registration Start Date</h4>
              </div>
              <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                <DatePicker hintText="Registration Start Date" shouldDisableDate={this.disableWeekends.bind(this)} style={dateStyle}/>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <h4 style={style}>Registration End Date</h4>
              </div>
              <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                <DatePicker hintText="Registration End Date" shouldDisableDate={this.disableWeekends.bind(this)} style={dateStyle}/>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <h4 style={style}>Tournament Start Date</h4>
              </div>
              <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                <DatePicker hintText="Tournament Start Date" shouldDisableDate={this.disableWeekends.bind(this)} style={dateStyle}/>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <h4 style={style}>Tournament End Date</h4>
              </div>
              <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                <DatePicker hintText="Tournament End Date" shouldDisableDate={this.disableWeekends.bind(this)} style={dateStyle}/>
              </div>
            </div>
          </CardActions>
        </Card>
      </div>
    )
  }
}
