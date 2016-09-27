import React, { Component } from 'react';
import RecipeDescription from './RecipeDescription'
import RecipeIngredients from './RecipeIngredients'
import ReadME from './ReadME'

// Placeholder recipe data 
import placeholders from '../../../../placeholders'

class RecipeMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: {},
      user: {},
      recipeName: '',
      recipeDescription: '',
      recipeIngredients: [],
      recipeReadME: []
    }; 
  }

  componentWillMount() {
    console.log('Main recipe page is mounting!'); 
    // TODO: Implement request that loads the recipe data for a given recipe to this components state. 
      --> // Main Server 

    // Temporary placeholder values 
    // console.log(placeholders);   
    var recipe = placeholders.recipes[0]; 
    console.log(recipe); 
    this.setState({
      recipe: recipe,
      user: placeholders.user,
      recipeName: recipe.name,
      recipeDescription: recipe.description, 
      recipeIngredients: recipe.ingredients, 
      recipeReadME: recipe.steps
    }); 
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

  handleClick (event) {
    console.log('Clicked on button!'); 
  }

  // TODO: Implement conditional render to display forked from. 
  // TODO: Implement conditional render to display context sensitive buttons (fork/cook) depending on recipe owner 

  render() {
    return (
      <div className="recipeMain">
          <h2 className="recipeHeader">{this.state.user.name} / {this.state.recipeName}</h2>
        <div>
          <RecipeDescription recipeDescription={this.state.recipe} />
        </div> 

        <div>
          <button onClick={this.handleClick.bind(this)} type="submit">Fork</button>
          <button onClick={this.handleClick.bind(this)} type="submit">Cook</button>
        </div>

        <div>
            <RecipeIngredients ingredientList={this.state.recipeIngredients}/>
        </div>

        <div>
            <ReadME readME={this.state.recipeReadME}/>
        </div>

      </div>
    );
  }
}

export default RecipeMain;