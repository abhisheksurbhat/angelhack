import React, { Fragment } from "react";
import MaterialTable from "material-table";
import { Grid, Paper, Typography, CardHeader } from "@material-ui/core";
import "../styles.scss";

export default function(props) {
  let orders = [
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
  ];
  return (
    <Fragment>
      <Grid container spacing={16} style={{ padding: "10px" }}>
        {orders.map(order => {
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
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Fragment>
  );
}
