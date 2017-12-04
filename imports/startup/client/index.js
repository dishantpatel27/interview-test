// Framework
import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import "../accounts-config.js";
// Libraries
import "bootstrap/dist/css/bootstrap.css";

// Client Imports
import Routes from "../../ui/Routes.jsx";

// Actual Rendering Function
const renderApp = () =>
  render(<Routes />, document.getElementById("render-target"));

// Start App
Meteor.startup(() => {
  renderApp();
});
