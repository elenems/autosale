import React, { Component } from "react";
import InputError from "./InputError";
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";
import Loader from "./Loader";
import Navbar from './Navbar'

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: ""
    };
  }


  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  

  signupUser = e => {
    e.preventDefault();
    this.props.signUp({
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      history: this.props.history
    });
  };

  render() {
    let content = "";
    const { emailError = '', passwordError = '', wrongCreds = '' } = this.props.errors;

    if (!this.props.isLoading) {
      content = (
        <div>
          <h2>Signup</h2>
          <form>
            <div className="input-field col s12">
              <input
                onChange={this.handleChange}
                value={this.state.email}
                id="email"
                type="email"
              />
              <label htmlFor="email">Email</label>
              <InputError message={emailError} />
            
            </div>

            <div className="input-field col s12">
              <input
                onChange={this.handleChange}
                value={this.state.password}
                id="password"
                type="password"
              />
              <label htmlFor="password">Password</label>
              <InputError message={passwordError} />
              <InputError message={wrongCreds} />
            
            </div>

            <div className="input-field col s12">
              <input
                onChange={this.handleChange}
                value={this.state.confirmPassword}
                id="confirmPassword"
                type="password"
              />
              <label htmlFor="confirmPassword">Confirm password</label>
              <InputError  message={passwordError} />
              <InputError  message={wrongCreds} />
            </div>

            <div className="input-field col s12">
              <button
                className="waves-effect waves-light btn"
                onClick={this.signupUser}
              >
                Signup
              </button>
            </div>
          </form>
        </div>
      );
    } else {
      content = <Loader />;
    }

    return (
      <div className="container">
        <div className="row"><Navbar />{content}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.ui.errors,
    isLoading: state.ui.isLoading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    signUp: payload => dispatch(signupUser(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
