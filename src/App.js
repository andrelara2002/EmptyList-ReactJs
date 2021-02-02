import React from "react";
import "./style.css";

import Body from "./components/Body/index.js";
import Header from "./components/Header/index.js";
import Footer from './components/Footer/index'

export default function App() {
  return (
    <div className='app'>
      <Header/>
      <Body />
      <Footer/>
    </div>
  );
}
