import React, { Component } from 'react'
import CarItem from './CarItem'

export default class CarList extends Component {
    render() {
        let content = '';
        if(!this.props.cars.length){
          content = <li style={{'fontSize':'24px', 'textAlign':'center', 'color':'#26a69a'}}>No cars found</li>
        }else{
            content = this.props.cars.map( car => {
                return (
                    <li key={car.id} className = 'col s12 m6'>
                        <CarItem  car={car}/>
                    </li>
                )
            })
        }
       
        return (
            <div className='col s12 m12 l12'>
                <h4>All cars</h4>
                <ul className='row'>
                 {content}
                </ul>
            </div>
        )
    }
}
