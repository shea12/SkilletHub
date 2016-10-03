import React, { Component } from 'react';
import EditIngredients from './EditIngredientsMain'
import EditSteps from './EditSteps'

//Bootstrap 
import { Grid, Row, Col, Form, FormGroup, FormControl, Button, Container, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap';

// Server Requests
var axios = require('axios');

// Placeholder recipe data 
import placeholders from '../../../../placeholders';
import meatloafRecipe from '../../../../meatloafRecipe'


class EditRecipeMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      servings: '',
      servingsMin: '',
      servingsMax: '', 
      skillLevel: '', 
      description: '', 
      cookTime: '',
      picture: '',
      ingredients: [],
      availableIngredients: [], 
      steps: []
    }; 
  }

  componentWillMount() {

    var usernameParameter = this.props.params.username; 
    var recipeParameter = this.props.params.recipe; 

    // console.log('Create recipe page is mounting!'); 
    // console.log('PARAMS RECIPE PAGE: ', this.props.params); 
    // console.log('USERNAME PARAMETER:', usernameParameter); 
    // console.log('RECIPE PARAMETER:', recipeParameter); 

    axios.get(`/${usernameParameter}/${recipeParameter}`)
    .then((result)=> {

      // Parse result object to get relevant recipe data
      var recipe = result.data; 
      var servings = recipe.servings.value.split(' '); 
      var availableIngredients = recipe.ingredients.map((ingredient) => { return ingredient.name}); 

      this.setState({
        name: recipe.name.value,
        servings: recipe.servings.value,
        servingsMin: servings[1],
        servingsMax: servings[3], 
        skillLevel: recipe.skillLevel.value, 
        description: recipe.skillLevel.value, 
        cookTime: recipe.cookTime.value,
        picture: recipe.picture.value,
        ingredients: recipe.ingredients,
        availableIngredients: availableIngredients, 
        steps: recipe.steps
      }); 

    })
    .catch((error)=> {
      console.log(error); 
    }); 
  }

  _renderIngredientsTest() {
    var testIngredients = this.state.ingredients; 
    var testString = testIngredients.map((ingredient) => {
      return `Position: ${ingredient.position} Name: ${ingredient.name} Amount: ${ingredient.amount}  Unit: ${ingredient.unit}  Prep: ${ingredient.prep}`; 
    }); 
    return (
      testString.map((ingredient) => (
        <h4> {ingredient} </h4>
      ))
    )
  }

  handleChange (event) {
    if (inputType === 'name'){
      this.setState({ name: event.target.value });
    } 
    if (inputType === 'servingsMin'){
      this.setState({servingsMin: event.target.value}); 
    } 
    if (inputType === 'servingsMax'){
      this.setState({servingsMax: event.target.value}); 
    } 
    if (inputType === 'description'){
      this.setState({description: event.target.value}); 
    } 
    if (inputType === 'skill'){
      this.setState({skillLevel: event.target.value}); 
    } 
  }

  handleAddIngredient(ingredient) {
    var ingredients = this.state.ingredients;
    ingredients.push(ingredient); 
    var availableIngredients = this.state.availableIngredients; 
    availableIngredients.push(ingredient.name); 
    this.setState({
      ingredients: ingredients, 
      availableIngredients: availableIngredients
    }); 
  }

  handleDeleteIngredient(ingredient) {
    var deletedIngredient = ingredient.name; 
    var ingredients = this.state.ingredients;
    var index = 0; 

    // Search based on ingredient name
    ingredients.forEach((ingredient, i) => {
      if (ingredient.name === deletedIngredient) {
        console.log(ingredient.name);
        console.log(deletedIngredient); 
        console.log(i); 
        index = i; 
      }
    });

    // Remove the specified ingredient from the recipe via splice
    ingredients.splice(index, 1); 
    ingredientNames = ingredients.map((ing)=>{return ing.name});

    this.setState({
      ingredients: ingredients,
      availableIngredients: ingredientNames
    }); 
  }

  handleAddStep(step) {
    var steps = this.state.steps;
    steps.push(step); 
    this.setState({
      steps: steps
    }); 
  }

  handleClick (event) {
    console.log('Clicked on button!'); 
  }

  render() {
    return (
      <Grid> 
      <h3> Recipe </h3>
      <Row className="show-grid">
        <Col xs={4} md={4}> 
            <form>
              <FormGroup style={{padding: 5}}>
              <ControlLabel> Recipe Name </ControlLabel>
              <FormControl type="text" id="name" onChange={this.handleChange.bind(this)} value={this.state.name} required/>
              </FormGroup>
            </form>
        </Col>
        <Col xs={2} md={2}> 
            <form>
              <FormGroup style={{padding: 5}}>
              <ControlLabel> Recipe Servings Min </ControlLabel>
              <FormControl type="number" id="servingsMin" onChange={this.handleChange.bind(this)} value={this.state.servingsMin} optional/>
              </FormGroup>
            </form>
        </Col>
        <Col xs={2} md={2}> 
            <form>
              <FormGroup style={{padding: 5}}>
              <ControlLabel> Recipe Servings Max </ControlLabel>
              <FormControl type="number" id="servingsMax" onChange={this.handleChange.bind(this)} value={this.state.servingsMax} optional/>
              </FormGroup>
            </form>
        </Col>
        <Col xs={4} md={4}> 
          <form> 
          <FormGroup style={{padding: 5}}>
            <ControlLabel>Recipe Skill Level</ControlLabel>
            <FormControl componentClass="select" onChange={this.handleChange.bind(this)} id="skill">
              <option value="previous">{this.state.skillLevel}</option>
              <option value="Junior Dev">Junior Dev</option>
              <option value="Kitchen Team Lead">Kitchen Team Lead</option>
              <option value="Scrum Master">Scrum Master</option>
            </FormControl>
          </FormGroup>
          </form>
        </Col>
      </Row>
      <Row className="show-grid">
        <Col xs={12} md={12}> 
            <form>
              <FormGroup style={{padding: 5}}>
              <ControlLabel> Recipe Description </ControlLabel>
              <FormControl componentClass="textarea" id="description" style={{height: 85}} onChange={this.handleChange.bind(this)} value={this.state.description} />
              </FormGroup>
            </form>
        </Col>
      </Row>
      <EditIngredients handleAddIngredient={this.handleAddIngredient.bind(this)} handleDeleteIngredient={this.handleDeleteIngredient.bind(this)} ingredients={this.state.ingredients} />
      <EditSteps steps={this.state.steps} availableIngredients={this.state.availableIngredients}/>
      </Grid> 
    );
  }
}

export default EditRecipeMain;

      // Test display for rendering ingredients list 
      // <Row> 
        // <h4> Main Recipe Edit State </h4>
        // {this._renderIngredientsTest()}
      // </Row>
