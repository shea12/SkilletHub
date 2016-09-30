import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import RecipeDescription from './RecipeDescription'
import RecipeIngredients from './RecipeIngredientsBS'
import ReadME from './ReadME'

//Bootstrap 
import { Grid, Row, Col, Table, Button } from 'react-bootstrap';

// Placeholder recipe data 
import placeholders from '../../../../placeholders'
import meatloafRecipe from '../../../../meatloafRecipe'

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
    var recipe = meatloafRecipe; 
    console.log(recipe); 
    this.setState({
      recipe: recipe,
      user: placeholders.user,
      recipeName: recipe.name.value,
      recipeDescription: recipe.description.value, 
      recipeIngredients: recipe.ingredients, 
      recipeReadME: recipe.steps
    }); 
  }

  handleChange (event) {
  }

  handleClick (event) {
    console.log('Clicked on button!'); 
    var inputType = event.target.id; 
    if (inputType === 'fork') {
      console.log('Forking recipe'); 
      // TODO: Implement routing (react || server)
    }
    if (inputType === 'cook') {
      console.log('Cooking recipe'); 
      // TODO: Implement routing (react || server)
    }
    if (inputType === 'edit') {
      console.log('Editting recipe'); 

      // TODO: Implement routing (react || server)
    }    
  }

  // TODO: Implement conditional render to display forked from. 
  // TODO: Implement conditional render to display context sensitive buttons (fork/cook) depending on recipe owner 

  render() {
    return (
      <Grid className="recipeMain">
          <h2 className="recipeHeader">{this.state.user.name} / {this.state.recipeName}</h2>
        <div>
          <RecipeDescription recipeDescription={this.state.recipe} />
        </div> 
        <Row>
        <Col xs={2} md={2}> 
          <Button onClick={this.handleClick.bind(this)} id="fork" type="submit">Fork</Button>
        </Col>
        <Col xs={2} md={2}> 
          <Button onClick={this.handleClick.bind(this)} id="cook" type="submit">Cook</Button>
        </Col>
        <Col xs={2} md={2}> 
          <Button onClick={this.handleClick.bind(this)} id="edit" type="submit"><Link to='/Edit'> Edit </Link></Button>
        </Col>
        </Row>

        <div>
            <RecipeIngredients ingredientList={this.state.recipeIngredients}/>
        </div>

        <div>
            <ReadME readME={this.state.recipeReadME}/>
        </div>
      </Grid> 
    );
  }
}

export default RecipeMain;