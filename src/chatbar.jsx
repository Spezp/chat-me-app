import React, { Component } from 'react';
const uuid = require('uuid/v4');

class Chatbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messageText: '',
      user: this.props.user,
      color: this.props.color
    }
  }

  onMessageTextChange(event) {
    this.setState({ messageText: event.target.value });
  }
  usernameChange(event) {
    this.setState({ user: event.target.value });
  }

  onPressEnter(event) {

    // Sends chat message to server
    if (event.key === 'Enter') {
      let messageObj = {
        id: uuid(),
        user: this.state.user,
        type: 'user',
        content: this.state.messageText,
        color: this.state.color
      }
      // Checks if user changed his username and sends a system message
      console.log(this.state.user, this.props.user);
      if (this.state.user !== this.props.user) {
        let userChangeMessage = {
          id: uuid(),
          user: this.state.user,
          type: 'system',
          content: `${this.props.user} changed their name to ${this.state.user}.`
        }
        this.props.newUser(this.state.user);
        this.props.socket.send(JSON.stringify(userChangeMessage))
      }
      this.props.socket.send(JSON.stringify(messageObj));
      
      this.setState({ messageText: '' });
    }
  }
  render() {

    return (<footer className="chatbar col-xs-12 col-sm-12">
      <input 
      value={this.state.user}
      className="chatbar-username col-sm-2 col-xs-2" 
      onChange={this.usernameChange.bind(this)}
      placeholder="Your Name (Optional)" />
      <input 
      value={this.state.messageText}
      onChange={this.onMessageTextChange.bind(this)}
      className="chatbar-message col-sm-9 col-xs-9" 
      placeholder="Type a message and hit ENTER" 
      onKeyPress={this.onPressEnter.bind(this)}
      />

    </footer>);

  }
}

export default Chatbar;
