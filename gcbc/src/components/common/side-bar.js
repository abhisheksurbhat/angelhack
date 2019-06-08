import React from "react";
import { HashRouter as Router, Link } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import classNames from "classnames";
import "../../styles.scss";

export default class SideBar extends React.Component {
  state = {
    page: "dashboard"
  };
  render() {
    return (
      <div className="side-bar">
        <Router>
          <div className="side-bar-wrapper">
            {/* <div
              className={classNames(
                "side-bar-item",
                this.state.page === "home" && "side-bar-item-active"
              )}
            >
              <span className="home-icon">
                <i className="material-icons-outlined">home</i>
              </span>
              <Link to="/home" onClick={_ => this.setState({ page: "home" })}>
                Home
              </Link>
            </div> */}
            <div
              className={classNames(
                "side-bar-item",
                this.state.page === "dashboard" && "side-bar-item-active"
              )}
            >
              <span className="home-icon">
                <i className="material-icons-outlined">dashboard</i>
              </span>
              <Link
                to="/dashboard"
                onClick={_ =>
                  this.setState(_ => this.setState({ page: "dashboard" }))
                }
              >
                Dashboard
              </Link>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}
