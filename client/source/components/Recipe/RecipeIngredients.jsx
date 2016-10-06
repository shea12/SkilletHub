import React, {Component} from 'react';
import { Grid, Row, Col, Table } from 'react-bootstrap';

// TODO: Confirm ingredient object structure, ensure that key refers to the proper value 
// TODO: Add headers for the 'Ingredient', 'Quantity', 'Unit' and other fields. 

class RecipeIngredients extends React.Component {

	constructor(props) {
		super(props);
	}

	_renderIngredientName(ingredient){ 
		if (ingredient.prep) {
			return (
				<p> {`${ingredient.name}, ${ingredient.prep}`} </p>
			)
		} else {
			return (
				<p> {`${ingredient.name}`} </p>
			)	
		}
	}	

	render() {
	  return (
					<Table bordered width={'100%'}> 
					  <thead> 
					    <tr>
					    	<th data-field="ingredient">Ingredient</th>
					    	<th data-field="quantity">Quantity</th>
					    	<th data-field="unit">Unit</th>
					    </tr>
					  </thead>
					  <tbody> 
					    {this.props.ingredientList.map((ingredient, i) => {
					      return (
						  	<tr key={ingredient.position + ' ' + i}>
						  		<td> {this._renderIngredientName(ingredient)} </td>
						  		<td> {ingredient.amount} </td>
						  		<td> {ingredient.unit} </td>
						  	</tr>
					      	)
					    })}
					  </tbody>
					</Table>
	  ); 
	}

}

export default RecipeIngredients;
