import React, { useState, useEffect } from 'react';
import './style.css';
import LoginPage from './Login';
import HomePage from './Home';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import ClientsTable from './HomeComponents/Clients'

var route;
function App(props) {
  const { dispatch, data, sessionData } = props;

  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    if (sessionData != undefined) {
      setRedirect(true);
    }
  });

  if (redirect) {
    return (
      <Router>
        <Route exact path="/home" children={<HomePage />} />
        <Redirect to="/home" />
      </Router>
    );
  } else {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" children={<LoginPage />} />
          <Route exact path="/home" children={<HomePage />} />
          <Redirect from="/" to="/login" />
          <Route exact path="/home/clients" children={<ClientsTable/>} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.LoginReducer && state.LoginReducer.loginData,
    sessionData: state.LoginReducer && state.LoginReducer.sessionData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
