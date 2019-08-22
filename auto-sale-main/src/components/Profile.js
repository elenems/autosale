import React, { Component } from "react";
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import Navbar from './Navbar'
import CarItem from './CarItem'
import axios from 'axios'
class Profile extends Component {
  constructor(props){
    super(props);
    this.state={
      userCars:'',
      isLoading:false
    }
  }
  componentDidMount(){
    axios.get(`/getUserCars?addedBy=${this.props.user.id}`)
    .then((data)=>{
      this.setState({
        userCars: data.data
      })
    })
    .catch(e=>{
    })
  }
  componentWillReceiveProps(props){
    axios.get(`/getUserCars?addedBy=${props.user.id}`)
    .then((data)=>{
      this.setState({
        userCars: data.data
      })
    })
    .catch(e=>{
    })
  }

  removeCar = (id) => {
    axios.post(`/removeCar`,{carId:id})
    .then(()=>{
      this.setState({
        userCars: this.state.userCars.filter(car=>id!==car.id)
      })
    })
    .catch(e=>{
      alert('Error removing car')
    })
  }

  render() {
    const user = this.props.user;
    let userCars = '';
    if(this.state.userCars && this.state.userCars.length > 0){
      userCars = this.state.userCars.map(car=>{
        return (

            <div className='col s12 m6 profile-car' key={car.id}>
          <CarItem key={car.id} car={car}/>
          <Link to={{pathname:`/editCar/${car.id}`}}><button className="waves-effect waves-light btn">Edit </button></Link>
          <button id='remove-button' onClick={()=>this.removeCar(car.id)} className="waves-effect waves-light btn">Remove</button>
          </div>
           )
         
      })
    }
    return (
      <div className='container'>
        <div className='row'>
        <Navbar />
        <h2>Profile</h2>
        <div className="profile-container row">
          <div className="profile-info col s12 xl12">
          <div className='profile-buttons-container'>
            <Link  to='/editProfile'><button className="waves-effect waves-light btn">
              Edit profile
            </button></Link>
            <Link to='/add'><button className="waves-effect waves-light btn">Add new car</button></Link>
            </div>
            <p>Email: {user.email}</p>
            <p>First name: {user.firstName}</p>
            <p>Last name: {user.lastName}</p>
            <p>Phone: {user.phone}</p>
           
           </div>
          <div className="user-cars col s12 xl12">
            <ul className='row'>
             {userCars}
            </ul>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user
  };
};

export default connect(mapStateToProps)(Profile);
