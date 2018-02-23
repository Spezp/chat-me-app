import React, { Component } from 'react';

class MessageList extends Component {
  render() {
    console.log('rendering <MessageList/>');
    
    const messages = this.props.messages.map((message) => {
      console.log(message.color);;
      
      if (message.type === 'user') {
        return (
          <div className="message" key={message.id}>
            <span className="message-username" style={{color: message.color}}>{message.user}</span>
            <span className="message-content">{message.text}</span>
          </div>
        );
      } else if (message.type === 'system') {
        return (
          <div className="message system" key={message.id}>
            {message.text}
          </div>
        );
      }
    });
    return (<main className="messages">
      {messages}

    </main>);

  }
}

export default MessageList;