var React = require('react');

export default class ContextComponent extends React.Component {
  getChildContext() {
    return {
      socket: io()
    }
  }

  render(){
    return (this.props.children);
  }
}

ContextComponent.childContextTypes = {
  socket: React.PropTypes.object.isRequired
};
