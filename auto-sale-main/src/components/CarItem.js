import React from 'react'
import carImage from '../images/car.jpg'
import {Link} from 'react-router-dom'
export default function CarItem(props) {
    return (
         <Link to={`/car/${props.car.id}`}>
          <div className='row'>
            <div className='col s6 m12 l8'>
               <img className='responsive-img' alt='Car' src={carImage}/>
            </div>
            <div className='col s6 m12 l4 xl4 car-description'>
              <h5>{props.car.manufacturer} {props.car.model}</h5>

              <p>Age: {props.car.age}</p>
              <p>Price: {props.car.price}$</p>
            </div>
          </div>
          </Link>
    )
}
