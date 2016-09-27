import React from 'react';

class AddStep extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			changed: true, 
			description: '',
			ingredients: [],
			parsedIngredients: [], 
			position: null
		}; 
	}

	componentWillMount(){
		this.setState({
			changed: this.props.step.changed, 
			description: this.props.step.description,
			ingredients: this.props.step.ingredients,
			position: this.props.stepNumber
			// availableIngredients: this.props.availableIngredients
		}); 
	}

	handleClick (event) {
		event.preventDefault(); 
		var newStep = this.state
		this.props.handleAddStep(this.state);
	}

	handleChange (event) {
	  var inputType = event.target.id; 
	  if (inputType === 'description') {
	  	var availableIngredients = this.props.availableIngredients; 
	  	var parsedIngredients = this.state.parsedIngredients; 
	  	var description = event.target.value; 
	  	availableIngredients.forEach((ingredient) => {
	  		var regEx = RegExp(ingredient);
	  		var parsedIngredient = regEx.exec(description); 
	  		// console.log(parsedIngredient); 
	  		if (parsedIngredient && parsedIngredients.indexOf(parsedIngredient[0]) === -1) {
	  			console.log('Matched an ingredient: ', parsedIngredient); 
	  			parsedIngredients.push(parsedIngredient[0])
	  		}
	  	});
	  	this.setState({
	  		description: event.target.value,
	  		parsedIngredients: parsedIngredients
	  	}); 
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
					  <input id="ingredients" type="text" className="validate" onChange={this.handleChange.bind(this)}/>
					  <label htmlFor="servings">Ingredients</label>
					</div>
				</div>
				<div> 
					<h4> Parsed Ingredient List: </h4>
					<h4> {this.state.parsedIngredients} </h4>
				<button onClick={this.handleClick.bind(this)}> Next Step </button> 
				</div>
			</div>
		); 
	}
}

export default AddStep;