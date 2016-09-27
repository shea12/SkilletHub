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
		      	<li key={ingredient.position}> 
		      		<div>
			      	<p>{ingredient.name} - {ingredient.amount} {ingredient.unit}</p>
			      </div> 
		      	</li> 
		      	)
		    })}
		    </ul>
		  </div>
		</div>
  ); 
}

