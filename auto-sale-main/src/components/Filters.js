import React, { Component } from "react";
import Select from "react-select";

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedManufacturerOption: null,
      selectedModelOption: null,
      priceFrom: '',
      priceTo: '',
      ageFrom: '',
      ageTo: ''
    };
  }

  handleChange = (e) => {
      this.setState({
          [e.target.id]: e.target.value
      })

  }

  handleSubmit = (e) => {
      e.preventDefault();
      this.props.setFilters(this.state)
  }

  handleManufacturerChange = selectedManufacturerOption => {
    this.setState({ selectedManufacturerOption, selectedModelOption: null });
  };

  handleModelChange = selectedModelOption => {
    this.setState({ selectedModelOption });
  };

  render() {
    const { selectedManufacturerOption, selectedModelOption } = this.state;
    let modelOptions = [];

    if (this.state.selectedManufacturerOption) {
      modelOptions = this.props.models[selectedManufacturerOption.value];
    }

    return (
      <div className="col s10 offset-s1 m8 offset-m2 l5">
        <h4>Filters</h4>
        <form onSubmit={this.handleSubmit}>
          <div className="input-field">
            <label htmlFor="selectAuto">Choose automobile manufacturer</label>
            <Select
              id="selectAuto"
              placeholder="Manufacturer"
              value={selectedManufacturerOption}
              onChange={this.handleManufacturerChange}
              options={this.props.manufacturers}
            />
          </div>

          <div className="input-field">
            <label htmlFor="selectModel">Choose automobile model</label>
            <Select
              id="selectModel"
              placeholder="Model"
              value={selectedModelOption}
              onChange={this.handleModelChange}
              options={modelOptions}
            />
          </div>

          <div className="row">
            <div className="col s12">
              <p>Price</p>
            </div>
            <div className="input-field col s12 m6">
              <input
                placeholder="From"
                id="priceFrom"
                type="number"
                className="validate"
                value={this.state.priceFrom}
                onChange={this.handleChange}
              />             
            </div>

            <div className="input-field col s12 m6">
              <input
                placeholder="To"
                id="priceTo"
                type="number"
                className="validate"
                value={this.state.priceTo}
                onChange={this.handleChange}
              />              
            </div>

            <div className="col s12">
              <p>Age</p>
            </div>
            <div className="input-field col s12 m6">
              <input
                placeholder="From"
                id="ageFrom"
                type="number"
                className="validate"
                value={this.state.ageFrom}
                onChange={this.handleChange}
              />
            </div>

            <div className="input-field col s12 m6">
              <input
                placeholder="To"
                id="ageTo"
                type="number"
                className="validate"
                value={this.state.ageTo}
                onChange={this.handleChange}
              />
            </div>

            <div className="input-field col s12 center-align">
              <button className="waves-effect waves-light btn space-left">
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Filters;
