import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { loanOffers, register } from "../../../../actions";

require("./index.css");

class PageFive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      passwordConfirm: "",
      isChecked: false
    };
    this.handleOfferSubmit = this.handleOfferSubmit.bind(this);
  }

  async componentDidMount() {
    window.$('[data-toggle="tooltip"]').tooltip();
  }

  componentDidUpdate() {
    window.$('[data-toggle="tooltip"]').tooltip();

    localStorage.setItem(
      "legal",
      JSON.stringify({
        agree: this.state.isChecked
      })
    );
  }

  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    });
  };

  handleConfirmPasswordChange = event => {
    this.setState({
      passwordConfirm: event.target.value
    });
  };

  handleCheckChange = event => {
    this.setState({
      isChecked: !this.state.isChecked
    });
  };

  async handleOfferSubmit(event) {
    event.preventDefault();
    await this.props.register(this.state.password);
  }

  render() {
    const { password, passwordConfirm, isChecked } = this.state;

    let validate =
      password !== "" &&
      passwordConfirm !== "" &&
      password === passwordConfirm &&
      isChecked;

    return (
      <Fragment>
        <div className="card-body animated fadeIn">
          <div className="titleRow">
            <h4 className="card-title">
              Create Payd User
              <a
                href={null}
                data-html="true"
                data-toggle="tooltip"
                data-placement="right"
                title="<strong>Why create a Payd user?</strong><br/>In order for you to recieve loan offers, you must create a user account with us. Once you complete this form, you will be automatically logged in to your acount. You may sign out and sign in using your email and password."
              >
                <i className="fas fa-question-circle fa-1x ml-2" />
              </a>
            </h4>
          </div>
          <p className="card-text">Your Email</p>
          <p className="username">
            {JSON.parse(localStorage.getItem("personal")).email}
          </p>
          <form className="form-group inlineForm">
            <p className="card-text">Password</p>
            <input
              type="password"
              className="form-control form"
              placeholder="Your password"
              onChange={this.handlePasswordChange}
            />
          </form>
          <form className="form-group inlineForm">
            <p className="card-text">Confirm Password</p>
            <input
              type="password"
              className="form-control form"
              placeholder="Confirm your password"
              onChange={this.handleConfirmPasswordChange}
            />
          </form>
          <hr className="my-4" />
          <form>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="disclaimerCheck"
                checked={isChecked}
                onChange={this.handleCheckChange}
                style={{ transform: "scale(1.3)" }}
              />
              <label className="form-check-label" htmlFor="disclaimerCheck">
                <p className="card-text">
                  By checking this box, I hereby consent to{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.paydapp.com/electronic-consent"
                  >
                    Payd's E-Sign Agreement
                  </a>,{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.paydapp.com/credit-authorization-agreement"
                  >
                    Credit Authorization Agreement
                  </a>,{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.paydapp.com/privacy-policy"
                  >
                    Privacy Policy
                  </a>,{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.paydapp.com/account-tos"
                  >
                    Terms of Service
                  </a>{" "}
                  and am providing written consent under the FCRA for Payd, LLC
                  and its partners to obtain consumer report information from my
                  credit profile. I agree to be contacted by Payd and its
                  partners at the telephone number(s) I have provided above to
                  explore personal loan offers, including contact through
                  automatic dialing systems, artificial or pre-recorded voice
                  messaging, or text message. I understand my consent is not
                  required as a condition to purchase any goods or services from
                  anyone.
                </p>
              </label>
            </div>
          </form>
        </div>

        {!validate && (
          <p className="validationMessage mb-0">
            Please set, confirm password, and click our agreement to continue.
          </p>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            disabled={!validate}
            type="submit"
            className="btn btn-info appSubmit mr-4"
            onClick={this.handleOfferSubmit}
          >
            Get Offers
          </button>
        </div>
      </Fragment>
    );
  }
}

//-----Redux Functions-----
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ loanOffers, register }, dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(PageFive);
