// import React from 'react';
import React, { Component } from 'react';
// import ReactDom from 'react-dom';
class Message extends Component {
  state = {};

  render() {
    return (
      <div className='message'>
        <div className='message-username badge badge-light'>
          {this.props.username}
        </div>
        <div className='message-text '>{this.props.text}</div>
      </div>
    );
  }
}

export default Message;
