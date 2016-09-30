import React from 'react';

//Bootstrap 
import { Grid, Row, Col, Form, FormGroup, FormControl, Button, Container, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap';

var units = ['select unit', 'tsp.', 'tbsp.', 'fl.oz.', 'cup', 'pt.', 'qt.', 'gal.', 'g', 'kg', 'oz.', 'lbs', 'whole']; 
const headers = ['Ingredient', 'Quantity', 'Unit', 'Preparation', 'Notes']; 
const headerWidth = [2, 1, 1, 2, 2]; 

import meatloafRecipe from '../../../../meatloafRecipe'

class EditIngredient extends React.Component {
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
			position: null,
			ingredients: null
		}; 
	}

	componentWillMount(){
		var meatloafIngredients = meatloafRecipe.ingredients; 
		this.setState({
			ingredients: meatloafIngredients
		}); 
	}

	handleClick (event) {
		event.preventDefault(); 
		var newIngredient = this.state; 
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
			<Grid>
			<Row> 
			{headers.map((header, i) => (
				<Col xs={2} md={2} style={{margin: 5}}>
					<h4> {header} </h4> 
				</Col> 
			))}
			</Row>
			{this.state.ingredients.map((ingredient) => (
				<Row> 
				<Form inline >
				<Col xs={2} md={2} style={{margin: 5}}>
				  <FormGroup controlId="Ingredient">
				    <FormControl type="text" placeholder={ingredient.name} />
				  </FormGroup>
				</Col>
				<Col xs={2} md={2} style={{margin: 5}}>
				  <FormGroup controlId="Quantity">
				    <FormControl type="number" placeholder={ingredient.amount} disabled/>
				  </FormGroup>
				</Col>
				<Col xs={2} md={2} style={{margin: 5}}>
				  <FormGroup controlId="Unit">
				    <FormControl type="text" placeholder={ingredient.unit} disabled/>
				  </FormGroup>
				</Col>
				<Col xs={2} md={2} style={{margin: 5}}>
				  <FormGroup controlId="Prep">
				    <FormControl type="text" placeholder={ingredient.prep || ''} />
				  </FormGroup>
				</Col>
				<Col xs={2} md={2} style={{margin: 5}}>
				  <FormGroup controlId="Optional">
				    <FormControl type="text" placeholder={ingredient.optional || ''} />
				  </FormGroup>
				</Col> 
				  <Button type="submit" style={{margin: 5}}>
				    Edit
				  </Button>
				</Form>
				</Row>
			))}
			</Grid>
		); 	
	}
}

export default EditIngredient;

			// {headers.map((header, i) => (
			// 	<Col xs={headerWidth[i]} md={headerWidth[i]} style={{margin: 5}}>
			// 		<h4> {header} </h4> 
			// 	</Col> 
			// ))}