import React, {Component} from 'react';

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">PILO</a>
        <p className="client-count align-middle ">Online: <span className="badge badge-pill badge-default">{this.props.clientCount}</span></p>
      </nav>
    );
  }
}
export default Navbar;