import React, {Component} from 'react';
import Navbar from './navbar.jsx';
import Chatbar from './chatbar.jsx';
import MessageList from './message-list.jsx';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Anon', color: this.getRandomColor()},
      messages: [],
      clientCount: 1
    };
    this.socket = new WebSocket('ws://localhost:3001');
  }
  
  componentDidMount() {
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
    const colors = ['rgb(255, 56, 105)', '#005288', 'rgb(0, 162, 255)', 'tomato'];
    let pickColor = colors[Math.floor(Math.random() * 4)];
    return pickColor;
}

  updateClient(num) {
    this.setState({ clientCount: num });
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
    var objDiv = document.getElementById('message-jump');
    objDiv.scrollTop = objDiv.scrollHeight;
    const newMessages = this.state.messages.concat(newMessageObject);
    this.setState({
      messages: newMessages
    })
  }

  render() {
    return (<div className="main-container">
      <div className="chat-main">
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
      </div>
    );
  }
}
export default App; 
