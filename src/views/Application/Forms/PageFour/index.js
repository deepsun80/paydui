import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  loanOffers,
  login,
  validationOn,
  validationOff
} from "../../../../actions";

require("./index.css");

class PageFour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employment_status: "",
      employment_pay_frequency: "",
      annual_income: ""
    };
  }

  async componentDidMount() {
    window.$('[data-toggle="tooltip"]').tooltip();
    this.props.validationOff();
  }

  componentDidUpdate() {
    window.$('[data-toggle="tooltip"]').tooltip();

    const {
      employment_status,
      employment_pay_frequency,
      annual_income
    } = this.state;

    const incomeString = annual_income.replace(/,/g, "");

    localStorage.setItem(
      "financial",
      JSON.stringify({
        employment_status: employment_status,
        employment_pay_frequency: employment_pay_frequency,
        annual_income: incomeString
      })
    );

    if (
      employment_status !== "" &&
      employment_pay_frequency !== "" &&
      annual_income !== ""
    )
      this.props.validationOn();
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleIncomeInputChange = event => {
    function numToString(x) {
      const num1 = x.toString().replace(",", "");
      return num1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    this.setState({
      annual_income: numToString(event.target.value)
    });
  };

  render() {
    const { annual_income } = this.state;
    return (
      <div className="card-body animated fadeIn">
        <div className="titleRow">
          <h4 className="card-title">
            Financial Information
            <a
              href={null}
              data-html="true"
              data-toggle="tooltip"
              data-placement="right"
              title="<strong>Why are we asking for your financial information?</strong><br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            >
              <i className="fas fa-question-circle fa-1x ml-2" />
            </a>
          </h4>
        </div>
        <form className="form-group inlineForm">
          <p className="card-text">Employment Status</p>
          <select
            className="form-control form"
            defaultValue="default"
            name="employment_status"
            onChange={this.handleInputChange}
          >
            <option value="default" disabled="disabled">
              Select your employment status
            </option>
            <option value="employed">Employed</option>
            <option value="military">Military</option>
            <option value="not_employed">Not employed</option>
            <option value="retired">Retired</option>
            <option value="self_employed">Self-employed</option>
            <option value="other">Other</option>
          </select>
        </form>
        <form className="form-group inlineForm">
          <p className="card-text">Pay Frequency</p>
          <select
            className="form-control form"
            defaultValue="default"
            name="employment_pay_frequency"
            onChange={this.handleInputChange}
          >
            <option value="default" disabled="disabled">
              Select an option
            </option>
            <option value="weekly">Weekly</option>
            <option value="biweekly">Bi-weekly</option>
            <option value="twice_monthly">Twice monthly</option>
            <option value="monthly">Monthly</option>
            <option value="other">Other</option>
          </select>
        </form>
        <form className="form-group inlineForm">
          <p className="card-text">Annual Income</p>
          <div className="input-group form">
            <div className="input-group-prepend">
              <span className="input-group-text">$</span>
            </div>
            <input
              type="text"
              maxLength="8"
              className="form-control numInput"
              value={annual_income}
              onChange={this.handleIncomeInputChange}
            />
          </div>
        </form>
        <p className="card-text disclaimer">
          Your yearly income before taxes. Alimony, child support or separate
          maintenance is optional. Increase any non-taxable income or benefits
          by 25%.
        </p>
      </div>
    );
  }
}

//-----Redux Functions-----
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { loanOffers, login, validationOn, validationOff },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(PageFour);
