import React from 'react';

import QuizPlay from './quiz';

export default class Quiz extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      arr: [],
    };
    console.log('Quiz props: ' + JSON.stringify(this.props));
  }

  componentDidMount(){
    console.log('Quiz props: ' + JSON.stringify(this.props));
  }

  state = {
   check:true
 };
  render(){


    return(
      <div>
        <QuizPlay params={this.props.params}/>
      </div>
    )
  }
};
