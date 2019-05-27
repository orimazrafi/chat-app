import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import { instanceLocator, testToken } from './config';
import MessageList from './components/MessageList';
import NewRoomForm from './components/NewRoomForm';
import RoomList from './components/RoomList';
import SendMessageForm from './components/SendMessageForm';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      currentUser: {},
      joinedRooms: [],
      joinableRooms: [],
      roomId: ''
    };
  }
  componentDidMount = () => {
    const chatManager = new ChatManager({
      instanceLocator,
      userId: 'orimazrafi',
      tokenProvider: new TokenProvider({ url: testToken })
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        this.getRooms();
        this.subscribeToRoom();
      })
      .catch(err => {
        console.log('Error on connection', err);
      });
  };
  sendMessage = text => {
    // console.log('we got the message in app.js');
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    });
  };
  subscribeToRoom = roomId => {
    this.setState({ messages: [] });
    if (roomId) {
      this.currentUser
        .subscribeToRoom({
          roomId,
          // messageLimit: 20,
          hooks: {
            onMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              });
            }
          }
        })
        .then(room => {
          this.setState({ roomId: room.id });
          this.getRooms();
        })
        .catch(new Error('error on subscribing to room'));
    }
  };
  getRooms = () => {
    this.currentUser
      .getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        });
      })
      .catch(new Error('error on joinable Rooms'));
  };
  handleRoom = name => {
    this.currentUser
      .createRoom({ name })
      .then(room => this.subscribeToRoom(room.id))
      .catch(new Error('something wrong with create new room'));
  };

  render() {
    return (
      <React.Fragment>
        <nav className='navbar navbar-light bg-light navbar-container'>
          <h1 className='navbar-brand app-headline'> Chat App</h1>
        </nav>
        <div className='container'>
          <div className='row'>
            <div className='col-4'>
              <div style={{ backgroundColor: '#2295c05e', height: '280px' }}>
                <RoomList
                  roomId={this.state.roomId}
                  subscribeToRoom={this.subscribeToRoom}
                  rooms={[
                    ...this.state.joinableRooms,
                    ...this.state.joinedRooms
                  ]}
                />
              </div>
              <NewRoomForm createRoom={this.handleRoom} />
            </div>
            <div className='col-8'>
              <div
                style={{
                  backgroundColor: '#a097972e',
                  height: '280px',
                  overflow: 'auto'
                  // display: 'unset'
                }}
              >
                {!this.state.roomId ? (
                  <div
                    className='join-room-container'
                    style={{ height: '280px' }}
                  >
                    <h2 className='join-room'>&larr; Join a room!</h2>
                  </div>
                ) : (
                  <MessageList messages={this.state.messages} />
                )}
              </div>
              {this.state.roomId && (
                <SendMessageForm sendMessage={this.sendMessage} />
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
