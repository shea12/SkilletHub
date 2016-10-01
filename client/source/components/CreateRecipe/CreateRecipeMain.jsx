import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import IngredientsForm from './IngredientsForm'
import StepsForm from './StepsForm'


//Bootstrap 
import { Grid, Row, Col, FormGroup, FormControl, Button, Jumbotron, Carousel, Container, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap';

// Axios 
var axios = require('axios'); 

// Placeholder recipe data 
import placeholders from '../../../../placeholders';
import meatloafRecipe from '../../../../meatloafRecipe';
const schema = placeholders.comparisonSchema; 

class CreateRecipeMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      servingsMin: '',
      servingsMax: '', 
      skillLevel: '', 
      description: '', 
      cookTime: '',
      picture: '',
      ingredients: [],
      availableIngredients: [], 
      steps: [],
      recipe: {}
    }; 
  }

  componentWillMount() {
    console.log('Create recipe page is mounting!'); 
    // TODO: Implement request that loads the recipe data for a given recipe to this components state. 
      --> // Main Server 
  }

  handleChange (event) {
    var inputType = event.target.id; 
    if (inputType === 'name'){
      this.setState({ name: event.target.value});
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

  _renderRecipeObjects(recipe) {
    var keys = Object.keys(recipe); 
    var testString = keys.map((property) => {
      return `${property}: ${recipe[property]}`; 
    }); 
    return (
      testString.map((property, i) => (
        <h4 key={'test' + i}> {property} </h4>
      ))
    )
  }

  createMeatloaf(event){
    event.preventDefault(); 

    var recipeObject = meatloafRecipe; 

    var requestUsername = this.props.username; 

    console.log(recipeObject.name); 
    console.log(Object.keys(recipeObject));
    console.log('recipeObject: ', recipeObject);  

    axios.post(`/${requestUsername}/create-recipe`, { 
      recipeObject
    })
    .then(function(response) {
      console.log('RESPONSE FROM CREATE MEATLOAF: ', response); 
      browserHistory.push(`/User/${requestUsername}`);
    })
    .catch(function(error) {
      console.log(error); 
    }); 

  }

  createRecipeObject(event){
    event.preventDefault(); 

    var recipeObject = {}; 
    recipeObject.createdAt = Date.now();
    recipeObject.name = {changed: true, value: this.state.name}; 
    recipeObject.description = {changed: true, value: this.state.description}; 
    recipeObject.servings = {changed: true, value: `serves ${this.state.servingsMin} to ${this.state.servingsMax}`}; 
    recipeObject.cookTime = {changed: true, value: this.state.cookTime}; 
    recipeObject.skillLevel = {changed: true, value: this.state.skillLevel};
    recipeObject.picture = {changed: true, value: "http://www.seriouseats.com/recipes/assets_c/2015/08/20150813-meatloaf-food-lab-excerpt-kenji-lopez-alt-25-thumb-1500xauto-425894.jpg"};
    recipeObject.dependencies = []; 
    recipeObject.ingredients = this.state.ingredients; 
    recipeObject.steps = this.state.steps; 
    recipeObject.tags = []; 
    recipeObject.issues = []; 
    this.setState({ recipe: recipeObject }); 

    console.log('CREATING RECIPE FOR:', this.props.username); 

    var requestUsername = this.props.username; 
    console.log('RECIPE: ', recipeObject); 
    axios.post(`/${requestUsername}/create-recipe`, { 
      recipeObject
    })
    .then(function(response) {
      console.log('RESPONSE CREATE RECIPE: ', response); 
      browserHistory.push(`/User/${requestUsername}`);
    })
    .catch(function(error) {
      console.log(error); 
    }); 

  }


  // TODO: Implement conditional render to display forked from. 
  // TODO: Implement conditional render to display context sensitive buttons (fork/cook) depending on recipe owner 

  render() {
    return (
      <Grid> 
      <h3> Recipe </h3>
      <Button onClick={this.createRecipeObject.bind(this)}> Create Recipe </Button> 
      <Button onClick={this.createMeatloaf.bind(this)}> Create Meatloaf </Button> 
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
              <FormControl type="number" id="servingsMin" onChange={this.handleChange.bind(this)} value={this.state.servingsMin} optional={true}/>
              </FormGroup>
            </form>
        </Col>
        <Col xs={2} md={2}> 
            <form>
              <FormGroup style={{padding: 5}}>
              <ControlLabel> Recipe Servings Max </ControlLabel>
              <FormControl type="number" id="servingsMax" onChange={this.handleChange.bind(this)} value={this.state.servingsMax} optional={true}/>
              </FormGroup>
            </form>
        </Col>
        <Col xs={4} md={4}> 
          <form> 
          <FormGroup>
            <ControlLabel>Recipe Skill Level</ControlLabel>
            <FormControl componentClass="select" onChange={this.handleChange.bind(this)} id="skill">
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
              <FormControl componentClass="textarea" id="description" onChange={this.handleChange.bind(this)} value={this.state.description} />
              </FormGroup>
            </form>
        </Col>
      </Row>
        <IngredientsForm handleAddIngredient={this.handleAddIngredient.bind(this)} ingredientCount={this.state.ingredients.length}/>
        <StepsForm handleAddStep={this.handleAddStep.bind(this)} stepCount={this.state.steps.length} availableIngredients={this.state.availableIngredients}/>
      <Row> 
      <Col xs={6} md={6}>
        {this._renderRecipeObjects(this.state.recipe)}
      </Col>
      <Col xs={6} md={6}>
      </Col>
      </Row>
      </Grid> 
    );
  }
}

export default CreateRecipeMain;
