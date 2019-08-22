import React, { Component } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import {connect} from 'react-redux'
import InputError from './InputError'
import Loader from './Loader'

class AddCar extends Component {
    constructor(props){
        super(props);
        this.state = {
            manufacturer:'',
            model:'',
            age:'',
            price:'',
            errors:'',
            successMessage:'',
            isLoading:false
        }
    }

   addCar = (e) => {
    e.preventDefault();
    this.setState({
        isLoading:true
    })
    axios.post('/addCar', {
        addedBy:this.props.user.id,
        manufacturer:this.state.manufacturer,
        model:this.state.model,
        price:this.state.price,
        age:this.state.age
    })
    .then(()=>{
      this.setState({
          errors:'',
          successMessage: 'Car added successfuly',
          isLoading:false,
          manufacturer:'',
          model:'',
          age:'',
          price:''
      })
    })
    .catch(e=>{
        console.log(e.response.data)
        this.setState({
            errors:e.response.data,
            successMessage:'',
            isLoading:false
        })
    })
   }

   handleChange = (e) =>{
       this.setState({
           [e.target.id]: e.target.value
       })
   }

    render() {
        let {ageError = '', priceError = '', manufacturerError = '', modelError = ''} = this.state.errors;
        let content = '';
        if(this.state.isLoading){
            content = <Loader />
        }else{
            content = <React.Fragment>
                <h2>Add new car</h2>
                <form>
                    <input onChange={this.handleChange} placeholder='Manufacturer' id='manufacturer' type='text' value={this.state.manufacturer}></input>
                    <InputError message={manufacturerError}/>
                    <input onChange={this.handleChange} placeholder='Model' required id='model' type='text' value={this.state.model} ></input>
                    <InputError message={modelError}/>
                    <input onChange={this.handleChange} placeholder='Year of production' required id='age' type='number' value={this.state.age} ></input>
                    <InputError message={ageError}/>
                    <input onChange={this.handleChange} placeholder='Price $' required id='price' type='number' value={this.state.price}></input>
                    <InputError message={priceError}/>
                   
                    <button className='waves-effect waves-light btn' onClick={this.addCar}>Add</button>
                    <h3 style={{'color':'green'}}>{this.state.successMessage}</h3>
                </form>
            </React.Fragment>
        }
        return (
            <div className='container'>
            <div className='row'>
                <Navbar />
                {content}
            </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user:state.user.user
    }
}

export default connect(mapStateToProps)(AddCar)