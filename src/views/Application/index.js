import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  InitPage,
  PageOne,
  PageTwo,
  PageThree,
  PageFour,
  PageFive
} from "./Forms";

require("./index.css");

class Application extends Component {
  static propTypes = {
    validation: PropTypes.bool,
    page: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      pages: parseInt(localStorage.getItem("application-page"), 10)
    };
  }

  componentDidMount() {
    window.$('[data-toggle="tooltip"]').tooltip();
  }

  componentDidUpdate() {
    window.$('[data-toggle="tooltip"]').tooltip();
  }

  handleNext = () => {
    const { pages } = this.state;
    if (pages < 5) {
      let newPage = pages + 1;
      localStorage.setItem("application-page", newPage);
      this.setState({
        pages: parseInt(localStorage.getItem("application-page"), 10)
      });
    }
  };

  handlePrev = () => {
    const { pages } = this.state;
    if (pages > 1) {
      let newPage = pages - 1;
      localStorage.setItem("application-page", newPage);
      this.setState({
        pages: parseInt(localStorage.getItem("application-page"), 10)
      });
    }
  };

  render() {
    const { pages } = this.state;
    const { validation, page } = this.props;
    return (
      <div className="card appPanel my-4 mx-auto">
        {page ? (
          <InitPage />
        ) : (
          <div className="mx-auto">
            <div className="pages pt-2 animated fadeIn">
              {pages === 1 ? (
                <i className="fa fa-circle" aria-hidden="true" />
              ) : (
                <i className="fa fa-circle-o" aria-hidden="true" />
              )}
              <hr />
              {pages === 2 ? (
                <i className="fa fa-circle" aria-hidden="true" />
              ) : (
                <i className="fa fa-circle-o" aria-hidden="true" />
              )}
              <hr />
              {pages === 3 ? (
                <i className="fa fa-circle" aria-hidden="true" />
              ) : (
                <i className="fa fa-circle-o" aria-hidden="true" />
              )}
              <hr />
              {pages === 4 ? (
                <i className="fa fa-circle" aria-hidden="true" />
              ) : (
                <i className="fa fa-circle-o" aria-hidden="true" />
              )}
              <hr />
              {pages === 5 ? (
                <p className="finalPageDark">Get Offers!</p>
              ) : (
                <p className="finalPageLight">Get Offers!</p>
              )}
            </div>
          </div>
        )}

        {!page && pages === 1 && <PageOne />}
        {pages === 2 && <PageTwo />}
        {pages === 3 && <PageThree />}
        {pages === 4 && <PageFour />}
        {pages === 5 && <PageFive />}

        {!validation && (
          <p className="validationMessage">
            Please fill out all fields to continue.
          </p>
        )}

        {!page && (
          <div className="buttonRow mx-3 mb-3 animated fadeIn">
            {pages === 1 ? (
              <span style={{ width: "15%" }} />
            ) : (
              <button
                className="btn btn-success waves-effect"
                onClick={this.handlePrev}
              >
                Previous
              </button>
            )}

            {pages !== 5 && (
              <button
                disabled={!validation}
                className="btn btn-success waves-effect"
                onClick={this.handleNext}
              >
                Next
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
}

//-----Redux Functions-----
const mapStateToProps = state => {
  return {
    validation: state.validation,
    page: state.page
  };
};

export default connect(mapStateToProps)(Application);
