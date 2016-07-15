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


import SwipeableTabs from './SwipeTabs';
import SwipeableViews from 'react-swipeable-views';


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

  state = {
    finished: false,
    stepIndex: 0,
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: true,
    });
  };

  handlePrev = () => {
  const {stepIndex} = this.state;
  this.setState({
    stepIndex: stepIndex - 1,
    finished: false,
  });
  };

   render (){
       const {finished, stepIndex} = this.state;
     return(
  <Card style={styleCard} >

    <div>

    <Avatar style={avatarstyle} src={this.props.tournament.AvatarURL} />

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
      overlay={<CardTitle title={this.props.tournament.OverlayTitle} subtitle={this.props.tournament.OverlaySubtitle} />}
    >
      <img src={this.props.tournament.URL} style={styleImg}  />
    </CardMedia>
    </div>
    <SwipeableTabs TabContent={this.props.tournament.TabContent} />



    <CardActions>
      <div className="col-xs col-md col-lg col-sm">
      <div>
        {finished ? (
          <div>
            <RaisedButton
              style={btnFontColor}
              label={"You were Registered"}
              primary={true}
              disabled={true}
            />
          </div>
        ) : (
          <div>
            <div>
              <RaisedButton
                style={btnFontColor}
                label={'Register'}
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
