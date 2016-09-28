import React from 'react';

//Bootstrap 
import { Grid, Row, Col, FormGroup, FormControl, Button, Jumbotron, Carousel, Container, ControlLabel } from 'react-bootstrap';

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
	  // if (inputType === 'description') {
	  // 	this.setState({ description: event.target.value}); 
	  // } else if (inputType === 'ingredients') {
	  // 	var ingredients = event.target.value.split(','); 
	  // 	this.setState({ingredients: ingredients}); 
	  // } 
	  if (inputType === 'description') {
	  	var availableIngredients = this.props.availableIngredients; 
	  	console.log(availableIngredients); 
	  	var parsedIngredients = this.state.parsedIngredients; 
	  	var description = event.target.value; 
	  	availableIngredients.forEach((ingredient) => {
	  		var regEx = RegExp(ingredient);
	  		var parsedIngredient = regEx.exec(description); 
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
			<div> 
				<h4> Parsed Ingredient List: </h4>
				<h4> {JSON.stringify(this.state.parsedIngredients)} </h4>
			</div>
			</Grid>
		); 
	}
}

export default AddStep;