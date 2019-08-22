import React, { Component } from "react";
import {connect} from 'react-redux'
import {loginUser} from '../redux/actions/userActions'
import InputError from './InputError'
import Loader from './Loader'
import Navbar from './Navbar'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange = (e) => {
     this.setState({
       [e.target.id]: e.target.value
     })
  }

  loginUser = (e) => {
    
    e.preventDefault();
    this.props.login({
        email:this.state.email,
        password:this.state.password,
        history:this.props.history
    })
  }

  render() {
    const {emailError='', passwordError='', wrongCreds=''} = this.props.errors;
    let content = '';

    if(!this.props.isLoading){
      content = <div><h2>Login</h2><form>
      <div className="input-field col s12">
        <input onChange={this.handleChange} value={this.state.email} id="email" type="email" />
        <label htmlFor="email">Email</label>
        <InputError message = {emailError}/>
      </div>

      <div className="input-field col s12">
        <input onChange={this.handleChange} value={this.state.password} id="password" type="password"/>
        <label htmlFor="password">Password</label>
        <InputError message = {passwordError}/>
        <InputError message = {wrongCreds}/>
      </div>

      <div className="input-field col s12">
      <button className='waves-effect waves-light btn' onClick={this.loginUser}>Login</button>
      </div>
    </form></div>
    }else{
      content = <Loader />
    }

    return (
      <div className="container">
        <div className="row">
          <Navbar />
          {content}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        login: (loginInfo) => dispatch(loginUser(loginInfo))
    }
}

const mapStateToProps = (state) => {
  return {
    errors: state.ui.errors,
    isLoading: state.ui.isLoading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
