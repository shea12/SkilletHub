import React, { Component } from 'react';
import IngredientsForm from './IngredientsForm'
import StepsForm from './StepsForm'

//Bootstrap 
import { Grid, Row, Col, FormGroup, FormControl, Button, Jumbotron, Carousel, Container, ControlLabel } from 'react-bootstrap';


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
      availableIngredients: [], 
      steps: []
    }; 
  }

  componentWillMount() {
    console.log('Create recipe page is mounting!'); 
    // TODO: Implement request that loads the recipe data for a given recipe to this components state. 
      --> // Main Server 
  }

  handleChange (event) {
    var inputType = event.target.id; 
    if (inputType === 'fork') {
      console.log('Forking recipe'); 
      // TODO: Implement routing (react || server)
    }
    if (inputType === 'cook') {
      console.log('Cooking recipe'); 
      // TODO: Implement routing (react || server)
    } 
    if (inputType === 'name'){
      this.setState({name: event.target.value}); 
    } 
    if (inputType === 'servings'){
      this.setState({servings: event.target.value}); 
    } 
    if (inputType === 'description'){
      this.setState({description: event.target.value}); 
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

  // TODO: Implement conditional render to display forked from. 
  // TODO: Implement conditional render to display context sensitive buttons (fork/cook) depending on recipe owner 

  render() {
    return (
      <Grid> 
      <Row className="show-grid">
        <Col xs={4} md={4}> 
            <form>
              <FormGroup style={{padding: 5}}>
              <ControlLabel> Recipe Name </ControlLabel>
              <FormControl type="text" controlId="name" id="name" onChange={this.handleChange.bind(this)} value={this.state.name} />
              </FormGroup>
            </form>
        </Col>
        <Col xs={4} md={4}> 
            <form>
              <FormGroup style={{padding: 5}}>
              <ControlLabel> Recipe Servings </ControlLabel>
              <FormControl type="text" controlId="servings" id="servings" onChange={this.handleChange.bind(this)} value={this.state.servings} />
              </FormGroup>
            </form>
        </Col>
        <Col xs={4} md={4}> 
          <p>{JSON.stringify(this.state)}</p>
        </Col>
      </Row>
      <Row className="show-grid">
        <Col xs={8} md={8}> 
            <form>
              <FormGroup style={{padding: 5}}>
              <ControlLabel> Recipe Description </ControlLabel>
              <FormControl componentClass="textarea" controlId="description" id="description" onChange={this.handleChange.bind(this)} value={this.state.description} />
              </FormGroup>
            </form>
        </Col>
      </Row>
          <IngredientsForm handleAddIngredient={this.handleAddIngredient.bind(this)} ingredientCount={this.state.ingredients.length}/>
          <StepsForm handleAddStep={this.handleAddStep.bind(this)} stepCount={this.state.steps.length} availableIngredients={this.state.availableIngredients}/>
      </Grid> 
    );
  }
}

export default CreateRecipeMain;