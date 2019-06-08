import { FeedbackIcon, FeedbackThumb } from '../../assets';
import { State } from '../common/state-conatiner';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { ratings, questions } from './constants';
import './styles.scss';
import { actions } from '../projects/ducks';
import { connect } from 'react-redux';
import classnames from 'classnames';

class FeedbackModal extends React.Component {
	state = {
		projectId: this.props.match.params.projectId,
		customer_id: this.props.match.params.customer_id,
		reseller_id: this.props.match.params.reseller_id
	};

	static mapDispatchToProps = actions;

	constructor(props) {
		super(props);
		this.state = { ...this.state, selectedValue: null };
	}

	getRating = (val) => {
		this.setState({ selectedValue: parseInt(val) });
	};

	render() {
		const q1 = questions[0];
		const q2 = questions[1];
		const showQ1 = q1.split(',');
		const { projectId, customer_id, reseller_id } = this.state;
		debugger;
		return (
			<Modal dialogClassName="feedback-modal" backdrop={false} show keyboard data-testid="feedback-modal">
				<Modal.Body>
					<State
						initial={{
							step: 0
						}}
						render={(state, setState) => (
							<React.Fragment>
								{state.step === 0 && (
									<div className="feedback-step-one">
										<div className="feedback-icon">
											<img src={FeedbackIcon} alt="feedback" />
										</div>
										<div className="feedback-step-note">
											Tell us your experience with our services throughout the project lifecycle
										</div>
										<Formik
											enableReinitialize
											initialValues={{
												ratings: [],
												suggestion: ''
											}}
											onSubmit={(values) => {
												const { suggestion } = values;
												const rating = this.state.selectedValue;
												setTimeout(
													() =>
														this.props.postFeedback({
															rating,
															remarks: suggestion,
															projectId,
															customer_id,
															reseller_id
														}),
													2000
												);
												setState({ step: 1 });
											}}
											render={({ values }) => (
												<Form>
													<div className="feedback-radio-button-wrap">
														<div>
															<div className="question">{showQ1[0]},</div>
															<div className="question">{showQ1[1]}</div>
															<br />
															<div className="star-wrapper">
																<div className="star-text">Poor</div>
																{ratings.map((rating) => (
																	<React.Fragment key={rating}>
																		<div>
																			<label
																				htmlFor={`radio-${rating}`}
																				onClick={this.getRating.bind(
																					this,
																					rating
																				)}
																				className={classnames('star', {
																					belowchecked:
																						rating <=
																						this.state.selectedValue
																				})}
																				value={rating}
																			/>
																			<input
																				id={`radio-${rating}`}
																				className="hide"
																				type="radio"
																				name="rating"
																			/>
																		</div>
																	</React.Fragment>
																))}
																<div className="star-text">Excellent</div>
															</div>
														</div>
														<div>
															<span className="question">{q2}</span> <br />
															<label className="suggestion">
																<Field
																	component="textarea"
																	className="reason"
																	name="suggestion"
																/>
															</label>
														</div>
														<div className="feedback-actions">
															<button type="submit">SUBMIT MY FEEDBACK</button>
														</div>
													</div>
												</Form>
											)}
										/>
									</div>
								)}
								{state.step === 1 && (
									<div className="feedback-step-two">
										<div className="feedback-section">
											<div className="feedback-icon">
												<img src={FeedbackThumb} alt="feedback-success" />
											</div>
											<div className="feedback-success-text">Thank you for the feedback</div>
										</div>
									</div>
								)}
							</React.Fragment>
						)}
					/>
				</Modal.Body>
				<Modal.Footer />
			</Modal>
		);
	}
}

export default connect(null, FeedbackModal.mapDispatchToProps)(FeedbackModal);
