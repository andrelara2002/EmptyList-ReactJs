import React, { Component } from "react";
import Body from "../Body/index.js";

import logo from "../../images/empty-list-logo.svg";
import "./styles.css";

class Header extends Component {
  render() {
    return (
      <div className="header_image">
        <img src={logo} />
        <button
          onClick={() => {
            let bodyElement = new Body();
            bodyElement.downloadFile();
          }}
        >
          Baixar Listas
        </button>
        <input
          id="get_data_input"
          type="file"
          onChange={() => {
            let bodyElement = new Body();
            bodyElement.setDataFromJson(
              document.getElementById("get_data_input")
            );
          }}
        />
      </div>
    );
  }
}
export default Header;
