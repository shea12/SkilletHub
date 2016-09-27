import React from 'react';

class AddIngredient extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			changed: true, 
			name: '',
			amount: '', 
			unit: '',
			prep: '', 
			optional: '', 
			type: null,
			position: null
		}; 
	}

	componentWillMount(){
		console.log('THIS PROPS NUMBER: ', this.props.number); 
		this.setState({
			position: this.props.number
		}); 
	}

	handleClick (event) {
		event.preventDefault(); 
		// console.log('Registering click handler!'); 
		var newIngredient = this.state; 
		// console.log('Add Step Components State', newStep); 
		this.props.handleAddIngredient(newIngredient);
	}

	handleChange (event) {
	  var inputType = event.target.id; 
	  if (inputType === 'name') {
	  	this.setState({name: event.target.value}); 
	  } else if (inputType === 'amount') {
	  	this.setState({amount: event.target.value}); 
	  } else if (inputType === 'unit') {
	  	this.setState({unit: event.target.value}); 
	  } else if (inputType === 'prep') {
	  	this.setState({prep: event.target.value}); 
	  } else if (inputType === 'optional') {
	  	this.setState({optional: event.target.value}); 
	  } 
	}

	render () {
		return (
			<div>
				<div className="row">
					<div className="input-field col s4">
					  <input placeholder={this.state.ingredients} id="name" type="text" className="validate" onChange={this.handleChange.bind(this)}/>
					  <label htmlFor="servings">Ingredient</label>
					</div>
					<div className="input-field col s4">
					  <input id="amount" type="text" className="validate" onChange={this.handleChange.bind(this)}/>
					  <label htmlFor="servings">Amount</label>
					</div>
					<div className="input-field col s4">
					  <input id="unit" type="text" className="validate" onChange={this.handleChange.bind(this)}/>
					  <label htmlFor="servings">Unit</label>
					</div>
				</div>
				<div className="row">
					<div className="input-field col s6">
					  <input placeholder='Preparation' id="prep" type="text" className="validate" onChange={this.handleChange.bind(this)}/>
					  <label htmlFor="servings">Preparation</label>
					</div>
					<div className="input-field col s6">
					  <input placeholder='Additional Notes' id="optional" type="text" className="validate" onChange={this.handleChange.bind(this)}/>
					  <label htmlFor="servings">Notes</label>
					</div>
				</div>
				<button onClick={this.handleClick.bind(this)}> Next Step </button> 
			</div>
		); 
	}
}

export default AddIngredient;