import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "./Login";
import Chat from "./Chat";

const USER_KEY = "dito-chat-user";

const generateId = () =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);

const auth = {
  user: null,
  authenticate(name) {
    this.user = {
      name,
      id: generateId()
    };
    localStorage.setItem(USER_KEY, JSON.stringify(this.user));
  },

  logout() {
    localStorage.removeItem(USER_KEY);
    this.user = null;
    window.location.reload();
  },

  isAuthenticated() {
    if (this.user !== null) return true;

    const cache = localStorage.getItem(USER_KEY);
    if (cache != null) {
      this.user = JSON.parse(cache);
      return true;
    }

    return false;
  }
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated() ? (
        <Component {...props} auth={auth} />
      ) : (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      )
    }
  />
);

const App = () => (
  <Router>
    <Switch>
      <Route path="/login" render={props => <Login {...props} auth={auth} />} />
      <PrivateRoute path="/" component={Chat} />
    </Switch>
  </Router>
);

export default App;
