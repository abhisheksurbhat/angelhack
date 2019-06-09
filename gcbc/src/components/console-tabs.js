import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ProjectCardSmall from "./projects/project-card-small";
import ConsoleCard from "./console-card";
import { actions } from "./projects/ducks";
import { connect } from "react-redux";

class ConsoleTabs extends React.Component {
  static mapDispatchToProps = actions;
  static mapStateToProps = state => state.projects;
  state = {
    value: 0
  };
  componentDidMount() {
    this.props.getBuyerOrders();
    this.props.getSellerOrders();
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };
  render() {
    const { value } = this.state;
    return (
      <React.Fragment>
        <Tabs value={this.state.value} onChange={this.handleChange}>
          <Tab
            icon={<i className="material-icons">work</i>}
            label="quotation"
          />
          <Tab
            icon={<i className="material-icons">receipt</i>}
            label="purchases"
          />
        </Tabs>
        {value === 0 && <ConsoleCard orders={this.props.seller} />}
        {value === 1 && <ConsoleCard orders={this.props.buyer} />}
      </React.Fragment>
    );
  }
}

export default connect(
  ConsoleTabs.mapStateToProps,
  ConsoleTabs.mapDispatchToProps
)(ConsoleTabs);
