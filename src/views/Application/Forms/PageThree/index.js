import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { validationOn, validationOff } from "../../../../actions";

import states from "./constants";

class PageThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      street: "",
      apt: "",
      city: "",
      state: "",
      zip: "",
      property_status: ""
    };
  }

  componentDidMount() {
    this.props.validationOff();
  }

  componentDidUpdate() {
    const { street, apt, city, state, zip, property_status } = this.state;

    localStorage.setItem(
      "address",
      JSON.stringify({
        street1: street + ", " + apt,
        city: city,
        state: state,
        zip: zip,
        property_status: property_status
      })
    );

    if (
      street !== "" &&
      apt !== "" &&
      city !== "" &&
      state !== "" &&
      zip !== "" &&
      property_status !== ""
    )
      this.props.validationOn();
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  lettersOnly = event => {
    const regex = /[^a-z]/gi;
    event.target.value = event.target.value.replace(regex, "");
  };

  numbersOnly = event => {
    const regex = /[^0-9-]/g;
    event.target.value = event.target.value.replace(regex, "");
  };

  render() {
    return (
      <Fragment>
        <div className="card-body animated fadeIn">
          <div className="titleRow">
            <h4 className="card-title">
              Address
              <a
                href={null}
                data-html="true"
                data-toggle="tooltip"
                data-placement="right"
                title="<strong>Why are we asking for your address?</strong><br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              >
                <i className="fas fa-question-circle fa-1x ml-2" />
              </a>
            </h4>
          </div>
          <form className="form-group inlineForm">
            <p className="card-text">Street Address</p>
            <input
              type="text"
              className="form-control form"
              name="street"
              placeholder="Your street address"
              onChange={this.handleInputChange}
            />
          </form>
          <form className="form-group inlineForm">
            <p className="card-text">Suite/Apartment</p>
            <input
              type="text"
              className="form-control form"
              name="apt"
              placeholder="Your suite/apartment"
              onChange={this.handleInputChange}
            />
          </form>
          <form className="form-group inlineForm">
            <p className="card-text">City</p>
            <input
              type="text"
              className="form-control form"
              name="city"
              placeholder="Your city"
              onKeyUp={this.lettersOnly}
              onChange={this.handleInputChange}
            />
          </form>
          <form className="form-group inlineForm">
            <p className="card-text">State</p>
            <select
              className="form-control form"
              defaultValue="default"
              name="state"
              onChange={this.handleInputChange}
            >
              <option value="default" disabled="disabled">
                Select your state
              </option>
              {states.map((state, key) => {
                return (
                  <option key={key} value={state.value}>
                    {state.option}
                  </option>
                );
              })}
            </select>
          </form>
          <form className="form-group inlineForm">
            <p className="card-text">Zip Code</p>
            <input
              type="text"
              className="form-control form"
              name="zip"
              placeholder="Your zip code"
              onKeyUp={this.numbersOnly}
              maxLength={10}
              onChange={this.handleInputChange}
            />
          </form>
          <form className="form-group inlineForm">
            <p className="card-text">Rent or Own?</p>
            <select
              className="form-control form"
              defaultValue="default"
              name="property_status"
              onChange={this.handleInputChange}
            >
              <option value="default" disabled="disabled">
                Select an option
              </option>
              <option value="own_outright">Own</option>
              <option value="own_with_mortgage">Own with mortgage</option>
              <option value="rent">Rent</option>
            </select>
          </form>
        </div>
      </Fragment>
    );
  }
}

//-----Redux Functions-----
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ validationOn, validationOff }, dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(PageThree);
