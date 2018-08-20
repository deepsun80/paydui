import React from "react";

const equalHousingLenderLogo = require("../../images/equalHousingLender.png");

require("./index.css");

const Footer = () => (
  <footer className="footer text-center">
    © {new Date().getFullYear()} Payd LLC |
    <a href="https://www.paydapp.com/privacy-policy"> Privacy Policy |</a>
    <a href="https://www.paydapp.com/privacy-policy"> Terms of Service</a>
    <img
      src={equalHousingLenderLogo}
      alt="Equal Housing Lender Logo"
      style={{ maxHeight: 20, marginLeft: 10 }}
      title="Equal Housing Lender"
    />
  </footer>
);

export default Footer;
