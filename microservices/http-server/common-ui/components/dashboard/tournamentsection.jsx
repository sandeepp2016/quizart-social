import React from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TournamentsSubContainer from '../SubTournaments/TournamentsSubContainer';
import restUrl from '../../restUrl';

var baseurl='/';

const style = {
  marginLeft:0,
  marginTop:20,
  marginBottom:20,
  marginRight:0,
};

const stylebtn={
  float:'none',
  width:'100%',

}

const cardHeader={
  textAlign:'left',
};

const tour_header={
  margin:20,
  textAlign:'center',
  paddingTop:20,
}

var TournamentSection = React.createClass({

  getInitialState:function(){
      return{tournamentData:[]}
  },

  contextTypes :{
    router : React.PropTypes.object
  },

  handleTournaments : function(){
    event.preventDefault();
    this.context.router.push('/tournaments');
  },

  componentDidMount:function(){
    $.ajax({
      url: restUrl+'/tournamentSection',
      dataType:'json',
      success: function(data){
        console.log('got success---------------------');
        console.log(JSON.stringify(data));
        this.setState({tournamentData:data})
        console.log('------------------------'+data+'----------------------');
      }.bind(this),
      error:function(err){
        console.log(err);
        console.log('error');
      }
    })
  },

  render: function () {
    return (
      <div>
        <Paper style={style} zDepth={2} >
          <Card>
          <h1 style={tour_header}>Tournaments</h1>
            <TournamentsSubContainer tournament={this.state.tournamentData}/>
            <FlatButton label="See More" style={stylebtn}
              onTouchTap={this.handleTournaments.bind(this)}/>
          </Card>
        </Paper>
      </div>
    );
  }
});

export default TournamentSection;
