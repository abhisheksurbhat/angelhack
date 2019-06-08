import React, { Component, Fragment} from "react";
import { actions, actionType } from "./ducks";
import { connect } from "react-redux";
import {Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import {Paper, Typography, Grid, Chip, Button, Card, CardHeader, CardContent, IconButton, CardActions, TextField, FormControl} from "@material-ui/core";
import Snitch from "../../snitch";
import isSuccess from "../../utils";

class BidViewPage extends Component{

    state = {
        projectId: this.props.match.params.projectId
    };

    componentDidMount() {
        this.props.getProjectById({projectId: this.state.projectId});
        this.props.getBidsByProjectId({projectId: this.state.projectId});
	}
ç
    render() {
        const {bids, name, status, description} = this.props.projects.project;
        let activeBid = bids.find(bid => bid.status === "active")

        return (
            <Fragment>
                <Snitch
					opensOn = {isSuccess(actionType.ACCEPT_BID)}
					render={({ show, open, close }, triggerAction) => {
									setTimeout(close, 5000);
									return ( show && <div>This project has been moved to Dashboard</div>);
							
							}
					}
			/>
                <Paper style={{padding: "15px"}}>
                <Typography variant="h4">
                    {name}
                </Typography>
                <Typography variant="subtitle1">
                    {description}
                </Typography>
                <br/>
                <Typography variant="h5">
                    Bids:
                </Typography>
                <Grid container spacing={32} style={{marginTop: "15px"}}>
                    {
                        bids.map((bid, index) => {
                            return (
                            <Grid item key={bid.id}>
                                <Card>
                                    <CardHeader>
                                        Bid {index+1}
                                    </CardHeader>
                                    <CardContent>
                                    <b>Amount :</b> {bid.amount} <br />
                                    <b>Project Duration :</b> {bid.time} Days <br />
                                    <b>Remarks :</b> {bid.remarks} <br />
                                    <b>Reseller Rating : </b> {bid.rating} <br />
                                    <b>Reseller Name : {bid.name}</b>
                                    </CardContent> 
                                    <Button disabled={activeBid === undefined ? false : true} variant="outlined" color="secondary" style={{marginLeft: "5%", marginBottom: "5%"}} onClick={()=>{this.props.acceptBid({status: "active", bidId: bid.id, projectId: Number(this.state.projectId)})}}>
                                        {activeBid === undefined ? "Accept Bid" : bid.id === activeBid.id ? "Accepted" : "Accept Bid"}
                                    </Button>
                                </Card>
                            </Grid>);
                        })
                    }
                </Grid>
            </Paper>
            </Fragment>
            
        );
    }
}

function mapStateToProps(state) {
	return { projects: state.projects };
}

export default connect(mapStateToProps, actions)(BidViewPage);
