import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
export default class CommentForm extends React.Component{

  constructor() {
      super();
       this.state = {text: ""};
  }

  handleValueChanged (e) {
    this.setState({value: e.target.value});
  }

  handleKeyDown(e) {
    if(e.keyCode === 13) {
       this.props.newPost(e.target.value);
       this.setState({value:""});
    }
  }

  render () {
    return (
      <Card>
        <CardText>
          <TextField
            hintText="Whats happening in your mind?"
            fullWidth={true}
            onChange={this.handleValueChanged.bind(this)}
            onKeyDown={this.handleKeyDown.bind(this)}
            value={this.state.value}
            id = "post"
          />

        </CardText>
      </Card>
    );
  }
}
