import React from 'react';
import AddIngredient from './AddIngredient'; 
import RecipeIngredients from '../Recipe/RecipeIngredients'; 

class IngredientsForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ingredients: [],
			newIngredient: [],
			ingredientsCount: 1
		}; 
	}

	componentWillMount() {
		console.log('Ingredients Form is mounting!'); 
		this.setState({
			ingredients: [], 
			newIngredient: [{
				changed: true, 
				name: '',
				amount: '', 
				unit: '',
				prep: '', 
				optional: '', 
				type: null,
				position: null
			}]
		}); 
	}

	handleAddIngredient (ingredient) {
		event.preventDefault(); 
		var ingredients = this.state.ingredients; 
		// console.log('Currents ingredients:', JSON.stringify(ingredients)); 
		// console.log('NEW STEP: ', step); 
		// steps[steps.length - 1] = step; 
		ingredients.push(ingredient); 
		// console.log('Ingredients after change: ', ingredients); 
		// steps.push({
		// 		changed: true, 
		// 		description: 'Placeholder',
		// 		ingredients: []
		// 	}); 
		var ingredientsCount = this.state.ingredientsCount + 1; 
		this.setState({
			ingredients: ingredients,
			ingredientsCount: ingredientsCount
		}); 
		console.log('Added ingredient!'); 
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
				<h3> Recipe Ingredients </h3>
				<RecipeIngredients ingredientList={this.state.ingredients} />
				{this.state.newIngredient.map((ingredient) => (
					<AddIngredient key={'ingredient' + this.state.ingredientsCount} number={this.state.ingredientsCount} handleAddIngredient={this.handleAddIngredient.bind(this)} ingredient={ingredient}/>
				))}
			</div>
		); 
	}
}

export default IngredientsForm;