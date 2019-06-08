import React, { Component, Fragment } from "react";
import { actions, actionType } from "./ducks";
import { connect } from "react-redux";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { Step, Stepper, StepLabel, Paper, Button } from "@material-ui/core";
import Snitch from "../../snitch";
import isSuccess from "../../utils";

class ProjectStepper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: props.currentStep,
      steps: [
        "Brain Storming",
        "Mocks",
        "Prototype",
        "Beta Release",
        "Alpha Release",
        "Done"
      ]
    };
  }

  componentDidMount() {}

  render() {
    return (
      <Fragment>
        <Stepper
          activeStep={this.props.currentStep}
          alternativeLabel
          orientation="horizontal"
        >
          {this.state.steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {this.props.currentStep === 5 || (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() =>
              this.props.setProjectNextState({
                projectId: this.props.projectId,
                currentStep: this.props.currentStep
              })
            }
            style={{
              marginTop: "10px",
              padding: "4px 8px",
              marginRight: "8px"
            }}
          >
            PrOcEeD To NeXt PhAsE
          </Button>
        )}
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return { projects: state.projects };
}

export default connect(
  mapStateToProps,
  actions
)(ProjectStepper);
