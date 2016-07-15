import React from 'react';
import TournamentsSubCard from './TournamentsSubCard';

const container={
  paddingLeft:15,
  paddingRight:15,
}


var TournamentsSubContainer = React.createClass({

  render: function(){
    var allTheSubTopics = [];
    this.props.tournament.forEach(function(tournament){
      allTheSubTopics.push(
        <div className="col-xs-12 col-lg-6 col-md-4 col-sm-4" style={{paddingLeft:10, paddingRight:10}}>
        <TournamentsSubCard tournament={tournament} key={tournament.title}/>
        </div>
      );
    })
    return(
      <div className="container-fluid" style={container}>
      <div className="row">
      {allTheSubTopics}
      </div>
      </div>
    );
  }

});


module.exports = TournamentsSubContainer;
