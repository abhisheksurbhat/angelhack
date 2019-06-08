import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { Logo } from "../../assets";
import "../../styles.scss";
export default class Header extends React.Component {
  render() {
    let value = "Kaushik Iyer";
    return (
      <div className="navbar">
        <div className="navbar-container">
          <div className="logo" />
          <div className="">{value}</div>
        </div>
      </div>
    );
  }
}
