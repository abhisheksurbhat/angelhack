import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ProjectCardSmall from "./projects/project-card-small";
import ConsoleHomeCard from "./console-homecard";
import { actions } from "./projects/ducks";
import { connect } from "react-redux";

class ConsoleHomeTabs extends React.Component {
  static mapDispatchToProps = actions;
  static mapStateToProps = state => state.projects;
  state = {
    value: 0
  };
  componentDidMount() {
    this.props.getProjectsCount();
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
            label="my quotations"
          />
          <Tab
            icon={<i className="material-icons">receipt</i>}
            label="my purchases"
          />
        </Tabs>
        {value === 0 && <ProjectCardSmall type="quotations" />}
        {value === 1 && <ConsoleHomeCard type="purchases" />}
      </React.Fragment>
    );
  }
}

export default connect(
  ConsoleHomeTabs.mapStateToProps,
  ConsoleHomeTabs.mapDispatchToProps
)(ConsoleHomeTabs);
