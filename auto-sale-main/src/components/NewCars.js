import React, { Component } from 'react'
import CarItem from './CarItem'

class NewCars extends Component {

    render() {
        const cars = this.props.cars.map( (car => {
            return  <li key={car.id} className='col m6 l12'><CarItem car={car}/></li>;
        }))

        return (
            <div className='col s12 m12 l6 xl5 offset-l1 offset-xl1'>
                <h4>Newest cars</h4>
                <ul className='row'>
                 {cars}
                </ul>
            </div>
        )
    }
}

export default NewCars
