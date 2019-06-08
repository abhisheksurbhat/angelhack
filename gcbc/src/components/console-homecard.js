import React, { Fragment } from "react";
import { Grid, Paper, Typography, CardHeader } from "@material-ui/core";
import { DialogOverlay, DialogContent } from '@reach/dialog';
import { Formik, Form, Field } from 'formik';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import "../styles.scss";

export default class ConsoleHomeCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    orders : [
    {
      name: "kaushik Iyer",
      crop: "corn",
      quantity: 100,
      rate: 12.5,
      location: "karnataka"
    },
    {
      name: "abhishek surbhat",
      crop: "apple",
      quantity: 120,
      rate: 100.5,
      location: "kashmir"
    },
    {
      name: "Abhilash",
      crop: "coconut",
      quantity: 135,
      rate: 32.5,
      location: "kerala"
    },
    {
      name: "kaushik Iyer",
      crop: "corn",
      quantity: 100,
      rate: 12.5,
      location: "karnataka"
    },
    {
      name: "abhishek surbhat",
      crop: "apple",
      quantity: 120,
      rate: 100.5,
      location: "kashmir"
    },
    {
      name: "Abhilash",
      crop: "coconut",
      quantity: 135,
      rate: 32.5,
      location: "kerala"
    },
    {
      name: "kaushik Iyer",
      crop: "corn",
      quantity: 100,
      rate: 12.5,
      location: "karnataka"
    },
    {
      name: "abhishek surbhat",
      crop: "apple",
      quantity: 120,
      rate: 100.5,
      location: "kashmir"
    },
    {
      name: "Abhilash",
      crop: "coconut",
      quantity: 135,
      rate: 32.5,
      location: "kerala"
    },
    {
      name: "kaushik Iyer",
      crop: "corn",
      quantity: 100,
      rate: 12.5,
      location: "karnataka"
    },
    {
      name: "abhishek surbhat",
      crop: "apple",
      quantity: 120,
      rate: 100.5,
      location: "kashmir"
    },
    {
      name: "Abhilash",
      crop: "coconut",
      quantity: 135,
      rate: 32.5,
      location: "kerala"
    },
    {
      name: "kaushik Iyer",
      crop: "corn",
      quantity: 100,
      rate: 12.5,
      location: "karnataka"
    },
    {
      name: "abhishek surbhat",
      crop: "apple",
      quantity: 120,
      rate: 100.5,
      location: "kashmir"
    },
    {
      name: "Abhilash",
      crop: "coconut",
      quantity: 135,
      rate: 32.5,
      location: "kerala"
    }
  ],
  showDialog: false
  };
}

  enableDialog = () => {
    this.setState({ showDialog: true });
  }
  disableDialog = () => {
    this.setState({ showDialog: false });
  };

  render () {

    return (
    <Fragment>
      <Grid container spacing={16} style={{ padding: "10px" }}>
        {this.state.orders.map(order => {
          const { name, crop, quantity, rate, location } = order;
          return (
            <Grid item md={12}>
              <Paper className="console-card">
                <Typography component="span" className="name">
                  {name}
                </Typography>
                <Typography component="span" className="crop">
                  {crop}
                </Typography>
                <Typography component="span" className="quantity">
                  {quantity}
                </Typography>
                <Typography component="span" className="rate">
                  {rate}
                </Typography>
                <Typography component="span" className="location">
                  {location}
                </Typography>
                <Typography component="span" className="overflow-handler">
                  <PopupState variant="popover" popupId="demo-popup-menu">
      {popupState => (
        <React.Fragment>
          <i className="material-icons" {...bindTrigger(popupState)}>
            view_headline
          </i>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>Enter Contract</MenuItem>
            <MenuItem onClick={popupState.close}>Second Filler button</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
                </Typography>
              </Paper>
            </Grid>
          );
        })}

          
      </Grid>
      <div className="add-bid" onClick={this.enableDialog}>
            <i className="material-icons">add</i>
      </div>
      <DialogOverlay
          style={{ background: 'hsla(1,10%,10%,0.7)' }}
          onDismiss={this.disableDialog}
          isOpen={this.state.showDialog}
        >
          <DialogContent>
            <h3 className="form-heading">Enter Crop details</h3>
            <Formik
              initialValues={{ title: '', description: '' }}
              onSubmit={this.handleSubmit}
              render={({ values: FieldValues }) => (
                <Form className="bid-form">
                  <div>
                    <label className="field-label">
                      <h5>Enter the Crop Type*</h5>
                    </label>
                    <Field className="field-title" name="title" />
                  </div>
                  <div>
                    <label className="field-label">
                      <h5>Enter the quantity to sell</h5>
                    </label>
                    <Field className="field-title" name="description" />
                  </div>
                  <div>
                    <label className="field-label">
                      <h5>Enter the rate at which you want to sell</h5>
                    </label>
                    <Field className="field-title" name="description" />
                  </div>
                  <div>
                    <label className="field-label">
                      <h5>Enter your location</h5>
                    </label>
                    <Field className="field-title" name="description" />
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
  )

  }
}
