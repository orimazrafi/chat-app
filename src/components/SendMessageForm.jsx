import React, { Component } from 'react';
class SendMessageForm extends Component {
  state = {
    text: ''
  };
  handleChange = e => {
    this.setState({ text: e.target.value });
    // console.log(e.target.value);
  };
  submmit = e => {
    e.preventDefault();
    this.props.sendMessage(this.state.text);
    this.setState({ text: '' });
    // console.log(this.state.text);
  };
  render() {
    return (
      <form className='sender-message-form' onSubmit={this.submmit}>
        <input
          type='text'
          value={this.state.text}
          onChange={this.handleChange}
          placeholder='Type your message and hit ENTER'
        />
      </form>
    );

    // <div>send message form</div>;
  }
}

export default SendMessageForm;
