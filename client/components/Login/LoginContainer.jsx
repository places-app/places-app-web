import React from 'react';
import Login from './Login.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { store } from '../../client';
import { setAuth } from '../../redux/actions/authActions';
// import axios from 'axios';

class LoginContainer extends React.Component {

  constructor() {
    super();
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  componentWillMount() {
    // check auth here later...
  }

  handleLoginClick() {
    console.log('login clicked!');
    window.FB.login((response) => {
      if (response.status === undefined) {
        console.log('response is undefined.');
      } else {
        console.log('auth resp', response.authResponse);
        console.log('entire resp', response);
        const accessToken = response.authResponse.accessToken;
        this.props.setAuth(accessToken);
      }
    });
  }

  render() {
    return (
      <Login
        {...this.props}
        handleLoginClick={this.handleLoginClick}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuth: state.isAuth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setAuth: bindActionCreators(setAuth, dispatch),
  };
}

LoginContainer.propTypes = {
  setAuth: React.PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
