import React from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

const cardHeader={
    textAlign:'center',
};

const quizstyle={
  textAlign: 'center',
};

const style_btn={
  textAlign:'center',
  margin:5
}

var QuizWar=React.createClass({

  contextTypes :{
    router : React.PropTypes.object
  },

  handleQuizwarTouch : function(){
    event.preventDefault();
    this.context.router.push('/quiz');
  },

  render:function (){
    return (
      <div >
          <Paper style={quizstyle} zDepth={2} >
            <Card>
                <CardMedia>
                  <img src="https://s32.postimg.org/twb81njgl/quizwar.jpg" />
                </CardMedia>
                  <CardTitle title="Quiz Of The Day" subtitle="There's no charge for the AWESOMENESS, Play & Earn the reward of looking awesome."/>
                    <RaisedButton label="Play" secondary={true} style={style_btn} onTouchTap={this.handleQuizwarTouch.bind(this)}/>
              </Card>
            </Paper>
          </div>
    );
  }
});

export default QuizWar;
