import React, { Component } from 'react';
class RoomList extends Component {
  state = {};
  addClass = roomId => {
    let active = 'room-link';
    return (active += this.props.roomId === roomId ? ' text-primary' : '');
  };
  render() {
    const orderRooms = [...this.props.rooms.sort((a, b) => a.id - b.id)];
    return (
      <div className='rooms-list'>
        <h3>Your rooms: </h3>
        <div>
          {orderRooms.map(room => (
            <div key={room.id} className='room'>
              <button
                className={this.addClass(room.id)}
                onClick={() => {
                  this.props.subscribeToRoom(room.id);
                }}
                // href='/'
              >
                {room.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default RoomList;
