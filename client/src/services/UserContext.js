import React, { Component } from 'react';
import { logout } from './authUtils';

export const Logged = React.createContext(false);

export const UserContext = React.createContext();

class UserContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { success: false };
  }

  logUserIn = (user) => {
    this.setState(user);
  };

  logUserOut = () => {
    logout();
    this.setState({ success: false });
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          logUserIn: this.logUserIn,
          logUserOut: this.logUserOut,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserContextProvider;

