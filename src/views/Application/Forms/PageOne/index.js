import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import { validationOn, validationOff } from "../../../../actions";
import loanPurpose from "./constants";

require("./index.css");

class PageOne extends Component {
  static propTypes = {
    merchantInfo: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      loanValue: "",
      loanPurpose: "",
      creditScore: ""
    };
  }

  componentDidMount() {
    this.props.validationOff();
  }

  componentDidUpdate() {
    const { loanValue, loanPurpose, creditScore } = this.state;
    const loanString = loanValue.replace(/,/g, "");
    localStorage.setItem(
      "loan",
      JSON.stringify({
        amount: loanString,
        purpose: loanPurpose,
        credit_score: creditScore
      })
    );
    if (loanValue !== "" && loanPurpose !== "" && creditScore !== "")
      this.props.validationOn();
  }

  handleLoanInputChange = event => {
    function numToString(x) {
      const num1 = x.toString().replace(",", "");
      return num1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    this.setState({
      loanValue: numToString(event.target.value)
    });
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { loanValue } = this.state;
    const { merchantInfo } = this.props;
    merchantInfo &&
      localStorage.setItem("merchantInfo", JSON.stringify(merchantInfo));
    const merchant = JSON.parse(localStorage.getItem("merchantInfo"));

    return (
      <Fragment>
        <div className="card-body animated fadeIn">
          {merchant ? (
            <div>
              <h6 className="card-title">Merchant information</h6>
              <p className="card-text" style={{ textAlign: "center" }}>
                {merchant.name} <br />
                {merchant.business} <br />
                {merchant.address}
                <br />
                Phone: {merchant.phone}
                <br />
                Email: {merchant.email}
              </p>
              <h6 className="card-title">Product/Service selection</h6>
              <div className="form-group">
                <select className="form-control" defaultValue="default">
                  <option value="default" disabled="disabled">
                    Choose product/service
                  </option>
                  <option value="1">product/service 1</option>
                  <option value="2">product/service 2</option>
                  <option value="3">product/service 3</option>
                </select>
              </div>
              <p className="card-text">
                Product/Service name:<br />
                Product/Service description:<br />
                Product/Service purchase price:
              </p>
            </div>
          ) : (
            <div style={{ minHeight: "3em" }} />
          )}
          <h6 className="card-title">Purchase information</h6>
          <p className="card-text mb-0">
            Loan amount (enter between $1,000 and $100,000):
          </p>
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">$</span>
              </div>
              <input
                type="text"
                maxLength="7"
                className="form-control"
                value={loanValue}
                onChange={this.handleLoanInputChange}
              />
            </div>
          </div>
          <p className="card-text mb-0">Loan purpose:</p>
          <div className="form-group">
            <select
              className="form-control"
              defaultValue="default"
              name="loanPurpose"
              onChange={this.handleInputChange}
            >
              <option value="default" disabled="disabled">
                Select loan purpose
              </option>
              {loanPurpose.map((loan, key) => {
                return (
                  <option key={key} value={loan.value}>
                    {loan.option}
                  </option>
                );
              })}
            </select>
          </div>
          <p className="card-text mb-0">Credit score:</p>
          <div className="form-group">
            <select
              className="form-control"
              defaultValue="default"
              name="creditScore"
              onChange={this.handleInputChange}
            >
              <option value="default" disabled="disabled">
                Select credit score
              </option>
              <option value="excellent">Excellent (720+)</option>
              <option value="good">Good (660-719)</option>
              <option value="fair">Fair (600-659)</option>
              <option value="poor">Poor (&lt;600)</option>
            </select>
          </div>
        </div>
      </Fragment>
    );
  }
}

//-----Redux Functions-----
const mapStateToProps = state => {
  return {
    merchantInfo: state.merchantInfo.merchant
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ validationOn, validationOff }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageOne);
