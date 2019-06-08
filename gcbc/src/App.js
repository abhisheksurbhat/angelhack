import React, { Fragment } from "react";
import "./App.css";
import { HashRouter as Router, Route } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Home from "./components/home";
import SideBar from "./components/common/side-bar";
import Header from "./components/common/header";
import "./styles.scss";
import Feedback from "./components/feedback/component";
import BidViewPage from "./components/projects/bid-view-page";
import ChatList from "./components/chat/chat-list";
import classNames from "classnames";
import BidModal from "./components/projects/bid-modal.jsx";
import HomeTab from './components/hometab.js';

function App() {
  return (
    <div>
      {window.location.href.endsWith("/chat") || (
        <Fragment>
          <SideBar />
          <Header />
        </Fragment>
      )}

      <Router>
        <div
          className={classNames(
            window.location.href.endsWith("/chat") || "container"
          )}
        >
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/hometab" component={HomeTab} />
          <Route path="/home" component={Home} />
          <Route
            path="/feedback/:projectId/:customer_id/:reseller_id"
            component={Feedback}
          />
          <Route path="/bid-view/:projectId" component={BidViewPage} />
        </div>
        <Route path="/:projectId/chat" component={ChatList} />
      </Router>
    </div>
  );
}
export default App;
