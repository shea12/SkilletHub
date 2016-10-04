import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import EditIngredients from './EditIngredientsMain'
import EditSteps from './EditSteps'

//Bootstrap 
import { Grid, Row, Col, Form, FormGroup, FormControl, Button, Container, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap';

// Server Requests
var axios = require('axios');
var _ = require('underscore'); 

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
      steps: [],
      editRecipe: {},
      displayOutput: false
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

      // Set all ingredient and step changed values to false
      var steps = recipe.steps.map((step) => {
        step.changed = false; 
        return step; 
      }); 

      var ingredients = recipe.ingredients.map((ingredient) => {
        ingredient.changed = false; 
        return ingredient; 
      }); 

      // console.log('STEPS AFTER CHANGE'); 
      // console.log(steps); 

      // console.log('INGREDIENTS AFTER CHANGE'); 
      // console.log(ingredients); 

      console.log('CHECKING FOR BRANCH'); 
      console.log(recipe.branch); 

      this.setState({
        name: recipe.name.value,
        servings: recipe.servings.value,
        servingsMin: servings[1],
        servingsMax: servings[3], 
        skillLevel: recipe.skillLevel.value, 
        description: recipe.description.value, 
        cookTime: recipe.cookTime.value,
        picture: recipe.picture.value,
        ingredients: ingredients,
        availableIngredients: availableIngredients,
        editRecipe: {},  
        steps: steps,
        editRecipeObject: {},
        originalRecipeObject: recipe
      }); 

    })
    .catch((error)=> {
      console.log(error); 
    }); 
  }

  _renderIngredientsTest() {
    var testIngredients = this.state.ingredients; 
    var testString = testIngredients.map((ingredient) => {
      return `Position: ${ingredient.position} Name: ${ingredient.name} Changed: ${ingredient.changed} Added: ${ingredient.added || 'NA'} Deleted: ${ingredient.deleted || 'NA'}`; 
    }); 
    return (
      testString.map((ingredient) => (
        <h4> {ingredient} </h4>
      ))
    )
  }

  _renderIngredientsTest2() {
    var testIngredients = this.state.testIngredients; 
    var display = this.state.displayOutput; 

    if (display) {
      var testString = testIngredients.map((ingredient) => {
        return `Position: ${ingredient.position} Name: ${ingredient.name} Changed: ${ingredient.changed} Added: ${ingredient.added || 'NA'} Deleted: ${ingredient.deleted || 'NA'}`; 
      }); 
      return (
         testString.map((ingredient) => (
           <h4> {ingredient} </h4>
         ))
      ) 
    }
  }

  _renderObjectTest() {
    var testObject = this.state.editRecipeObject; 
    var display = this.state.displayOutput; 

    if (display) {
      var testObjectKeys = Object.keys(testObject); 
      return (
        testObjectKeys.map((key) => (
          <h4> {key} : {JSON.stringify(testObject[key])} </h4>
        ))
      ) 
    }
  }

  handleChange (event) {
    var editRecipe = this.state.editRecipe; 
    var inputType = event.target.id;
    if (inputType === 'name'){
      editRecipe['name'] = true; 
      console.log('Changing name!'); 
      console.log(editRecipe); 
      this.setState({ name: event.target.value, editRecipe: editRecipe });
    } 
    if (inputType === 'servingsMin'){
      editRecipe['servings'] = true; 
      this.setState({servingsMin: event.target.value, editRecipe: editRecipe }); 
    } 
    if (inputType === 'servingsMax'){
      this.setState({servingsMax: event.target.value}); 
    } 
    if (inputType === 'description'){
      editRecipe['description'] = true; 
      this.setState({description: event.target.value, editRecipe: editRecipe}); 
    } 
    if (inputType === 'skill'){
      editRecipe['description'] = true; 
      this.setState({skillLevel: event.target.value, editRecipe: editRecipe}); 
    } 
  }

  handleAddIngredient(ingredient) {
    // Determine current state of ingredients 
    var ingredients = this.state.ingredients;
    var ingredient = ingredient; 
    ingredient.added = true; 
    ingredients.push(ingredient); 
    var availableIngredients = this.state.availableIngredients; 
    availableIngredients.push(ingredient.name); 

    // Set the new state 
    this.setState({
      ingredients: ingredients, 
      availableIngredients: availableIngredients
    }); 
  }

  handleDeleteIngredient(ingredient) {
    // Determine current state of ingredients 
    var deletedIngredient = ingredient.name; 
    var ingredients = this.state.ingredients;
    var index = 0; 

    // Search based on ingredient name and modify properties as necessary
    ingredients.forEach((ingredient, i) => {
      if (ingredient.name === deletedIngredient) {
        ingredient.display = 'none'; 
        ingredient.deleted = true; 
        ingredient.changed = true; 
        console.log('DELETED INGREDIENT OBJECT: '); 
        console.log(ingredient);
        index = i; 
      }
    });

    // Modify availableIngredients by filtering out deleted ingredients
    var availableIngredients = ingredients
    .filter((ingredient) => { 
      if (!ingredient.changed || !ingredient.deleted || ingredient.added) {
        return ingredient; 
      }
    })
    .map((ingredient) => {return ingredient.name});

    // console.log('STATUS CHECK ON INGREDIENTS'); 
    // console.log(ingredients); 

    console.log('STATUS CHECK ON AVAIL INGREDIENTS'); 
    console.log(availableIngredients); 

    this.setState({
      ingredients: ingredients,
      availableIngredients: availableIngredients
    }); 
  }

  handleAddStep(step) {
    // Determine current state of steps 
    console.log('ADDING A STEP IN MAIN');
    console.log(this.state.availableIngredients); 
    var steps = this.state.steps;
    var step = step; 
    step.added = true; 
    step.changed = true; 
    steps.push(step); 

    // Set the new state 
    this.setState({
      steps: steps
    }); 
  }

  handleDeleteStep(step) {
    // Determine current state of ingredients 
    var deletedStep = step; 
    console.log('DELETED STEP OBJECT: '); 
    console.log(deletedStep);
    var steps = this.state.steps;
    var index = 0; 

    // Search based on ingredient name and modify properties as necessary
    steps.forEach((step, i) => {
      console.log('CHECKING STEP OBJECT: '); 
      console.log(step);
      if (step.position === deletedStep.position) {
        step.deleted = true; 
        step.changed = true; 
        index = i; 
      }
    });

    console.log(steps); 

    this.setState({
      steps: steps
    }); 
  }

  handleClick (event) {
    console.log('Clicked on button!'); 
  }

  reconcileSteps(steps) {
    var deletedSteps = []; 
    var steps = steps.filter((step) => {
      if (!step.deleted) {
        return step; 
      } else {
        step.position = null; 
        step.changed = false; 
        deletedSteps.push(step); 
      }
    })
    .map((step, i) => {
      if (step.position !== i + 1) {
        step.changed = true; 
        step.position = i + 1; 
      }
      return step; 
    })
    .filter((step) => {
      if (step.changed) {
        return step; 
      }
    }); 
    return steps.concat(deletedSteps); 
  }

  reconcileIngredients(ingredients) {
    var deletedIngredients = []; 
    var ingredients = ingredients.filter((ingredient) => {
      if (!ingredient.deleted) {
        return ingredient; 
      } else {
        // console.log('Adding deleted ingredient!'); 
        ingredient.position = null; 
        ingredient.changed = false; 
        deletedIngredients.push(ingredient); 
      }
    })
    .map((ingredient, i) => {
      if (ingredient.position !== i + 1) {
        ingredient.changed = true; 
        ingredient.position = i + 1; 
      }
      return ingredient; 
    })
    .filter((ingredient) => {
      if (ingredient.changed) {
        return ingredient; 
      }
    }); 
    return ingredients.concat(deletedIngredients); 
  }

  //// TEST FOR OUTPUT
  ////////// 

  handleRecipeEditSubmit(event) {
    event.preventDefault(); 

    // Define our request object -> editRecipeObject
    var editRecipe = this.state.editRecipe; 
    var editRecipeObject = this.state.editRecipeObject; 

    // Assign the values to object properties the database expects 
    var edits = Object.keys(editRecipe);
    edits.forEach((edit) => {
      editRecipeObject[edit] = {changed: true, value: this.state[edit]}
    }); 

    editRecipeObject.steps = this.state.editSteps;
    editRecipeObject.ingredients = this.state.editIngredients; 

    var editSteps = this.reconcileSteps(this.state.steps); 
    var editIngredients = this.reconcileIngredients(this.state.ingredients); 

    editRecipeObject.steps = editSteps; 
    editRecipeObject.ingredients = editIngredients; 

    // console.log('EDIT RECIPE OBJECT:'); 
    // console.log(editRecipeObject); 

    var usernameParameter = this.props.params.username; 
    var recipeParameter = this.props.params.recipe; 

    var originalRecipeObject = this.state.originalRecipeObject; 
    var branch = originalRecipeObject.branch; 

    axios.post(`/${usernameParameter}/${recipeParameter}/${branch}/create-version`, {
      previous: originalRecipeObject, 
      changes: editRecipeObject
    })
    .then((result) => {
      console.log(result); 
      browserHistory.push(`/User/${usernameParameter}`);
    })
    .catch((error) => {
      console.log(error); 
    })


    // this.setState({ editRecipeObject: editRecipeObject, displayOutput: true, testIngredients: editIngredients });
  }

  render() {
    return (
      <Grid> 
      <h3 style={{display: 'inline'}}> Edit Recipe </h3> <Button style={{display: 'inline'}} onClick={this.handleRecipeEditSubmit.bind(this)}> Commit Edit </Button> 
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
      <EditSteps steps={this.state.steps} availableIngredients={this.state.availableIngredients} handleAddStep={this.handleAddStep.bind(this)} handleDeleteStep={this.handleDeleteStep.bind(this)}/>
      <Row> 
        <h4> Ingredients State </h4>
        {this._renderIngredientsTest()}
      </Row>
      <Row> 
        <h4> Edit Recipe Output </h4>
        {this._renderIngredientsTest2()}
      </Row>
      <Row> 
        <h4> Edit Recipe Output </h4>
        {this._renderObjectTest()}
      </Row>
      </Grid> 
    );
  }
}

export default EditRecipeMain;
