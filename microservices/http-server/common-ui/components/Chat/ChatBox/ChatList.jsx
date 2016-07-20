import React from 'react';
import Chip from 'material-ui/Chip';

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};


export default class ChatList extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    var createList = function(list){
      console.log("list from ChatBoxAll is",list);
      console.log("list from ChatBoxAll is",list.sentBy);
          return <li>
          <Chip
          style={styles.chip}
          >
          <p style={{padding:0,margin:0,border:0}}>Sent By {list.sentBy} </p>
          {list.text}
          </Chip></li>
        };
    return (<ul style={{listStyle:'none'}}>{this.props.data.map(createList)}</ul>);
  }
}
