import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from './Navbar'
import {updateUser} from '../redux/actions/userActions'
import Loader from './Loader'
import InputError from './InputError'


class EditProfile extends Component {

    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            lastName:'',
            phone:''
        }
    }

    componentDidMount(){
        const {phone='', firstName = '', lastName = '', email=''} = this.props.user;
        this.setState({
            phone:phone,
            firstName:firstName,
            lastName:lastName,
            email
        })
    }

    componentWillReceiveProps(props){
        const {phone='', firstName = '', lastName = '', email} = props.user;
        this.setState({
            phone:phone,
            firstName:firstName,
            lastName:lastName,
            email
        })
    }

    handleChange = (e) => {
      e.preventDefault();
      this.setState({
          [e.target.id]:e.target.value
      })
    }

    updateUser = (e) => {
        e.preventDefault();
        this.props.updateUser({user:this.state, history:this.props.history});
    }

    render() {
        let content = '';
        let phoneError = this.props.errors.phoneError;
        if(this.props.isLoading){
           content = <Loader />
        }else{
            content = <form>
            
            <label htmlFor="firstName">First name</label>
            <input onChange={this.handleChange} placeholder='First name' id='firstName' value={this.state.firstName} type='text'></input>
            
            <label htmlFor="lastName">Last name</label>
            <input onChange={this.handleChange} placeholder='Last name' id='lastName' value={this.state.lastName} type='text'></input>


            <label htmlFor="phone">phone</label>                
            <input onChange={this.handleChange} placeholder='Phone' id='phone' value={this.state.phone} type='text'></input>
            <InputError message={phoneError}/>
            <p>Phone must contain 10 digits, eg: 0661714135</p>


            <button className='waves-effect waves-light btn' onClick={this.updateUser}>Update</button>
        </form>
        }
       
        return (
            <div className='container'>
                <div className='row'>
                <Navbar />
                <h2>Edit profile</h2>
                {content}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        errors: state.ui.errors,
        isLoading:state.ui.isLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (payload) => dispatch(updateUser(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
