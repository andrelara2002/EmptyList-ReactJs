import React, { Component } from "react";
import Body from "../Body/index.js";

import "./styles.css";
import '../../style.css'

class Header extends Component {
  render() {
    return (
      <div className="header_image">
        <button
          onClick={() => {
            let bodyElement = new Body();
            bodyElement.downloadFile();
          }}
        >
          Baixar Listas
        </button>
      </div>
    );
  }
}
export default Header;
