import React, { Component } from "react";

import logo from "../../images/empty-list-logo.svg";
import "./styles.scss";

class Header extends Component {
  render() {
    return (
      <div className="header_image">
        <img src={logo} />
      </div>
    );
  }
}
export default Header;
