import React, { Component, Fragment } from "react";
import { actions } from "./ducks";
import { connect } from "react-redux";
import {
  Typography,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Button
} from "@material-ui/core";
import { Link } from "react-router-dom";
import ProjectStepper from "./stepper";
class SmallProject extends Component {
  componentDidMount() {
    const { type } = this.props;
    type === "active" && this.props.getActiveProjects({ type });
    type === "completed" && this.props.getCompletedProjects({ type });
  }

  render() {
    const { type, active = [], completed = [] } = this.props;
    const renderProjects = type === "active" ? active : completed;
    return (
      <Fragment>
        <Grid container spacing={16} style={{ padding: "10px" }}>
          {renderProjects.map(project => {
            const {
              id,
              name,
              description,
              customer_id,
              reseller_id,
              phase = 0
            } = project;
            console.log("PROJCT propos", id, phase, this.props);
            return (
              <Grid item key={id} md={12}>
                <Card>
                  <CardHeader
                    title={name}
                    action={
                      <Link
                        to={`/${id}/chat`}
                        target={"_blank"}
                        style={{ color: "#f50057" }}
                      >
                        <i className="material-icons">chat_bubble_outline</i>
                      </Link>
                    }
                  />
                  <CardContent>
                    <Typography component="p">{description}</Typography>
                    {type === "completed" && (
                      <Link
                        to={`/feedback/${id}/${customer_id}/${reseller_id}`}
                        className="rating"
                      >
                        Give Feedback
                      </Link>
                    )}
                    {process.env.REACT_APP_USER === "customer" &&
                      type === "active" && (
                        <Fragment>
                          <ProjectStepper
                            projectId={id}
                            currentStep={phase}
                            tyle={{ marginTop: "10px", padding: "4px 8px" }}
                          />
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() =>
                              this.props.markProjectAsCompleted({
                                projectId: id,
                                status: "completed"
                              })
                            }
                            style={{ marginTop: "10px", padding: "4px 8px" }}
                          >
                            Mark as Completed
                          </Button>
                        </Fragment>
                      )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return state.projects;
}

export default connect(
  mapStateToProps,
  actions
)(SmallProject);
