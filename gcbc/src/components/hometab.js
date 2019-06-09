import React from "react";
import ConsoleHomeTabs from "./console-hometabs";
import { Router, Link } from "react-router-dom";

export default class Dashboard extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ConsoleHomeTabs />

        {/* Take Reseller Id from the state */}
      </React.Fragment>
    );
  }
}
