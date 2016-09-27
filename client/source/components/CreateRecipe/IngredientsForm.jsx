import React from 'react';
import AddIngredient from './AddIngredient'; 
import RecipeIngredients from '../Recipe/RecipeIngredients'; 

class IngredientsForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
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
			}],
			ingredientsCount: 1
		}; 
	}

	// componentWillMount() {
	// 	// console.log('Ingredients Form is mounting!'); 
	// 	this.setState({
	// 		ingredients: [], 
	// 		newIngredient: {
	// 			changed: true, 
	// 			name: '',
	// 			amount: '', 
	// 			unit: '',
	// 			prep: '', 
	// 			optional: '', 
	// 			type: null,
	// 			position: null
	// 		},
	// 		ingredientsCount: 1
	// 	}); 
	// }

	handleAddIngredientForm (ingredient) {
		event.preventDefault(); 
		// Add the ingredient to CreateRecipeMain state
		this.props.handleAddIngredient(ingredient); 

		// Update the state within the Ingredients Form component 
		var ingredients = this.state.ingredients; 
		ingredients.push(ingredient); 
		var ingredientsCount = this.state.ingredientsCount + 1; 
		this.setState({
			ingredients: ingredients,
			ingredientsCount: ingredientsCount
		}); 
	}

	render () {
		return (
			<div>
				<h3> Recipe Ingredients </h3>
				<RecipeIngredients ingredientList={this.state.ingredients} />
				{this.state.newIngredient.map((ingredient) => (
					<AddIngredient key={'ingredient' + this.state.ingredientsCount} number={this.state.ingredientsCount} handleAddIngredient={this.handleAddIngredientForm.bind(this)} ingredient={ingredient}/>
				))}
			</div>
		); 
	}
}

export default IngredientsForm;
