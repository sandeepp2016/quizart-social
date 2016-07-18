import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
    height:100
  },
};

var SwipeTabs = React.createClass({

getInitialState: function(){
  return ({slideIndex:0});
},

handleChange: function(value){
  this.setState({slideIndex:value});
},
render: function(){
  var currentLevel = this.props.tournament.currentLevel-1;
return (
  <div>
    <Tabs
      onChange={this.handleChange}
      value={this.state.slideIndex}
    >
      <Tab icon={<FontIcon className="muidocs-icon-description"></FontIcon>} label="Description" value={0} />
      <Tab icon={<FontIcon className="muidocs-icon-playlist_add_check"></FontIcon>} label="Instructions" value={1} />
      <Tab icon={<FontIcon className="muidocs-icon-attach_money"></FontIcon>} label="Prizes" value={2} />
    </Tabs>
    <SwipeableViews
      index={this.state.slideIndex}
      onChangeIndex={this.handleChange}
    >
        <div style={styles.slide}>{
            this.props.tournament.description+"\n"}<br/>{'Start Date: '+
            this.props.tournament.levels[currentLevel].tourStartDate+"\n"}<br/>{'End Date: '+
            this.props.tournament.levels[currentLevel].tourEndDate
          }</div>

      <div style={styles.slide}>
        {this.props.tournament.instructions}
      </div>
      <div style={styles.slide}>
      {this.props.tournament.prizes}
      </div>
    </SwipeableViews>
  </div>
);
}
});
module.exports = SwipeTabs;
