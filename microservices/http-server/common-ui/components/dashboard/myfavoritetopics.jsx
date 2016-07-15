import React from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import SubTopicContainer from '../SubTopics/SubTopicContainer';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const style = {
  marginLeft:0,
  marginTop:20,
  marginBottom:20,
  marginRight:0,
};

const tour_header={
  margin:20,
  textAlign:'center',
  paddingTop:20,
  paddingBottom:20,
}

const stylebtn={
  float:'none',
  width:'50%',

};

const style_addbtn={
    float:'right',
    marginTop:10,
    marginRight:10
}

const cardHeader={
  textAlign:'left',
};
 const style_add={
   height:"200px",
   width:"200px",
   margin: 20,
   paddingBottom:10,
 }

const btn={
  marginTop:"25px"
}

var MyFavoriteSection = React.createClass({

  contextTypes :{
    router : React.PropTypes.object
  },

  handleTopics : function(){
    event.preventDefault();
    this.context.router.push('/topics');
  },

  render: function () {
    return (
      <div>
        <Paper style={btn} zDepth={2} >
          <div>
            <FloatingActionButton style={style_addbtn} onTouchTap={this.handleTopics.bind(this)}>
                <ContentAdd/>
            </FloatingActionButton>
            <h1 style={tour_header}>My Favorite Topics</h1>
          </div>
          <SubTopicContainer topics ={this.props.topics} />
        </Paper>
      </div>
    );
  }
});
export default MyFavoriteSection;
