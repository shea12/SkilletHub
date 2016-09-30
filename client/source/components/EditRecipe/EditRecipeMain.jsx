import React, { Component } from 'react';
import EditIngredients from './EditIngredientsMain'
// import StepsForm from './StepsForm'

//Bootstrap 
import { Grid, Row, Col, Form, FormGroup, FormControl, Button, Container, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap';

// Placeholder recipe data 
import placeholders from '../../../../placeholders';
import meatloafRecipe from '../../../../meatloafRecipe'


class EditRecipeMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      nameValue: '', 
      servings: {changed: true, value: ''},
      servingsMin: '',
      servingsMax: '', 
      servingsValue: '',
      skillLevel: '', 
      description: {changed: true, value: ''}, 
      descriptionValue: '',
      cookTime: '',
      picture: '',
      ingredients: [],
      availableIngredients: [], 
      steps: []
    }; 
  }

  componentWillMount() {
    console.log('Create recipe page is mounting!'); 

    // MEAT LOAF TEST
    var meatloafIngredients = meatloafRecipe.ingredients; 
    this.setState({
      ingredients: meatloafIngredients
    }); 

    // TODO: Implement request that loads the recipe data for a given recipe to this components state. 
      --> // Main Server 
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
      this.setState({ nameValue: event.target.value });
    } 
    if (inputType === 'servingsMin'){
      this.setState({servingsMin: event.target.value}); 
    } 
    if (inputType === 'servingsMax'){
      this.setState({servingsMax: event.target.value}); 
    } 
    if (inputType === 'description'){
      this.setState({descriptionValue: event.target.value}); 
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
      ingredients: ingredients
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
    var ingMap = ingredients.map((ing)=>{return ing.name});
    console.log(ingMap);  
    ingredients.splice(index, 1); 
    ingMap = ingredients.map((ing)=>{return ing.name});
    console.log(ingMap);  
    this.setState({
      ingredients: ingredients
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
              <FormControl type="text" id="name" onChange={this.handleChange.bind(this)} value={this.state.nameValue} required/>
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
              <FormControl componentClass="textarea" id="description" onChange={this.handleChange.bind(this)} value={this.state.descriptionValue} />
              </FormGroup>
            </form>
        </Col>
      </Row>
      <Row> 
        <h4> Main Recipe Edit State </h4>
        {this._renderIngredientsTest()}
      </Row>
      <EditIngredients handleAddIngredient={this.handleAddIngredient.bind(this)} handleDeleteIngredient={this.handleDeleteIngredient.bind(this)} ingredients={this.state.ingredients}/>
      </Grid> 
    );
  }
}

export default EditRecipeMain;
