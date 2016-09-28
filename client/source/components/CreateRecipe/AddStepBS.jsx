import React from 'react';

//Bootstrap 
import { Grid, Row, Col, FormGroup, FormControl, Button, Jumbotron, Carousel, Container, ControlLabel } from 'react-bootstrap';

var timeParse = function(string) {
	var match = []; 
	timesRegEx.forEach((timeRegEx) => {
		var time = timeRegEx.exec(string); 
		if (time) {
			// console.log(time); 
			match.push(time); 
		} 
	});
	return match; 
}

var times = [/\d*\smin/, 'hour', 'second', 'hr', 'sec', 'min']; 
var timesRegEx = [/\d+\s?sec/, /\d+\s?min/, /\d+\s?hr/, /\d+\s?hour/]; 
// var timesRegEx = times.map((time) => { return new RegExp(\d*\stime, 'i')}); 

class AddStep extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			changed: true, 
			description: '',
			ingredients: [],
			parsedIngredients: [], 
			position: null,
			time: '',
			stepTime: null
		}; 
	}

	componentWillMount(){
		this.setState({
			changed: this.props.step.changed, 
			position: this.props.stepNumber
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
	  	// console.log(availableIngredients); 
	  	var parsedIngredients = this.state.parsedIngredients; 
	  	var description = event.target.value; 
	  	// console.log('Description: ', description); 
	  	availableIngredients.forEach((ingredient) => {
	  		var regEx = RegExp(ingredient, 'i');
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
	  	var time = timeParse(description); 
	  	// console.log('TIME IS: ', time); 
	  	var stepTime = this.state.stepTime; 
	  	if (time && !stepTime) {
	  		console.log('SETTING TIME: ', time); 
	  		this.setState({
	  			stepTime: time[0]
	  		}); 
	  	}
	  } else if (inputType === 'ingredients') {
	  	var ingredients = event.target.value.split(','); 
	  	this.setState({ingredients: ingredients}); 
	  } 
	}

	render () {
		return (
			<Grid>
			<form onSubmit={this.handleClick.bind(this)}>
			<Row className="show-grid">
			  <Col xs={6} md={6}> 
			  		<FormGroup>
			        <ControlLabel> Step Description </ControlLabel>
			        <FormControl type="text" id="description" onChange={this.handleChange.bind(this)} value={this.state.description} />
			        </FormGroup>
			  </Col>
			  <Col xs={6} md={6}> 
			  		<FormGroup>
			        <ControlLabel> Ingredients </ControlLabel>
			        <FormControl type="text" id="ingredients" onChange={this.handleChange.bind(this)} value={this.state.ingredients} />
			        </FormGroup>
			  </Col>
			</Row>
			<div>
				<button style={{display: "none"}} onClick={this.handleClick.bind(this)}> Next Step </button> 
			</div>
			</form>
			</Grid>
		); 
	}
}

export default AddStep;


			// <div> 
			// 	<h4> Parsed Ingredient List: </h4>
			// 	<h4> {JSON.stringify(this.state.parsedIngredients)} </h4>
			// </div>