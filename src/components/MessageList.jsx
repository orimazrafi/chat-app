import React, { Component } from 'react';
import Message from './Message';
class MessageList extends Component {
  state = {};

  componentDidUpdate = () => {
    this.scrollToBottom();
  };
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  };
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
        <div
          ref={el => {
            this.messagesEnd = el;
          }}
        />
      </div>
    );
  }
}

export default MessageList;
