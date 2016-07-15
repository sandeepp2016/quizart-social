import React from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import SubTopicContainer from '../SubTopics/SubTopicContainer';

var baseurl='/';

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
}

const stylebtn={
  float:'none',
  width:'100%',
};

const cardHeader={
  textAlign:'left',
};

var MostPopularSection = React.createClass({

    getInitialState:function(){
        return{topics:[]}
    },


contextTypes :{
  router : React.PropTypes.object
},

handleTopics : function(){
  event.preventDefault();
  this.context.router.push('/topics');
},

  componentDidMount:function(){
    $.ajax({
      url: baseurl+'topics/mostPopular',
      dataType:'json',
      success: function(data){
        console.log('got success---------------------');
        console.log(JSON.stringify(data));
        this.setState({topics:data})
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
          <h1 style={tour_header}>Most Popular topics</h1>

          <SubTopicContainer {...this.props} topics ={this.state.topics}   />
            <FlatButton label="See More" style={stylebtn}
              onTouchTap={this.handleTopics.bind(this)}/>

          </Card>
        </Paper>
      </div>
    );
  }
});

export default MostPopularSection;
