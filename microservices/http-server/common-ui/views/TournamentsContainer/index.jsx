import React from 'react';
import TournamentSubCard from './TournamentSubCard';

import restUrl from '../../restUrl';

export default class TournamentsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
    };
  }

  componentDidMount(){
    var request = $.ajax({
      url: restUrl + '/api/v1/tournaments',
      type: 'GET',
    });
    request.done(function(data) {
      console.log(JSON.stringify(data));
      console.log(JSON.stringify(data[0]));
      this.setState({
        arr: data
      });
    }.bind(this));
    request.fail(function() {
      console.error('TournamentsContainer error');
    }.bind(this));
  }

  render() {
    var tournaments = [];
    for (var i = 0; i < this.state.arr.length; i++) {
      tournaments.push(
        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4" style={{paddingTop: '16px', paddingBottom: '16px'}}>
          <TournamentSubCard tournament={this.state.arr[i]}/>
        </div>
      );
    }
    return (
      <div className="container-fluid">
        <div className="row">
          {tournaments}
        </div>
      </div>
    )
  }
}
