import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import {grey600,grey500, grey100, red900, teal500} from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import restUrl from '../../restUrl'
import FontIcon from 'material-ui/FontIcon';
import Checkbox from 'material-ui/Checkbox';
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
  marginLeft:'40%'
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
    float:'right',
    marginTop:20
}
const style_followers={
    width:'12%',
    float:'right',
    fontWeight:'bold',
    fontSize:'small',
    cursor:'pointer',
    marginTop:20

}
const style_favorite={
    width:'10%',
    float:'right',
    fontWeight:'bold',
    fontSize:'small',
    cursor:'pointer',
    marginTop:20

}
const iconStyles = {
  marginRight: 24,
  height:60,
  width:60,
}

const style_players={
  marginRight:20,
  float:'right',
  color:'white',
  }

  export default class AbtTopic extends React.Component {
    constructor(){
      super();
      this.state = {
            arr:[],
      }
    };

    handleClike(tId){
      Cookie.save("topicId",tId);
      console.log('function called handleClike');
      this.context.router.push({
        pathname:'/quiz'
      })
    }

    componentDidMount(){



      var request = $.ajax({
      url: restUrl + '/api/v1/topic/'+this.props.id,
      type: 'GET',
      });
      request.done(function(data) {
      console.log(JSON.stringify(data));
      this.setState({arr: data});
      }.bind(this));
      request.fail(function() {
      console.error('err');
      }.bind(this));
    };

    render(){
      if(this.state.arr === [] || this.state.arr == null || this.state.arr[0] == undefined)
      { return (<div><p>Loading...........</p></div>) }
      else{
      return(
        <div>
        <Card>

          <p style={style_followers}>{this.state.arr[0].topicFollowers} </p>

          <Checkbox
            checkedIcon={<FontIcon className="muidocs-icon-social-people" style={{color:'black'}}/>}
            uncheckedIcon={<FontIcon className="muidocs-icon-social-people_outline" style={{color:'black'}}/>}
            style={style_followers}
            iconStyle={{fill: '#009688'}}
            />

            <Checkbox
              checkedIcon={<FontIcon className="muidocs-icon-action-favorite" style={{color:'black'}}/>}
              uncheckedIcon={<FontIcon className="muidocs-icon-action-favorite_border" style={{color:'black'}}/>}
              style={style_favorite}
              iconStyle={{fill: '#B71C1C'}}
            />

            <CardHeader
                title={this.state.arr[0].topicName}
                subtitle={this.state.arr[0].topicDescription}
              />

              <CardMedia
              overlay={
                <div>
                <p style={style_players}>{this.state.arr[0].playersPerMatch} players Per Match</p>
                <CardTitle subtitle={this.state.arr[0].topicCategory} subtitleColor="white" />
                </div>
               }
              >
                <img src={this.state.arr[0].topicIcon} />
              </CardMedia>
              <CardActions className="row">
                  <RaisedButton label="Play" secondary={true} style={BtnStyle} onClick={this.handleClike.bind(this,this.props.id)} />
               </CardActions>
        </Card>
        </div>
      );
    }
    }

  }
