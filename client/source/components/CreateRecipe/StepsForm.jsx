import React from 'react';
import AddStep from './AddStep'; 

class StepsForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			steps: [],
			stepsCount: 1,
			newStep: [],
			availableIngredients: null
		}; 
	}

	// componentWillMount() {
		// console.log('Steps Form is mounting!'); 
		// var availableIngredients = this.props.availableIngredients; 
		// availableIngredients = availableIngredients.map((ingredient) => {
		// 	ingredient.name; 
		// });
		// console.log('Available ingredients from Steps Form: ', availableIngredients); 
		// this.setState({
		// 	steps: [], 
		// 	newStep: {
		// 		changed: true, 
		// 		description: 'Placeholder',
		// 		ingredients: [],
		// 		position: null
		// 	},
		// 	availableIngredients: availableIngredients
		// }); 
	// }

	componentWillReceiveProps() {
		console.log('Props are changing!'); 
	}

	componentWillUpdate() {
		// console.log('Component is updating!'); 
		// var availableIngredients = this.props.availableIngredients; 
		// availableIngredients = availableIngredients.map((ingredient) => {
		// 	return ingredient.name; 
		// });
		// console.log('Available ingredients from Steps Form: ', availableIngredients); 
		// this.setState({
		// 	availableIngredients: availableIngredients
		// }); 
	}

	handleAddStepForm (step) {
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
					  <h5> {step.ingredients} </h5>
					</div>
				))}
				<AddStep 
					key={'step' + this.state.stepsCount} 
					stepNumber={this.state.stepsCount} 
					handleAddStep={this.handleAddStepForm.bind(this)} 
					step={this.state.newStep}
					availableIngredients={this.props.availableIngredients}
				/>
			</div>
		); 
	}
}

export default StepsForm;