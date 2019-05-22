import React, { Component } from 'react';
import Message from './Message';
class MessageList extends Component {
  state = {};
  render() {
    return (
      <div className='message-list'>
        {this.props.messages.map((message, index) => (
          <Message
            key={index}
            username={message.senderId}
            text={message.text}
          />
        ))}
      </div>
    );
  }
}

export default MessageList;
