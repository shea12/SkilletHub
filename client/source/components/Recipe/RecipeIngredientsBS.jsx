import React, {Component} from 'react';
import { Grid, Row, Col, Table } from 'react-bootstrap';


// TODO: Confirm ingredient object structure, ensure that key refers to the proper value 
// TODO: Add headers for the 'Ingredient', 'Quantity', 'Unit' and other fields. 

export default ({ingredientList}) => {
  return (
  		<Grid>
  		<Col xs={8} md={8}>
		<Table bordered> 
		  <thead> 
		    <tr>
		    	<th data-field="ingredient">Ingredient</th>
		    	<th data-field="quantity">Quantity</th>
		    	<th data-field="unit">Unit</th>
		    </tr>
		  </thead>
		  <tbody> 
		    {ingredientList.map((ingredient) => {
		      return (
			  	<tr key={ingredient.position}>
			  		<td> {ingredient.name} </td>
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
