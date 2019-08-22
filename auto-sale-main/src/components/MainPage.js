import React, { Component } from 'react'
import Filters from './Filters'
import NewCars from './NewCars'
import Navbar from './Navbar'
import axios from 'axios';
import CarList from './CarList';


function getNewCars(arr, limit){
  let sortedArr = arr.sort((a,b) => {
      return new Date(b.date) - new Date(a.date) 
  })
  return sortedArr.slice(0,limit);
}

function getAvailableManufacturers(cars){
   const manufacturers = {};
   const manufacturerArray = [];
   for(let car of cars){
      manufacturers[car.manufacturer]=car.manufacturer;
   }
   
   for(let manufact in manufacturers){
       manufacturerArray.push({value:manufact, label:manufact})
   }
   return manufacturerArray;
}

function getAvailableModels(cars){
    const models = {};

    function isExist(cars, model){
        for(let car of cars){
            if(car.value === model){
                return true;
            }
        }
        return false;
    }

    for(let car of cars){
        if(models[car.manufacturer]){
            if(!isExist(models[car.manufacturer], car.model)){
            models[car.manufacturer]=[...models[car.manufacturer], {value:car.model, label:car.model}];
            }
        }else{
            models[car.manufacturer] = [{value:car.model, label:car.model}];
        }
        
    }
    
    return models;
}

export default class MainPage extends Component {
    constructor(props){
        super(props)
        this.state={
            cars:[],
            newCars:[],
            filters:'',
            allCars:[]
        }
    }

    setFilters = (filters) => {
        this.sort(filters);
    }

    sort = (filters) =>{
        let sortedCars = [];
        const checkedFilters = {}
        if(!filters.ageFrom){
            checkedFilters['ageFrom'] = 1900;
        }else{
            checkedFilters['ageFrom'] = parseInt(filters.ageFrom);
        }
        if(!filters.ageTo){
            checkedFilters['ageTo'] = new Date().getFullYear();
        }else{
            checkedFilters['ageTo'] = parseInt(filters.ageTo);
        }
        if(!filters.priceFrom){
            checkedFilters['priceFrom'] = 0;
        }else{
            checkedFilters['priceFrom'] = parseInt(filters.priceFrom);
        }
        if(!filters.priceTo){
            checkedFilters['priceTo'] = 99999999;
        }else{
            checkedFilters['priceTo'] = parseInt(filters.priceTo);
        }

        for(let car of this.state.cars){
            if(car.age >= checkedFilters['ageFrom'] && car.age <= checkedFilters['ageTo'] &&
                car.price >= checkedFilters['priceFrom'] && car.price <= checkedFilters['priceTo']){
                    sortedCars.push(car);
                }
        }

        if(filters.selectedManufacturerOption !== null){
           sortedCars = sortedCars.filter( car => {
               return car.manufacturer === filters.selectedManufacturerOption.value;
           })
        }

        if(filters.selectedModelOption !== null){
            sortedCars = sortedCars.filter( car => {
                return car.model === filters.selectedModelOption.value;
            })
        }

        this.setState({
            allCars: sortedCars
        })
    }

    componentDidMount(){
        
      axios.get('/getCars')
      .then((data)=>{
         this.setState({
             cars: data.data,
             newCars: getNewCars(data.data, 2),
             allCars:data.data
         })
      })
    }
    render() {
        return (
            <div className='container'>
                <div className='row'>
                 <Navbar />
                 <Filters 
                  setFilters={this.setFilters}
                  manufacturers = {getAvailableManufacturers(this.state.cars)} 
                  models = {getAvailableModels(this.state.cars)}/>
                 <NewCars cars={this.state.newCars}/>
                 <CarList cars={this.state.allCars}/>
                </div>
            </div>
        )
    }
}
