import React, { Component } from 'react';
// import Chatkit from '@pusher/chatkit';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';

import { instanceLocator, testToken } from './config';
import MessageList from './components/MessageList';
import NewRoomForm from './components/NewRoomForm';
import RoomList from './components/RoomList';
import SendMessageForm from './components/SendMessageForm';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: []
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
        currentUser.subscribeToRoom({
          roomId: '19864311',
          // messageLimit: 20,
          hooks: {
            onMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              });
            }
          }
        });
      })
      .catch(err => {
        console.log('Error on connection', err);
      });
  };

  render() {
    return (
      <div className='App'>
        <MessageList messages={this.state.messages} />
        <NewRoomForm />
        <RoomList />
        <SendMessageForm />
      </div>
    );
  }
}

export default App;
