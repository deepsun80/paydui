import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push } from "react-router-redux";
import { getMerchantInfo } from "../../actions";
import { pageOn } from "../../actions";

const applyIcon = require("../../images/apply_check.png");
const compareIcon = require("../../images/compare_icon.png");
const selectIcon = require("../../images/select_icon.png");

require("./index.css");

class Home extends Component {
  constructor() {
    super();
    this.state = {
      payId: ""
    };
    this.handleButtonSubmit = this.handleButtonSubmit.bind(this);
    this.handleLinkSubmit = this.handleLinkSubmit.bind(this);
  }

  componentDidMount() {
    window.$('[data-toggle="tooltip"]').tooltip();
    localStorage.clear();
    localStorage.setItem("application-page", 1);
  }

  componentDidUpdate() {
    window.$('[data-toggle="tooltip"]').tooltip();
  }

  handleInputChange = event => {
    this.setState({
      payId: event.target.value
    });
  };

  async handleButtonSubmit(event) {
    event.preventDefault();
    await this.props.getMerchantInfo(this.state.payId);
    this.props.push("/application");
  }

  async handleLinkSubmit(event) {
    event.preventDefault();
    await this.props.pageOn();
    this.props.push("/application");
  }

  render() {
    const { payId } = this.state;
    return (
      <div className="container-fluid homeBody">
        <h5 style={{ padding: "25px 0px" }}>
          The easy way to compare loans and finance any purchase
        </h5>
        <div className="row">
          <div className="col-md-8 firstCol">
            <h1>Do you have a PayID?</h1>
            <h4>If you do, enter it below</h4>
            <form onSubmit={this.handleButtonSubmit}>
              <div className="form-group form-inline">
                <input
                  type="text"
                  className="form-control inputForm"
                  placeholder="Enter PayId"
                  value={payId}
                  onChange={this.handleInputChange}
                />
                <a
                  href={null}
                  data-toggle="tooltip"
                  data-placement="top"
                  title="This is a short word or code. If you are applying for a loan through a Payd merchant, ask them for their Payd ID."
                  style={{ marginLeft: 10 }}
                >
                  <i className="fas fa-question-circle fa-2x" />
                </a>
              </div>
              <button
                className="btn btn-success waves-effect mb-3"
                type="submit"
              >
                Apply Now
              </button>
            </form>
            <h4>
              Don't have one?{" "}
              <a href={null} onClick={this.handleLinkSubmit}>
                Click here
              </a>
            </h4>
          </div>

          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">How it works</h4>
                <div className="row">
                  <div className="col-2">
                    <img
                      src={applyIcon}
                      alt="Apply Logo"
                      style={{ maxHeight: 80 }}
                      title="Apply Logo"
                    />
                  </div>
                  <div className="col-10">
                    <h6>Apply</h6>
                    <p className="grey-text">
                      Fill out and submit our simple form.
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2">
                    <img
                      src={compareIcon}
                      alt="Apply Logo"
                      style={{ maxHeight: 80 }}
                      title="Apply Logo"
                    />
                  </div>
                  <div className="col-10">
                    <h6>Compare</h6>
                    <p className="grey-text">
                      We will instantly match you with the best loan offers.
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2">
                    <img
                      src={selectIcon}
                      alt="Apply Logo"
                      style={{ maxHeight: 80 }}
                      title="Apply Logo"
                    />
                  </div>
                  <div className="col-10">
                    <h6>Select</h6>
                    <p className="grey-text">
                      Finalize the loan with your selected provider.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//-----Redux Functions-----
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getMerchantInfo, pageOn, push }, dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(Home);
