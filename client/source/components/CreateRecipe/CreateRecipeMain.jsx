import React, { Component } from 'react';
import IngredientsForm from './IngredientsForm'
import StepsForm from './StepsForm'

// Placeholder recipe data 
import placeholders from '../../../../placeholders';

class CreateRecipeMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      servings: '',
      description: '', 
      cookTime: '',
      picture: '',
      ingredients: [],
      steps: []
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

  handleAddIngredient(ingredient) {
    var ingredients = this.state.ingredients;
    ingredients.push(ingredients); 
    this.setState({
      ingredients: ingredients
    }); 
  }

  handleAddStep(step) {
    var steps = this.state.steps;
    steps.push(steps); 
    this.setState({
      steps: steps
    }); 
  }

  handleClick (event) {
    console.log('Clicked on button!'); 
  }

  // TODO: Implement conditional render to display forked from. 
  // TODO: Implement conditional render to display context sensitive buttons (fork/cook) depending on recipe owner 

  render() {
    return (
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s6">
              <input placeholder={this.state.name} id="name" type="text" className="validate" />
              <label htmlFor="name">Recipe Name</label>
            </div>
            <div className="input-field col s6">
              <input placeholder={this.state.servings} id="servings" type="text" className="validate" />
              <label htmlFor="servings">Servings</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <textarea id="description" className="materialize-textarea"></textarea>
              <label htmlFor="description">Recipe Description</label>
            </div>
          </div>
          <IngredientsForm handleAddIngredient={this.handleAddIngredient.bind(this)} ingredientCount={this.state.ingredients.length}/>
          <StepsForm handleAddStep={this.handleAddStep.bind(this)} stepCount={this.state.steps.length}/>
        </form>
      </div>
    );
  }
}

export default CreateRecipeMain;