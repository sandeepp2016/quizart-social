import React from 'react';

import QuizPlay from './quiz';

export default class Quiz extends React.Component{
  state = {
   check:true
 };
  render(){


    return(
      <div>
        <QuizPlay />
      </div>
    )
  }
};
