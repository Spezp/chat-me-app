import React, {Component} from 'react';
const uuidv4 = require('uuid/v4');
import Navbar from './navbar.jsx';
import Chatbar from './chatbar.jsx';
import MessageList from './message-list.jsx';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Bob'},
      messages: []
    };
  }
  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = () => {
      console.log('Connected to Server');
      this.socket.send(JSON.stringify({ 'thisis': 'test' }));
    }
  }
  appendNewMessage(messageText, username) {
    const newMessageObject = {
      id: Math.random(),
      type: 'user',
      text: messageText,
      user: username
    };
    const newMessages = this.state.messages.concat(newMessageObject);
    this.setState({
      messages: newMessages
    })
  }
  render() {
    console.log('Rendering <app/>');
    return (<div>
      <Navbar />
      <MessageList messages={this.state.messages} />
      <Chatbar 
      user={this.state.currentUser}
      newMessage={this.appendNewMessage.bind(this)}
      socket={this.socket}
      />
      </div>
    );
  }
}
export default App; 
