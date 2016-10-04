import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

//Bootstrap 
import { Grid, Row, Col, FormGroup, FormControl, Button, Jumbotron, Carousel, Container, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap';

// Axios 
var axios = require('axios'); 

class CookMeMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      servingsMin: '',
      servingsMax: '', 
      skillLevel: '', 
      description: '', 
      cookTime: '',
      picture: "",
      ingredients: [],
      availableIngredients: [], 
      steps: [],
      recipe: {}
    }; 
  }

  componentWillMount() {
    console.log('Cook Me main page is componentWillMounting!');
    // TODO: Implement request that loads the recipe data for this recipe to the component's state. 
    var usernameParameter = this.props.params.username; 
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

    //use fn 'retreive version' to get full recipe
  }


  render() {
    return (
      <Grid className='cookMeMain'>
        <div className='jumbotron'>
          <div className='container'>
            <h1>Time to cook!</h1>
          </div>
        </div>
      </Grid>
    );
  }
}



export default CookMeMain;