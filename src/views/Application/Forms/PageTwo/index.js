import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MaskedInput from "react-maskedinput";

import { validationOn, validationOff } from "../../../../actions";

class PageTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      dob: "",
      ssn: ""
    };
  }

  componentDidMount() {
    this.props.validationOff();
  }

  componentDidUpdate() {
    const { firstName, lastName, email, phoneNumber, dob, ssn } = this.state;

    const dobReverse = dob
      .split("")
      .reverse()
      .join("");

    localStorage.setItem(
      "personal",
      JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        phone: phoneNumber,
        email: email,
        dob: dobReverse,
        ssn: ssn
      })
    );

    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      phoneNumber !== "" &&
      dob !== "" &&
      ssn !== ""
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

  render() {
    return (
      <Fragment>
        <div className="card-body animated fadeIn">
          <div className="titleRow">
            <h4 className="card-title">
              Personal Information
              <a
                href={null}
                data-html="true"
                data-toggle="tooltip"
                data-placement="right"
                title="<strong>Why are we asking for your personal information?</strong><br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              >
                <i className="fas fa-question-circle fa-1x ml-2" />
              </a>
            </h4>
          </div>
          <form className="form-group inlineForm">
            <p className="card-text">First Name</p>
            <input
              type="text"
              className="form-control form"
              name="firstName"
              placeholder="Your first name"
              onKeyUp={this.lettersOnly}
              onChange={this.handleInputChange}
            />
          </form>
          <form className="form-group inlineForm">
            <p className="card-text">Last Name</p>
            <input
              type="text"
              className="form-control form"
              name="lastName"
              placeholder="Your last name"
              onKeyUp={this.lettersOnly}
              onChange={this.handleInputChange}
            />
          </form>
          <form className="form-group inlineForm">
            <p className="card-text">Email Address</p>
            <input
              type="text"
              className="form-control form"
              name="email"
              placeholder="Your email address"
              onChange={this.handleInputChange}
            />
          </form>
          <form className="form-group inlineForm">
            <p className="card-text">Phone Number</p>
            <MaskedInput
              className="form-control form"
              mask="111-111-1111"
              name="phoneNumber"
              size="12"
              placeholder="Your phone number"
              onChange={this.handleInputChange}
            />
          </form>
          <form className="form-group inlineForm">
            <p className="card-text">Date of Birth</p>
            <MaskedInput
              className="form-control form"
              mask="11-11-1111"
              name="dob"
              size="12"
              placeholder="mm-dd-yyyy"
              onChange={this.handleInputChange}
            />
          </form>
          <form className="form-group inlineForm">
            <p className="card-text ssnField">Social Security Number</p>
            <MaskedInput
              className="form-control form"
              mask="111-11-1111"
              name="ssn"
              size="12"
              placeholder="###-##-####"
              onChange={this.handleInputChange}
            />
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
)(PageTwo);
