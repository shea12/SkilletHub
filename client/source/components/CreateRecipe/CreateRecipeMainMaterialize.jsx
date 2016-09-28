import React, { Component } from 'react';
import IngredientsForm from './IngredientsForm'
import StepsForm from './StepsForm'

// Placeholder recipe data 
import placeholders from '../../../../placeholders';
import { Grid, Row, Col, FormGroup, FormControl, Button, Jumbotron, Carousel, Container, ControlLabel } from 'react-bootstrap';


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
      <div>
      <Row className="show-grid">
        <Col xs={6} md={6}> 
            <form>
              <FormGroup style={{padding: 10}}>
              <ControlLabel> Recipe Name </ControlLabel>
              <FormControl type="text" controlId="name" id="name" onChange={this.handleChange.bind(this)} value={this.state.name} />
              </FormGroup>
            </form>
        </Col>
        <Col xs={6} md={6}> 
            <form>
              <FormGroup style={{padding: 10}}>
              <ControlLabel> Recipe Servings </ControlLabel>
              <FormControl type="text" controlId="name" id="name" onChange={this.handleChange.bind(this)} value={this.state.servings} />
              </FormGroup>
            </form>
        </Col>
      </Row>
          <div className="row">
            <div className="input-field col s12">
              <textarea id="description" className="materialize-textarea"></textarea>
              <label htmlFor="description">Recipe Description</label>
            </div>
          </div>
          <IngredientsForm handleAddIngredient={this.handleAddIngredient.bind(this)} ingredientCount={this.state.ingredients.length}/>
          <StepsForm handleAddStep={this.handleAddStep.bind(this)} stepCount={this.state.steps.length}/>
        </div>
    );
  }
}

export default CreateRecipeMain;