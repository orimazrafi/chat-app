import React, { Component } from 'react';
class RoomList extends Component {
  state = {};
  render() {
    return (
      <div className='rooms-list'>
        <ul>
          <h3>Your rooms: </h3>
          {this.props.rooms.map(room => (
            <li key={room.id} className='room'>
              <button
                className='room-link'
                onClick={() => {
                  this.props.subscribeToRoom(room.id);
                }}
                // href='/'
              >
                # {room.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default RoomList;
