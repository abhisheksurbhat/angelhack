import React, { Component, Fragment } from "react";
import { actions } from "./ducks";
import { connect } from "react-redux";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { Paper, Typography, Grid, Chip, Button } from "@material-ui/core";
import BidModal from "./bid-modal";
import { Link } from "react-router-dom";

class BigProject extends Component {
  state = {
    showBidModal: false,
    currentProjectId: -1,
    currentProjectTitle: ""
  };

  disableShowModal() {
    this.setState({ showBidModal: false });
  }

  componentDidMount() {
    const user = process.env.REACT_APP_USER;
    user === "reseller"
      ? this.props.getBidForResellers({ type: "bid" })
      : this.props.getBidProjects({ type: "bid" });
  }

  render() {
    const { bid = [], resellerBid = [] } = this.props;
    const currentBid =
      process.env.REACT_APP_USER === "customer" ? bid : resellerBid;
    return (
      <Fragment>
        <Grid container spacing={16}>
          {currentBid.map(project => {
            const { id, name, description, suggestions = [] } = project;
            return (
              <Grid item md={12}>
                <Paper style={{ width: "99%" }}>
                  <Grid container>
                    <Grid item md={10} style={{ padding: "10px" }}>
                      {process.env.REACT_APP_USER === "customer" ? (
                        <Link to={`/bid-view/${id}`}>
                          <Typography variant="h5">{name}</Typography>
                        </Link>
                      ) : (
                        <Typography variant="h5">{name}</Typography>
                      )}
                      <Typography variant="subtitle2">{description}</Typography>
                      {suggestions.map(suggestion => {
                        return (
                          <Chip
                            key={suggestion}
                            label={suggestion}
                            variant="outlined"
                            style={{ marginRight: "10px", marginTop: "5px" }}
                          />
                        );
                      })}
                    </Grid>
                    <Grid item md={2}>
                      {process.env.REACT_APP_USER === "reseller" && (
                        <Grid item md={2}>
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={_ =>
                              this.setState({
                                showBidModal: true,
                                currentProjectId: id,
                                currentProjectTitle: name
                              })
                            }
                            style={{
                              paddingLeft: "10px",
                              width: "7vw",
                              left: "30px",
                              marginTop: "50%",
                              position: "relative"
                            }}
                          >
                            Place Bid
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
        <Dialog
          onDismiss={_ => this.setState({ showBidModal: false })}
          isOpen={this.state.showBidModal}
        >
          <BidModal
            id={this.state.currentProjectId}
            name={this.state.currentProjectTitle}
            disableShowModal={this.disableShowModal.bind(this)}
          />
        </Dialog>
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
)(BigProject);
