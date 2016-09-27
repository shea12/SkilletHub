import React from 'react';

class AddStep extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			changed: true, 
			description: '',
			ingredients: [],
			position: null
		}; 
	}

	componentWillMount(){
		this.setState({
			changed: this.props.step.changed, 
			description: this.props.step.description,
			ingredients: this.props.step.ingredients,
			position: this.props.stepNumber
		}); 
	}

	handleClick (event) {
		event.preventDefault(); 
		console.log('Registering click handler!'); 
		var newStep = this.state
		console.log('Add Step Components State', newStep); 
		this.props.handleAddStep(this.state);
	}

	handleChange (event) {
	  var inputType = event.target.id; 
	  if (inputType === 'description') {
	  	this.setState({description: event.target.value}); 
	  } else if (inputType === 'ingredients') {
	  	var ingredients = event.target.value.split(','); 
	  	this.setState({ingredients: ingredients}); 
	  } 
	}

	render () {
		return (
			<div>
				<div className="row">
				  <div className="input-field col s12">
				    <textarea id="description" className="materialize-textarea" onChange={this.handleChange.bind(this)}></textarea>
				    <label htmlFor="description"> {this.props.stepNumber} Step Description</label>
				  </div>
				</div>
				<div className="row">
					<div className="input-field col s12">
					  <input placeholder={this.state.ingredients} id="ingredients" type="text" className="validate" onChange={this.handleChange.bind(this)}/>
					  <label htmlFor="servings">Ingredients</label>
					</div>
				</div>
				<button onClick={this.handleClick.bind(this)}> Next Step </button> 
			</div>
		); 
	}
}

export default AddStep;