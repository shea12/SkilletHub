import React, {Component} from 'react';
import RecipeListEntry from './RecipeListEntry'; 

// TODO: Confirm recipe object structure, ensure that key refers to the proper value 
var forkRecipe = function () {
	console.log('Attempted to fork recipe!'); 
}; 

export default ({recipeList}) => {
  return (
		<div className="row">
		  <div>
		    <ul className="recipeList" >
		    {recipeList.map((recipe) => {
		    	return <RecipeListEntry key={recipe.recipeID} recipe={recipe} forkRecipe={forkRecipe} cookRecipe={cookRecipe}/>
		    })}
		    </ul>
		  </div>
		</div>
  ); 
}

