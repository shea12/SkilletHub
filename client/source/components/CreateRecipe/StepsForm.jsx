import React from 'react';
import AddStep from './AddStep'; 

class StepsForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			steps: [],
			stepsCount: 1,
			newStep: []
		}; 
	}

	componentWillMount() {
		console.log('Steps Form is mounting!'); 
		this.setState({
			steps: [], 
			newStep: [{
				changed: true, 
				description: 'Placeholder',
				ingredients: [],
				position: null
			}]
		}); 
	}

	handleAddStep (step) {
		event.preventDefault(); 
		var steps = this.state.steps; 
		// console.log('Currents steps:', JSON.stringify(steps)); 
		// console.log('NEW STEP: ', step); 
		// steps[steps.length - 1] = step; 
		steps.push(step); 
		// console.log('Steps after change: ', steps); 
		// steps.push({
		// 		changed: true, 
		// 		description: 'Placeholder',
		// 		ingredients: []
		// 	}); 
		var stepsCount = this.state.stepsCount + 1; 
		this.setState({
			steps: steps,
			stepsCount: stepsCount
		}); 
		// console.log('Added a step!'); 
	}

	handleChange (event) {
	  // var inputType = event.target.className; 
	  // if (inputType === 'exerciseInput') {
	  // 	this.setState({exercise: event.target.value}); 
	  // } else if (inputType === 'warmupsInput') {
	  // 	this.setState({warmups: event.target.value}); 
	  // } else {
	  // 	this.setState({sets: event.target.value}); 
	  // }
	}

	render () {
		return (
			<div>
				<h3> Recipe Steps </h3>
				{this.state.steps.map((step) => (
					<div key={'enteredStep' + step.position}>
					  <h4> Step {step.position} </h4>
					  <h5> {step.description} </h5>
					  <h5> {step.ingredients.join(',')} </h5>
					</div>
				))}
				{this.state.newStep.map((step) => (
					<AddStep key={'step' + this.state.stepsCount} stepNumber={this.state.stepsCount} handleAddStep={this.handleAddStep.bind(this)} step={step}/>
				))}
			</div>
		); 
	}
}

export default StepsForm;