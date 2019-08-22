import React, { Component } from 'react'
import Navbar from './Navbar'
import Loader from './Loader'
import InputError from './InputError'
import axios from 'axios'
export default class EditCar extends Component {
    constructor(props){
        super(props);
        this.state = {
            errors: '',
            isLoading: false,
            successMessage: '',
            car:{
            age:'',
            price:'',
            model:'',
            manufacturer:''
            }
        };
    }

    updateCar = (e) => {
        e.preventDefault();
        this.setState({
            isLoading:true
        })
        axios.post('/updateCar',{...this.state.car, carId:this.state.car.id})
        .then(()=>{
            this.setState({
                errors:'',
                isLoading:false,
                successMessage:'Updated successfuly'
            })
        })
        .catch(e=>{
            this.setState({
                errors:e.response.data,
                isLoading:false,
                successMessage:''
            })
        })
    }

    componentDidMount(){
        const id = this.props.history.location.pathname.replace('/editCar/','').trim();
        axios.get(`/getCar?id=${id}`)
        .then(data=>{
            this.setState({
                car: data.data
            })
        })
    }

    handleChange = (e) => {
        this.setState({
          car:{
              ...this.state.car,
              [e.target.id]:e.target.value
          }
        })
      }

      render() {
        let content = '';
        let priceError = this.state.errors.priceError;
        let ageError = this.state.errors.ageError;
        if(this.state.isLoading){
           content = <Loader />
        }else{
            content = <form>
            
            <input readOnly  placeholder='Manufacturer' id='manufacturer' value={this.state.car.manufacturer} type='text'></input>
            <p>Cant' change this field</p>

            <input readOnly placeholder='Model' id='model' value={this.state.car.model} type='text'></input>
            <p>Cant' change this field</p>
             
            <label htmlFor='age'>Age</label>
            <input onChange={this.handleChange} placeholder='Age' id='age' value={this.state.car.age} type='number'></input>
            <InputError message={ageError}/>

            <label htmlFor='price'>Price</label>
            <input onChange={this.handleChange} placeholder='Price' id='price' value={this.state.car.price} type='number'></input>
            <InputError message={priceError}/>


            <button className='waves-effect waves-light btn' onClick={this.updateCar}>Update</button>
            <h3 style={{color:'green'}}>{this.state.successMessage}</h3>
        </form>
        }
       
        return (
            <div className='container'>
                <div className='row'>
                <Navbar />
                <h2>Edit car</h2>
                {content}
                </div>
            </div>
        )
    }
}
