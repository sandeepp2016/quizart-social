import React from 'react';

export default class ChatList extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    var createList = function(list){
          return <li key={list.id}>{list.text}</li>
        };
    return <ul id="messages">{this.props.data.map(createList)}</ul>;
  }
}
