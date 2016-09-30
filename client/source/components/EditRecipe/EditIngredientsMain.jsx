import React from 'react';
import EditIngredientEntry from './EditIngredientEntry'; 
import AddIngredientEntry from './AddIngredientEntry'; 

//Bootstrap 
import { Grid, Row, Col, Form, FormGroup, FormControl, Button, Container, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap';

const units = ['select unit', 'tsp.', 'tbsp.', 'fl.oz.', 'cup', 'pt.', 'qt.', 'gal.', 'g', 'kg', 'oz.', 'lbs', 'whole']; 
const headers = [['Ingredient', 2], ['Quantity', 2], ['Unit', 1], ['Preparation', 2], ['Notes', 2]]; 

import meatloafRecipe from '../../../../meatloafRecipe'

class EditIngredientsMain extends React.Component {
	constructor(props) {
		super(props);
	}

	// componentWillMount(){
	// 	var meatloafIngredients = meatloafRecipe.ingredients; 
	// 	this.setState({
	// 		ingredients: this.props.ingredients,
	// 		ingredientsCount: meatloafIngredients.length
	// 	}); 
	// }

	// componentWillReceiveProps(){
	// 	// console.log('COMPONENT RECEIVING PROPS!'); 
	// 	// console.log(this.props.ingredients.length); 
	// 	// this.setState({
	// 	// 	ingredients: this.props.ingredients
	// 	// }); 
	// }

	// handleChange (event) {
	//   var inputType = event.target.id; 
	//   if (inputType === 'name') {
	//   	this.setState({name: event.target.value}); 
	//   } else if (inputType === 'amount') {
	//   	this.setState({amount: event.target.value}); 
	//   } else if (inputType === 'unit') {
	//   	this.setState({unit: event.target.value}); 
	//   } else if (inputType === 'prep') {
	//   	this.setState({prep: event.target.value}); 
	//   } else if (inputType === 'optional') {
	//   	this.setState({optional: event.target.value}); 
	//   } 
	// }

	// handleDeleteIngredient(ingredient) {
	// 	console.log("Ingredients Main: Delete ingredient!"); 
	// 	this.props.handleDeleteIngredient(ingredient); 
	// 	// var deletedIngredient = ingredient.name; 
	// 	// var ingredients = this.state.ingredients;
	// 	// var index = 0; 
	// 	// // Search based on ingredient name
	// 	// ingredients.forEach((ingredient, i) => {
	// 	//   if (ingredient.name === deletedIngredient) {
	// 	//     console.log(ingredient.name);
	// 	//     console.log(deletedIngredient); 
	// 	//     console.log(i); 
	// 	//     index = i; 
	// 	//   }
	// 	// });
	// 	// ingredients.splice(index, 1); 
	// 	// this.setState({
	// 	//   ingredients: ingredients
	// 	// }); 
	// }

	// _renderIngredientsTest() {
	//   var testIngredients = this.state.ingredients; 
	//   var testString = testIngredients.map((ingredient) => {
	//     return `Position: ${ingredient.position} Name: ${ingredient.name} Amount: ${ingredient.amount}  Unit: ${ingredient.unit}  Prep: ${ingredient.prep}`; 
	//   }); 
	//   return (
	//     testString.map((ingredient) => (
	//       <h4> {ingredient} </h4>
	//     ))
	//   )
	// }

	render () {
		return (
			<Grid>
			<Row> 
			{headers.map((header) => (
				<Col xs={header[1]} md={header[1]} style={{margin: 5}}>
					<h4> {header[0]} </h4> 
				</Col> 
			))}
			</Row>
			{this.props.ingredients.map((ingredient, i) => (
				<EditIngredientEntry key={i} ingredient={ingredient} handleDeleteIngredient={this.props.handleDeleteIngredient}/>
			))}
			<AddIngredientEntry handleAddIngredient={this.props.handleAddIngredient.bind(this)} />
			<h4> Ingredient Edit State </h4>
			</Grid>
		); 	
	}
}

export default EditIngredientsMain;
