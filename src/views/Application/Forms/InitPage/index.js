import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { pageOff } from "../../../../actions";

require("./index.css");

class InitPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: "",
      cost: "",
      business: ""
    };
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleInputSubmit = event => {
    this.props.pageOff();
  };

  render() {
    const { services, cost, business } = this.state;

    return (
      <Fragment>
        <div className="card-body animated fadeIn">
          <form className="form-group inlineForm mt-4">
            <p className="card-text">
              What goods or services are you looking to purchase?
            </p>
            <textarea
              className="form-control form"
              name="services"
              type="text"
              rows="3"
              value={services}
              onChange={this.handleInputChange}
            />
          </form>
          <form className="form-group inlineForm">
            <p className="card-text">How much does is cost?</p>
            <textarea
              class="form-control form"
              name="cost"
              rows="3"
              onChange={this.handleInputChange}
            />
          </form>
          <form className="form-group inlineForm">
            <p className="card-text">
              What is the name of the business you plan on making this purchase
              from?
            </p>
            <textarea
              class="form-control form"
              name="business"
              rows="3"
              placeholder="Not sure"
              onChange={this.handleInputChange}
            />
          </form>
          <form className="initButton" onSubmit={this.handleOfferSubmit}>
            <button
              disabled={services === "" || cost === "" || business === ""}
              type="submit"
              className="btn btn-success"
            >
              Continue application
            </button>
          </form>
        </div>
      </Fragment>
    );
  }
}

//-----Redux Functions-----
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ pageOff }, dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(InitPage);
