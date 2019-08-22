import React, { Component } from "react";
import Navbar from "./Navbar";
import carImage from "../images/car.jpg";
import axios from "axios";
import { Link } from "react-router-dom";

export default class CarDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      car: {},
      user: {}
    };
  }

  componentDidMount() {
    axios
      .get(`/getCar?id=${this.props.match.params.id}`)
      .then(data => {
        this.setState({
          car: data.data
        });
        return data.data.addedBy;
      })
      .then(addedBy => {
         
        axios.get(`/getUser?email=${addedBy}`).then(data => {
          this.setState({
            user: {
              firstName: data.data.firstName,
              lastName: data.data.lastName,
              phone: data.data.phone,
              signUpDate: data.data.signUpDate,
              id:data.data.id
            }
          });
        });
      })
      .catch(e => {});
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <Navbar />
          <h2>Car details</h2>
          <div className="row">
            <div className="col s12 m6 l8">
              <img className="responsive-img" alt="Car" src={carImage} />
            </div>
            <div className="col s12 m6 l4 xl4 car-description">
              <h5>
                {this.state.car.manufacturer} {this.state.car.model}
              </h5>
              <p>Age: {this.state.car.age}</p>
              <p>Price: {this.state.car.price}$</p>
              <br />
              <h5>
                <Link to={`/user/${this.state.user.id}`}>
                  Car owner: {this.state.user.firstName}{" "}
                  {this.state.user.lastName}
                </Link>
              </h5>
              <p>Phone: {this.state.user.phone}</p>
              <p>Sign up date: {this.state.user.signUpDate}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
