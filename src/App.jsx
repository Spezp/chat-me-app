import React, {Component} from 'react';
import Navbar from './navbar.jsx';
import Chatbar from './chatbar.jsx';
import MessageList from './message-list.jsx';
    // class Messages extends Component {
    //   render() {
    //     return (
    //         <div className="message">
    //           <span className="message-username">Anonymous1</span>
    //           <span className="message-content">I won't be impressed with technology until I can download food.</span>
    //         </div>
    //         // <div class="message system">
    //         //   Anonymous1 changed their name to nomnom.
    //         // </div>
    //     )
    //   }
    // }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Bob'},
      messages: [{
        id: '1',
        type: 'system',
        text: 'hi',
        user: 'bob'
      },
      {
        id: '2',
        type: 'user',
        text: 'hi',
        user: 'bob'
      }]
    };
  }
  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = { id: 3, type: 'user', text: 'Hello there!', user: 'Michelle' };
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages })
    }, 3000);
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
/*     const messageDivs = this.state.messages.map((message) => {
      return <Message 
        key={message.id} 
        user={message.user} 
        text={message.text}/>;

    }); */
    return (<div>
      <Navbar />
      <MessageList messages={this.state.messages} />
      <Chatbar 
      user={this.state.currentUser}
      newMessage={this.appendNewMessage.bind(this)}
      />
      </div>
    );
  }
}
export default App; 
