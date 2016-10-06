import React from 'react';
import AddIngredient from './AddIngredient'; 
import RecipeIngredients from '../Recipe/RecipeIngredients'; 

class IngredientsForm extends React.Component {
	constructor(props) {
		super(props);
	}

	render () {
		return (
			<div>
				<h3> Recipe Ingredients </h3>
				<RecipeIngredients ingredientList={this.props.ingredients} />
				<AddIngredient number={this.props.ingredientsCount} handleAddIngredient={this.props.handleAddIngredient.bind(this)} />
			</div>
		); 
	}
}

export default IngredientsForm;

