import React, {Component} from 'react';

// TODO: Confirm ingredient object structure, ensure that key refers to the proper value 
// TODO: Add headers for the 'Ingredient', 'Quantity', 'Unit' and other fields. 

export default ({ingredientList}) => {
  return (
		<div className="row">
		  <div>
		    <ul className="recipeList" >
		    {ingredientList.map((ingredient) => {
		      return (
		      	<li key={ingredient.id}> 
			      <div> 
			      	<p>{ingredient.name}</p>
			      	<p>{ingredient.unit}</p>
			      	<p>{ingredient.quantity}</p>
			      </div> 
		      	</li> 
		      	)
		    })}
		    </ul>
		  </div>
		</div>
  ); 
}