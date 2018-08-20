import React, { Component } from "react";
import { connect } from "react-redux";
import { BeatLoader } from "react-spinners";
import PropTypes from "prop-types";

require("./index.css");

class Loader extends Component {
  static propTypes = {
    auth: PropTypes.string,
    merchant: PropTypes.string,
    loanOffer: PropTypes.string
  };

  static defaultProps = {
    auth: "",
    merchant: "",
    loanOffer: ""
  };

  render() {
    const { auth, merchant, loanOffer } = this.props;
    return (
      <div className="loader">
        <BeatLoader
          size={20}
          color={"#03E5FF"}
          loading={
            auth === "Loading" ||
            merchant === "Loading" ||
            loanOffer === "Loading"
          }
        />
      </div>
    );
  }
}

// -----Redux Functions-----
const mapStateToProps = state => {
  return {
    auth: state.auth,
    merchant: state.merchantInfo.fetchState,
    loanOffer: state.loanOffer
  };
};

export default connect(mapStateToProps)(Loader);
