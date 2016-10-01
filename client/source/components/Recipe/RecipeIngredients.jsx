import React, {Component} from 'react';
import { Grid, Row, Col, Table } from 'react-bootstrap';

// TODO: Confirm ingredient object structure, ensure that key refers to the proper value 
// TODO: Add headers for the 'Ingredient', 'Quantity', 'Unit' and other fields. 

class RecipeIngredients extends React.Component {

	constructor(props) {
		super(props);
	}

	_renderIngredientName(ingredient){ 
		console.log('Firing render function!'); 
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
	  		<Grid>
	  		<Col xs={12} md={12}>
			<Table bordered> 
			  <thead> 
			    <tr>
			    	<th data-field="ingredient">Ingredient</th>
			    	<th data-field="quantity">Quantity</th>
			    	<th data-field="unit">Unit</th>
			    </tr>
			  </thead>
			  <tbody> 
			    {this.props.ingredientList.map((ingredient) => {
			      return (
				  	<tr key={ingredient.position}>
				  		<td> {this._renderIngredientName(ingredient)} </td>
				  		<td> {ingredient.amount} </td>
				  		<td> {ingredient.unit} </td>
				  	</tr>
			      	)
			    })}
			  </tbody>
			</Table>
			</Col>
			</Grid>
	  ); 
	}

}

export default RecipeIngredients;
