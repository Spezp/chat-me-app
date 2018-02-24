import React, { Component } from 'react';

class MessageList extends Component {
  render() {
    console.log('rendering <MessageList/>');
    
    const messages = this.props.messages.map((message) => {
      console.log(message.color);
      
      if (message.type === 'user') {
        return (
          <div className="message" key={message.id}>
          <div className="container">
            <div className="row">
              <span className="message-username col-sm-2" style={{backgroundColor: message.color}}>{message.user}</span>
              <span className="message-content">{message.text}</span>
            </div>
          </div>
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
    return (<main className="messages" id="message-jump">
      {messages}

    </main>);

  }
}

export default MessageList;