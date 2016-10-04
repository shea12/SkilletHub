import React, {Component} from 'react';

// TODO: Confirm recipe object structure, ensure that key refers to the proper value 
// TODO: Implement conditional check that will allow users to fork recipes from another users recipe list 

export default ({recipe, forkRecipe}) => {
  return (
    <li>
      <div>
        <span className="title">{recipe.name}</span>
        <span className="forkedSource"> forked from {'Austin Riedel'} </span>
		    <button onClick={forkRecipe.bind(this)}> Fork </button> 
        <button onClick={cookRecipe.bind(this)}> Cook </button> 
      </div>
    </li>
  ); 
}

