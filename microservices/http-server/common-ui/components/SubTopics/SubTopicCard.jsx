
import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {white100} from 'material-ui/styles/colors';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import {grey600,grey500, grey100, red900, teal500} from 'material-ui/styles/colors';
import ActionHome from 'material-ui/svg-icons/action/home';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import People from 'material-ui/svg-icons/social/people';
import PeopleOutline from 'material-ui/svg-icons/social/people-outline';
import Cookie from 'react-cookie';

const TitleStyle={
  fontSize:"1em",
    width:"100%",
  fontWeight:"1em"
}

const SubtitleStyle={
  fontSize:"0.8em",
    width:"100%"
}
var style1= {
  margin:"5px",

}
var imgStyle={
  height:"50%",
  margin:"auto"
}

const BtnStyle ={
  marginLeft:'35%'
}

var style1= {
  background:'#c6ecc6'
}

var cardDivStyle={
   margin:0,
}

var title1={
    paddingLeft:10,
    paddingTop:10,
    marginBottom:5
}
var title2={
  paddingLeft:10,
  marginTop:10,
  marginBottom:10,
  height:'30px'
}
var title3={
    textAlign:'center',
    margin:'auto',
    width:'60%',
    color:'white'
}
var title4={
     width:"30%",
     margin:'auto'
}

const style_fav={
    width:'5%',
    marginTop:10,
    marginBottom:10,
    float:'right',
}
const style_followers={
    width:'12%',
    marginTop:15,
    marginBottom:10,
    float:'right',
    fontWeight:'bold',
    fontSize:'small'
}
const style_favorite={
    width:'10%',
    marginTop:15,
    marginBottom:10,
    float:'right',
    fontWeight:'bold',
    fontSize:'small'
}
const iconStyles = {
  marginRight: 24,
  height:60,
  width:60,
};

var SubtopicCard = React.createClass({
  getInitialState:function(){
      return{incre:-1, no:this.props.topic.topicFollowers}
  },

  contextTypes : {
  router: React.PropTypes.object
} ,
componentDidMount:function(){
  console.log("topic Id in SubtopicCard",this.props.topic._id);
},
  handleClike:function(tId){
    Cookie.save("topicId",tId);
    console.log('function called handleClike');
    this.context.router.push({
      pathname:'/quiz'
    })
  },

  handleDetails:function(tId){
    Cookie.save("topicId",tId);
    console.log('Topic id for each topic',tId);
    this.context.router.push({
      pathname:'/eachTopic/'+this.props.topic._id
    })
  },

  handleOnCheck: function(topicId) {
    console.log(">>>>>>>>...handleOnCheck");
    this.state.incre=-this.state.incre;
    var sum = this.state.no+this.state.incre;
    this.setState({no:sum})
    var topic = this.props.topic;
    topic.topicFollowers = sum;
    this.props.fun(topicId,topic);
  },
  render: function(){
    return(

<Card style ={cardDivStyle}>
    <p style={style_favorite}>{this.props.topic.playersPerMatch}</p>
    <Checkbox
      checkedIcon={<People />}
      uncheckedIcon={<PeopleOutline />}
      style={style_fav}
      iconStyle={{fill: '#009688'}}
      />
    <p style={style_followers}>{this.state.no} </p>

      <Checkbox
        checkedIcon={<ActionFavorite />}
        uncheckedIcon={<ActionFavoriteBorder />}
        style={style_fav}
        iconStyle={{fill: '#B71C1C'}}
        onCheck={this.handleOnCheck.bind(this,this.props.topic._id)}
      />
    <h4 style={title1}>
      {this.props.topic.topicName}
    </h4>
    <h5 style={title2} color={grey500}>{this.props.topic.topicDescription}</h5>

    <CardMedia overlay={
      <div>
      <CardTitle subtitle="Don't limit your Challenges, Challenge your Limits." subtitleColor="white" />
      </div>
     }>
      <img src={this.props.topic.topicIcon} />
    </CardMedia>
    <CardActions className="row">
      <div className="col-md-5 col-xs-5 col-lg-5 col-sm-5">
        <RaisedButton label="Play" secondary={true} style={BtnStyle} onClick={this.handleClike.bind(this,this.props.topic._id)} />
      </div>
      <div className="col-md-5 col-xs-5 col-lg-5 col-sm-5">
        <RaisedButton label="Details" secondary={true} style={BtnStyle} onClick={this.handleDetails.bind(this,this.props.topic._id)} />
      </div>
     </CardActions>

    </Card>

   );
}
});

module.exports= SubtopicCard;
