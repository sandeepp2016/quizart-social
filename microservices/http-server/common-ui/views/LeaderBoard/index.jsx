import React from 'react';
import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import restUrl from '../../restUrl';

export default class LeaderBoard extends React.Component {
  constructor(props){
    super(props);
    console.log('Inside LeaderBoard constructor: '+this.props.params.id);
    this.state = {
      rows:[]
    };
  }

  componentDidMount() {
    var request = $.ajax({
      url: restUrl + '/api/v1/leaderboard/'+this.props.params.id,
      type: 'GET',
    });
    request.done(function(data) {
      console.log(JSON.stringify(data));
      console.log(Object.keys(data));
      console.log(JSON.stringify(data.leaderboard));
      data.leaderboard.sort(
        function(a, b) {
            return b.score - a.score;
        }
      )
      this.setState({rows:data.leaderboard});
    }.bind(this));
    request.fail(function() {
      console.error('LeaderBoard error');
    }.bind(this));
  }

  render(){
    console.log("state data: "+JSON.stringify(this.state.rows));
    const style = {margin: 5, marginLeft: 0, marginRight: 0, left: 0};
    var row = [];
    for (var i = 0; i < this.state.rows.length; i++) {
      row.push(
        <TableRow>
          <TableRowColumn>{i+1}</TableRowColumn>
          <TableRowColumn>
            <ListItem
              disabled={true}
              leftAvatar={
                <Avatar
                  src="https://s31.postimg.org/qgg34o597/nature.jpg"
                  size={30}
                  style={style}
                />
              }
            >
            {this.state.rows[i].name}
            </ListItem>

          </TableRowColumn>
          <TableRowColumn>{this.state.rows[i].score}</TableRowColumn>
        </TableRow>
      );
    }
    return (
      <Card>
        <CardText>
          <Table
            selectable={false}
            multiSelectable={false}
          >
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
            >
              <TableRow>
                <TableHeaderColumn>Rank</TableHeaderColumn>
                <TableHeaderColumn>Player</TableHeaderColumn>
                <TableHeaderColumn>Score</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
            >
              {row}
            </TableBody>
          </Table>
        </CardText>
      </Card>
    );
  }
}
