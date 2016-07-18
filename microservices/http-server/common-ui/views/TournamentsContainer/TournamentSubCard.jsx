import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import People from 'material-ui/svg-icons/social/people';
import PeopleOutline from 'material-ui/svg-icons/social/people-outline';
import {grey600,grey500, grey100, red900, teal500} from 'material-ui/styles/colors';
import Checkbox from 'material-ui/Checkbox';
import Avatar from 'material-ui/Avatar';
import {Tabs, Tab} from 'material-ui/Tabs';
import base64 from 'base-64';
import {PropTypes} from 'react';

import SwipeableTabs from './SwipeTabs';
import SwipeableViews from 'react-swipeable-views';
import restUrl from '../../restUrl';


var title1={
      width: '45%',
      paddingRight:"0px",
      marginTop: "10px",
      marginBottom: "0px",
      float: 'left',
}
const styleImg={
  height:"200px",
  width:"100%"
}
const tabHeight={
  height:"200px"
}

const btnFontColor ={
  marginLeft:'12.5%',
  width:"75%"
}

const styleCard={
  margin:5,
}

const style_followers={
    width:'5%',
    marginTop:15,
    marginBottom:10,
    float:'right',
    fontWeight:'bold',
    fontSize:'small'
}
const style_favorite={
    width:'5%',
    marginTop:15,
    marginBottom:10,
    float:'right',
    fontWeight:'bold',
    fontSize:'small'
}
const style_fav={
    width:'5%',
    marginTop:10,
    marginBottom:10,
    float:'right',
}
const style_sd={
    width:'10%',
    marginTop:15,
    marginBottom:10,
    float:'right',
    fontWeight:'bold',
    fontSize:'small'
}
const avatarstyle={
  margin: "5px",
  float:'left',
}


class TournamentsSubCard extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      finished: false,
      label:'',
      username: JSON.parse(base64.decode(localStorage.token.split('.')[1])).sub,
    };
  }

  static get contextTypes(){
    return {
      router: PropTypes.object.isRequired
    }
  }

  handleNext = () => {
    if(this.state.label==='Register') {
      var request = $.ajax({
        url: restUrl + '/api/v1/tournaments/registerPlayer',
        type: 'PUT',
        data: JSON.stringify({id: this.props.tournament._id, userId: this.state.username}),
        contentType: 'application/json'
      });
      request.done(function(data) {
        console.log('PUT success' + JSON.stringify(data));
        this.setState({
          finished: true,
        });
      }.bind(this));
      request.fail(function() {
        this.setState({
          error: true
        });
      }.bind(this));
    } else if(this.state.label==='Play') {
      this.context.router.push('/quiz/true/'+this.props.tournament._id);
    }
  };

  handleDates = () => {
    var currentLevel = this.props.tournament.currentLevel-1;
    
    console.log('Inside handleDates sub card');
    var date = new Date();
    var regEndDate = new Date(this.props.tournament.regEndDate);
    var tourEndDate = new Date(this.props.tournament.levels[currentLevel].tourEndDate);
    var alreadyPlayedGame = false;
    var alreadyRegistered = false;
    for(var i=0;i<this.props.tournament.levels[currentLevel].gamePlayedPlayers.length;i++) {
      var obj = this.props.tournament.levels[currentLevel].gamePlayedPlayers[i];
      if(this.state.username==obj.userId) {
        alreadyPlayedGame = true;
        break;
      }
    }
    for(var i=0;i<this.props.tournament.levels[currentLevel].registeredPlayers.length;i++) {
      var obj = this.props.tournament.levels[currentLevel].registeredPlayers[i];
      if(this.state.username==obj.userId) {
        alreadyRegistered = true;
        break;
      }
    }
    console.log(date);
    console.log(regEndDate);
    console.log((regEndDate instanceof Date)+" "+(typeof regEndDate === "string"));
    console.log((tourEndDate instanceof Date)+" "+(typeof tourEndDate === "string"));
    // console.log(date.getTime()<tourEndDate.getTime());

    if(currentLevel+1===1) {
      if(date.getTime()<regEndDate.getTime()) {
        if(alreadyRegistered) {
          this.setState({label:'You are Registered', finished: true});
        } else {
          this.setState({label:'Register', finished: false});
        }
      } else if(date.getTime()<tourEndDate.getTime()) {
        if(alreadyPlayedGame) {
          this.setState({label:'Game Completed', finished: true});
        } else {
          this.setState({label:'Play', finished: false});
        }
      } else {
        console.log('Coming here1');
      }
    } else {
      if(date.getTime()<regEndDate.getTime()) {
        if(alreadyRegistered) {
          this.setState({label:'You are Registered', finished: true});
        } else {
          this.setState({label:'You are already eliminated', finished: true});
        }
      } else if(date.getTime()<tourEndDate.getTime()) {
        if(alreadyPlayedGame) {
          this.setState({label:'Game Completed', finished: true});
        } else {
          this.setState({label:'Play', finished: false});
        }
      } else {
        console.log('Coming here2');
      }
    }
    console.log('Here:' + this.state.label);
  }

  componeneDidMount() {
    console.log('Inside componeneDidMount sub card');
  }

  componentWillMount() {
    console.log('Inside componentWillMount sub card');
    this.handleDates();
  }

  render (){
  const {finished} = this.state;
  return(
  <Card style={styleCard} >

    <div>

    <Avatar style={avatarstyle} src={this.props.tournament.avatarURL} />

    <h2 style={title1}>{this.props.tournament.title}</h2>
    <p style={style_favorite}>45</p>

    <Checkbox
      checkedIcon={<ActionFavorite />}
      uncheckedIcon={<ActionFavoriteBorder />}
      style={style_fav}
      iconStyle={{fill: '#B71C1C'}}
    />
    <p style={style_followers}>12 </p>

    <Checkbox
      checkedIcon={<People />}
      uncheckedIcon={<PeopleOutline />}
      style={style_fav}
      iconStyle={{fill: '#009688'}}
      />

    <CardMedia
      overlay={<CardTitle title={this.props.tournament.overlayTitle} subtitle={this.props.tournament.overlaySubtitle} />}
    >
      <img src={this.props.tournament.imageURL} style={styleImg}  />
    </CardMedia>
    </div>
    <SwipeableTabs tournament={this.props.tournament} />

    <CardActions>
      <div className="col-xs col-md col-lg col-sm">
      <div>
        {finished ? (
          <div>
            <RaisedButton
              style={btnFontColor}
              label={this.state.label}
              primary={true}
              disabled={true}
            />
          </div>
        ) : (
          <div>
            <div>
              <RaisedButton
                style={btnFontColor}
                label={this.state.label}
                secondary={true}
                onClick={this.handleNext}
              />
            </div>
          </div>
        )}
      </div>
      </div>
    </CardActions>

  </Card>

);
}
}
export default TournamentsSubCard;
