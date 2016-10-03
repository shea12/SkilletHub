import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import RecipeDescription from './RecipeDescription'
import RecipeIngredients from './RecipeIngredients'
import ReadME from './ReadME'

//Bootstrap 
import { Grid, Row, Col, Table, Button } from 'react-bootstrap';

// Placeholder recipe data 
import placeholders from '../../../../placeholders'
import meatloafRecipe from '../../../../meatloafRecipe'

// Axios 
var axios = require('axios'); 

class RecipeMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: placeholders.recipeTemplate,
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
    console.log('PARAMS RECIPE PAGE: ', this.props.params); 
    // var usernameParameter = this.props.params.username; 
    var usernameParameter = this.props.username; 
    console.log('USERNAME PARAMETER:', usernameParameter); 

    var recipeParameter = this.props.params.recipe; 
    console.log('RECIPE PARAMETER:', recipeParameter); 


    axios.get(`/${usernameParameter}/${recipeParameter}`)
    .then((result)=> {
      // console.log(Object.keys(result)); 
      console.log(result.data); 
      console.log(Object.keys(result.data)); 
      var recipe = result.data; 

      console.log('NAME: ', recipe.name.value); 
      console.log('DESCRIPTION:', recipe.description.value); 
      
      this.setState({
        recipe: recipe,
        username: usernameParameter, 
        recipeName: recipe.name.value,
        recipeDescription: recipe.description.value, 
        recipeIngredients: recipe.ingredients, 
        recipeReadME: recipe.steps
      }); 
    })
    .catch((error)=> {
      console.log(error); 
    }); 
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
        <Row style={{margin: 10}}> 
          <h3 className="recipeHeader"> {this.state.username} / {this.state.recipeName}</h3>
          <h5> forked from </h5>
        </Row> 
        <Row>
          <Col xs={6} md={6}>
            <img style={{maxWidth: '350px', maxHeight: '350px', display: 'block', margin: 'auto'}} src={this.state.recipe.picture.value} alt={'picture of food'}/>
          </Col>
          <Col xs={6} md={6}>
            <RecipeDescription recipeDescription={this.state.recipe} handleClick={this.handleClick.bind(this)}/>
          </Col> 
        </Row> 
        <div style={{marginTop: 10}}>
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


