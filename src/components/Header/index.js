import React from "react";

const paydLogo = require("../../images/payd-logo.png");

require("./index.css");

const Header = () => (
  <nav className="navbar header">
    <a className="navbar-brand" href="/">
      <img
        src={paydLogo}
        alt="Payd Logo"
        style={{ maxHeight: 90 }}
        title="Payd Logo"
      />
    </a>
    <div className="signIn ml-auto mt-3">
      <p className="mb-0 ml-1">Already have an account?</p>
      <i className="fas fa-2x fa-sign-in-alt pl-1">
        <p className="ml-1 mt-1">
          <a href={null}>Sign In</a>
        </p>
      </i>
    </div>
  </nav>
);

export default Header;
