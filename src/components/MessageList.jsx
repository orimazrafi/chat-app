import React, { Component } from 'react';
import Message from './Message';
class MessageList extends Component {
  state = {};
  //WARNING! To be deprecated in React v17. Use componentDidUpdate instead.

  componentDidUpdate = () => {
    this.scrollToBottom();
  };
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  };
  render() {
    return (
      <div
        className='message-list'
        // id='message'/
        // ref={this.myRef}
        // onScroll={this.scrolled(this)}
      >
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
