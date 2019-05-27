import React, { Component } from 'react';
class NewRoomForm extends Component {
  state = {
    roomName: ''
  };
  handleChange = e => {
    this.setState({ roomName: e.target.value });

    // console.log('object');
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.createRoom(this.state.roomName);
    this.setState({ roomName: '' });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='new-room-form'>
          <input
            type='text'
            onChange={this.handleChange}
            placeholder='New Room Form...'
            required
            value={this.state.roomName}
          />
        </div>
      </form>
    );
  }
}

export default NewRoomForm;
