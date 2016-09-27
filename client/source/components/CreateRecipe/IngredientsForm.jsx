import React from 'react';

class StepsForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			changed: true, 
			description: '',
			ingredients: []
		}; 
	}

	handleSubmit (event) {
		event.preventDefault(); 
		this.props.handleAddStep(this.state);
		var next = this.state.count; 
		next++; 
		this.setState({
			exercise: 'Enter exercise name',
			warmups: 0, 
			sets: 0,  
			count: next, 
		});
	}

	handleChange (event) {
	  var inputType = event.target.className; 
	  if (inputType === 'exerciseInput') {
	  	this.setState({exercise: event.target.value}); 
	  } else if (inputType === 'warmupsInput') {
	  	this.setState({warmups: event.target.value}); 
	  } else {
	  	this.setState({sets: event.target.value}); 
	  }
	}

	render () {
		return (
			<div className="row">
			  <div className="input-field col s12">
			    <textarea id="description" className="materialize-textarea"></textarea>
			    <label htmlFor="description">Step Description</label>
			  </div>
			</div>
		); 
	}
}

export default StepsForm;