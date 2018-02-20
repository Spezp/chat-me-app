import React, { Component } from 'react';

class Chatbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageText: '',
      user: 'Anon'
    }
  }
  onMessageTextChange(event) {
    this.setState({ messageText: event.target.value });
  }
  usernameChange(event) {
    this.setState({ user: event.target.value });
  }
  onPressEnter(event) {
    if (event.key === 'Enter') {
      // they pressed enter!
      this.props.newMessage(this.state.messageText, this.state.user);
      this.setState({ messageText: '' });
    }
  }
  render() {
    console.log('rendering chatbar');

    return (<footer className="chatbar">
      <input 
      value={this.state.user}
      className="chatbar-username" 
      onChange={this.usernameChange.bind(this)}
      placeholder="Your Name (Optional)" />
      <input 
      value={this.state.messageText}
      onChange={this.onMessageTextChange.bind(this)}
      className="chatbar-message" 
      placeholder="Type a message and hit ENTER" 
      onKeyPress={this.onPressEnter.bind(this)}
      />
    </footer>);

  }
}

export default Chatbar;
