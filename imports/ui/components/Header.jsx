// Framework
import React from "react";
import User from "../pages/User.jsx";
import { Route, Redirect } from 'react-router'
import AccountsUIWrapper from '../../ui/AccountsUIWrapper.jsx';


const Header = ({ children, goBack }) =>

  <header>
    <button onClick={goBack} className="back-button">
      {/* Image added here to show image inclusion, prefer inline-SVG. */}
      <img alt="Back" src={`/icon/header/back-white.svg`} />
    </button>
   
      {/* <button onClick={() => { window.location = "http://localhost:3000/user"}} 
      type="button">Register</button> */}
       <AccountsUIWrapper />
    <h1>
      {children}
    </h1>
    <div className="right-content" />
  </header>;

export default Header;
