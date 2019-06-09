import React, { Fragment } from "react";
import { Grid, Paper, Typography, CardHeader } from "@material-ui/core";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { Formik, Form, Field } from "formik";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import "../styles.scss";

export default class ConsoleHomeCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDialog: false,
      data: null
    };
  }

  componentDidMount() {}

  enableDialog = () => {
    this.setState({ showDialog: true });
  };
  disableDialog = () => {
    this.setState({ showDialog: false });
  };

  handleSubmit = values => {
    console.log(values);
    //make axios call to post data.
  };

  makeContract = () => {
    console.log("Contract creation here");
  };

  render() {
    return (
      <Fragment>
        <Grid container spacing={16} style={{ padding: "10px" }}>
          {this.props.data.map(order => {
            const { customername, crop, qty, rate, location } = order;
            return (
              <Grid item md={12}>
                <Paper className="console-card">
                  {/* <Typography component="span" className="name">
                    {customername}
                  </Typography> */}
                  <Typography component="span" className="crop">
                    {crop}
                  </Typography>
                  <Typography component="span" className="quantity">
                    {qty}
                  </Typography>
                  <Typography component="span" className="rate">
                    {rate}
                  </Typography>
                  <Typography component="span" className="location">
                    {location}
                  </Typography>
                  {this.props.contract && (
                    <Typography component="span" className="overflow-handler">
                      <PopupState variant="popover" popupId="demo-popup-menu">
                        {popupState => (
                          <React.Fragment>
                            <i
                              className="material-icons"
                              {...bindTrigger(popupState)}
                            >
                              view_headline
                            </i>
                            <Menu {...bindMenu(popupState)}>
                              <MenuItem
                                onClick={() => {
                                  popupState.close();
                                  this.makeContract();
                                }}
                              >
                                Enter Contract
                              </MenuItem>
                            </Menu>
                          </React.Fragment>
                        )}
                      </PopupState>
                    </Typography>
                  )}
                </Paper>
              </Grid>
            );
          })}
        </Grid>
        <div className="add-bid" onClick={this.enableDialog}>
          <i className="material-icons">add</i>
        </div>
        <DialogOverlay
          style={{ background: "hsla(1,10%,10%,0.7)" }}
          onDismiss={this.disableDialog}
          isOpen={this.state.showDialog}
        >
          <DialogContent>
            <h3 className="form-heading">Enter Crop details</h3>
            <Formik
              initialValues={{ title: "", description: "" }}
              onSubmit={this.handleSubmit}
              render={({ values: FieldValues }) => (
                <Form className="bid-form">
                  <div>
                    <label className="field-label">
                      <h5>Enter the Crop Type*</h5>
                    </label>
                    <Field className="field-title" name="type" />
                  </div>
                  <div>
                    <label className="field-label">
                      <h5>Enter the quantity to sell</h5>
                    </label>
                    <Field className="field-title" name="qty" />
                  </div>
                  <div>
                    <label className="field-label">
                      <h5>Enter the rate at which you want to sell</h5>
                    </label>
                    <Field className="field-title" name="rate" />
                  </div>
                  <div>
                    <label className="field-label">
                      <h5>Enter your location</h5>
                    </label>
                    <Field className="field-title" name="location" />
                  </div>
                  <button className="project-button" type="submit">
                    Submit
                  </button>
                </Form>
              )}
            />
          </DialogContent>
        </DialogOverlay>
      </Fragment>
    );
  }
}
