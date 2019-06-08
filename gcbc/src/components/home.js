import React from 'react';
import ProjectCardBig from './projects/project-card-big';
import { actions, actionType } from './projects/ducks';
import { connect } from 'react-redux';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import '@reach/dialog/styles.css';
import { Formik, Form, Field } from 'formik';
import Snitch from '../snitch';
import isSuccess from '../utils';
class Home extends React.Component {
	state = {
		showDialog: false,
		user: process.env.REACT_APP_USER
	};
	enableDialog = () => {
		this.setState({ showDialog: true });
	};
	disableDialog = () => {
		this.setState({ showDialog: false });
	};

  handleSubmit = values => {
    this.disableDialog();
    this.props.addProject(values);
  };

	static mapDispatchToProps = actions;
	render() {
		const { showDialog, user } = this.state;
		return (
			<React.Fragment>
				<Snitch
						opensOn = {isSuccess(actionType.SUBMIT_BID)}
						render={({ show, open, close }, triggerAction) => {
										setTimeout(close, 5000);
										return ( show && <div>Bid submitted successfully</div>);
								
								}
						}
				/>
				<ProjectCardBig />
				{user === 'customer' && (
					<div className="add-bid" onClick={this.enableDialog}>
						<i className="material-icons">add</i>
					</div>
				)}
				<DialogOverlay
					style={{ background: 'hsla(1,10%,10%,0.7)' }}
					onDismiss={this.disableDialog}
					isOpen={showDialog}
				>
					<DialogContent>
						<h3 className="form-heading">Create Project Requirement</h3>
						<Formik
							initialValues={{ title: '', description: '' }}
							onSubmit={this.handleSubmit}
							render={({ values: FieldValues }) => (
								<Form className="bid-form">
									<div>
										<label className="field-label">
											<h5>Enter Project Title*</h5>
										</label>
										<Field className="field-title" name="title" />
									</div>
									<div>
										<label className="field-label">
											<h5>Please Give Description*</h5>
										</label>
										<Field component="textarea" className="field-description" name="description" />
									</div>
									<button className="project-button" type="submit">
										Submit
									</button>
								</Form>
							)}
						/>
					</DialogContent>
				</DialogOverlay>
			</React.Fragment>
		);
	}
}

export default connect(null, Home.mapDispatchToProps)(Home);
