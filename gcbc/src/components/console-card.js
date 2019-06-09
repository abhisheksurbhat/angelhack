import React, { Fragment } from "react";
// import MaterialTable from "material-table";
import { Grid, Paper, Typography, CardHeader } from "@material-ui/core";
import "../styles.scss";

export default function(props) {
  return (
    <Fragment>
      <Grid container spacing={16} style={{ padding: "10px" }}>
        {props.orders.map(order => {
          const {
            customername: name,
            crop,
            qty: quantity,
            rate,
            location
          } = order;
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
