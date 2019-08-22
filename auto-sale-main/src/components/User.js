import React, { Component } from 'react'
import axios from 'axios'
import Navbar from './Navbar'

class User extends Component {

    constructor(props){
        super(props);
        this.state = {
            email:'',
            firstName: '',
            lastName: '',
            phone:''
        }
    }
    
    componentDidMount(){
      const id = this.props.match.params.id;
      axios.get(`/getUser?email=${id}`)
      .then((data)=>{
          this.setState({
              email:data.data.email,
              firstName: data.data.firstName,
              lastName: data.data.lastName,
              phone:data.data.phone,
              signUpDate: data.data.signUpDate
          })
      })
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                <Navbar />
                <h2>User {this.state.firstName} {this.state.lastName}</h2>
                <p>Phone:  {this.state.phone}</p>
                <p>email: {this.state.email}</p>
                <p>SignUpDate: {this.state.signUpDate}</p>
                </div>
            </div>
        )
    }
}


export default User

