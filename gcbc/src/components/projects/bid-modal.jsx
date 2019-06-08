import React, { Component, Fragment } from 'react';
import { actions, actionType } from './ducks';
import { connect } from 'react-redux';
import {
	Paper,
	Typography,
	Grid,
	Chip,
	Button,
	Card,
	CardHeader,
	CardContent,
	IconButton,
	CardActions,
	TextField,
	FormControl
} from '@material-ui/core';
import Snitch from '../../snitch';
import isSuccess from '../../utils';

class BidModal extends Component {
	constructor(props) {
		super(props);
		console.log('Constructor', props);
		this.state = {
			amount: 0,
			time: 0,
			remarks: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmitBid = this.handleSubmitBid.bind(this);
	}

	handleChange(event) {
		let id = event.target.id;
		let value = event.target.value;
		this.setState({
			[id]: value
		});
	}

	handleSubmitBid(event) {
		this.props.disableShowModal();
		this.props.submitBid({
			...this.state,
			amount: Number(this.state.amount),
			time: Number(this.state.time),
			projectId: this.props.id,
			resellerId: this.props.projects.resellerId,
			status: 'inactive'
		});
	}

	render() {
		return (
			<Fragment>
				<Card style={{ width: '50%' }}>
					<CardHeader title={this.props.name} />
					<CardContent>
						<TextField
							id="amount"
							label="Amount"
							onChange={this.handleChange}
							value={this.state.amount}
							type="number"
						/>
						<br />
						<TextField
							id="time"
							label="Project Duration(Days)"
							onChange={this.handleChange}
							value={this.state.time}
							type="number"
						/>
						<br />
						<FormControl fullWidth>
							<TextField
								id="remarks"
								label="remarks"
								onChange={this.handleChange}
								value={this.state.remarks}
							/>
						</FormControl>
						<br />
						<Button
							variant="contained"
							color="primary"
							style={{ marginTop: '15px' }}
							onClick={this.handleSubmitBid}
						>
							Submit Bid
						</Button>
					</CardContent>
				</Card>
			</Fragment>
		);
	}
}

function mapStateToProps(state) {
	return { projects: state.projects };
}

export default connect(mapStateToProps, actions)(BidModal);
