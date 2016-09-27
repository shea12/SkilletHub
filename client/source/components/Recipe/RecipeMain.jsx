import React, { Component } from 'react';
import RecipeDescription from './RecipeDescription'
import IngredientList from './IngredientList'
import ReadME from './ReadME'


class RecipeMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: {},
      user: {},
    }; 
  }

  componentWillMount() {
    console.log('Main recipe page is mounting!'); 
    // TODO: Implement request that loads the recipe data for a given recipe to this components state. 
      --> // Main Server 
  }

  handleChange (event) {
    var inputType = event.target.data; 
    if (inputType === 'fork') {
      console.log('Forking recipe'); 
      // TODO: Implement routing (react || server)
    }
    if (inputType === 'cook') {
      console.log('Cooking recipe'); 
      // TODO: Implement routing (react || server)
    }  

  }

  // TODO: Implement conditional render to display forked from. 
  // TODO: Implement conditional render to display context sensitive buttons (fork/cook) depending on recipe owner 

  render() {
    return (
      <div className="recipeMain">
          <h2 className="recipeHeader">{user.name} / {recipe.name}</h2>
        <div>
          <RecipeDescription recipeDescription={this.state.recipe.description} />
        </div> 

        <div>
          <button onClick={this.handleClick.bind(this)} type="submit">Fork</button>
          <button onClick={this.handleClick.bind(this)} type="submit">Cook</button>
        </div>

        <div>
            <IngredientList ingredientList={this.state.recipe.ingredientList}/>
        </div>

        <div>
            <ReadME readME={this.state.recipe.readME}/>
        </div>

      </div>
    );
  }
}

export default RecipeMain;