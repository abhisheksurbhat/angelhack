import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { HashRouter as Router } from "react-router-dom";
import classNames from "classnames";
import { Logo } from "../../assets";
import { Link } from "react-router-dom";
import "../../styles.scss";
export default class Header extends React.Component {
  render() {
    let value = "Kaushik Iyer";
    return (
      <div className="navbar">
        <div className="navbar-container">
          <Router>
            <div className="navbar-headers">
              <Link
                to="/hometab"
                className={classNames("side-bar-item")}
                onClick={_ => this.setState({ page: "home" })}
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className={classNames("side-bar-item")}
                onClick={_ =>
                  this.setState(_ => this.setState({ page: "dashboard" }))
                }
              >
                Dashboard
              </Link>
            </div>
          </Router>
          <div className="">{value}</div>
        </div>
      </div>
    );
  }
}
