import React, {Component} from 'react';
import update from 'immutability-helper';
import Navbar from './navbar.jsx';
import Chatbar from './chatbar.jsx';
import MessageList from './message-list.jsx';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Bob', color: this.getRandomColor()},
      messages: [],
      clientCount: 1
    };
    this.socket = new WebSocket('ws://localhost:3001');
  }
  
  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket.onopen = () => {
      console.log('Connected to Server');
    }

    // Message recieval from server
    this.socket.onmessage = (message) => {
    let parsedMessage = JSON.parse(message.data);
    let messageType = parsedMessage.type;
    if (messageType === 'user' || messageType === 'system') {
      this.appendNewMessage(parsedMessage);
    } else if (messageType === 'client'){
      this.updateClient(parsedMessage.content)
    }
  };
  }

  getRandomColor() {
    const colors = ['blue', 'red', 'purple', 'tomato'];
    let pickColor = colors[Math.floor(Math.random() * 4)];
    console.log('pick', pickColor);
    return pickColor;
}
  updateClient(num) {

    this.setState({ clientCount: num })
    console.log('set State:', this.state.clientCount);
  }

  userChange(newName) {
    this.setState( (previousState) => {
      previousState.currentUser.name = newName;
      return previousState;
    })
  }
  appendNewMessage(message) {
    const newMessageObject = {
      id: message.id,
      type: message.type,
      text: message.content,
      user: message.user,
      color: message.color
    };
    const newMessages = this.state.messages.concat(newMessageObject);
    this.setState({
      messages: newMessages
    })
  }
  render() {
    console.log('Rendering <app/>');
    return (<div>
      <Navbar clientCount={this.state.clientCount}/>
      <MessageList 
      messages={this.state.messages} 
      />
      <Chatbar 
      user={this.state.currentUser.name}
      color={this.state.currentUser.color}
      newMessage={this.appendNewMessage.bind(this)}
      newUser={this.userChange.bind(this)}
      socket={this.socket}
      />
      </div>
    );
  }
}
export default App; 
