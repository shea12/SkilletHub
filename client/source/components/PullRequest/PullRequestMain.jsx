import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
// import RecipeDescription from './RecipeDescription'
import RecipeIngredients from '../Recipe/RecipeIngredients'; 
import IngredientsTable from './IngredientsTable'; 
// import ReadME from './ReadME'
// import CookMe from '../CookRecipe/CookMeMain'
// import VersionControl from '../VersionControl/VersionControlMain'

//Bootstrap 
import { Grid, Row, Col, Table, Button } from 'react-bootstrap';

// Placeholder recipe data 
import placeholders from '../../../../placeholders'
import meatloafRecipeV1 from '../../../../recipes/meatloafRecipeV1'
import meatloafRecipeV2 from '../../../../recipes/meatloafRecipeV2'

// Axios 
var axios = require('axios'); 
var _ = require('underscore'); 

class PullRequestMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pullRecipe: {},
      masterRecipe: {},
      pullUser: {},
      masterUser: {}, 
      allIngredients: [], 
      recipeName: '',
      recipeDescription: '',
      recipeIngredients: [],
      recipeReadME: []
    }; 
  }

  componentWillMount() {
    console.log('Pull request page is mounting!');

    var pullRecipe = meatloafRecipeV2; 
    var sourceRecipe = meatloafRecipeV1; 

    var allIngredients = this.reconcileIngredients(sourceRecipe.ingredients, pullRecipe.ingredients); 

    this.setState({
      pullRecipe: meatloafRecipeV2,
      masterRecipe: meatloafRecipeV1,
      allIngredients: allIngredients
    }); 

    // axios.get(`/${usernameParameter}/${recipeParameter}`)
    // .then((result)=> {
    //   var recipe = result.data; 
    //   this.setState({
    //     recipe: recipe,
    //     username: usernameParameter, 
    //     recipeName: recipe.name.value,
    //     recipeDescription: recipe.description.value, 
    //     recipeIngredients: recipe.ingredients, 
    //     recipeReadME: recipe.steps
    //   }); 
    // })
    // .catch((error)=> {
    //   console.log('Axios error: ', error); 
    // }); 
  }

  reconcileIngredients(sourceIngredients, pullIngredients) {
    var allIngredients = []; 
    var sourceIngredientsNames = []; 
    sourceIngredients.forEach((ingredient) => {
      allIngredients.push(ingredient); 
      sourceIngredientsNames.push(ingredient.name); 
    }); 

    // Determine deleted ingredient
    var deletedIngredients = pullIngredients
    .filter((ingredient) => {
      if (!ingredient.changed) {
        return ingredient; 
      }
    }); 
    // .map(ingredient => ingredient.name); 
    // console.log('DELETED INGREDIENTS'); 
    // console.log(deletedIngredients); 

    // Add deleted property to ingredient 
    deletedIngredients.forEach((ingredient) => {
      // console.log(ingredient); 
      var deletedIngredient = _.findWhere(allIngredients, {name: ingredient.name}); 
      // console.log('FIND WHERE RESULT:'); 
      // console.log(deletedIngredient); 
      if (deletedIngredient) {
        deletedIngredient.deleted = true; 
        deletedIngredient.validation = 'error'; 
        // console.log(deletedIngredient); 
      }
    }); 

    // console.log('ALl INGREDIENTS'); 
    // console.log(allIngredients); 

    /////// 
    // NEW ADDED INGREDIENTS 
    ///// 
    var addedIngredients = []; 
    var editedIngredients = []; 

    pullIngredients.forEach((ingredient) => {
      if (ingredient.changed && sourceIngredientsNames.indexOf(ingredient.name) === -1) {
        addedIngredients.push(ingredient); 
      } else if (ingredient.changed) {
        editedIngredients.push(ingredient); 
      }
    });

    addedIngredients.forEach((ingredient) => {
        ingredient.added = true; 
        ingredient.validation = 'success'; 
        allIngredients.push(ingredient); 
    }); 


    editedIngredients.forEach((ingredient) => {
      var changedIngredient = _.findWhere(allIngredients, {name: ingredient.name}); 
      console.log('FOUND MATCHING EDITED INGREDIENT'); 
      console.log(changedIngredient); 
      if (changedIngredient) {
        var previousValue = changedIngredient.amount; 
        changedIngredient.edited = true; 
        changedIngredient.amount = ingredient.amount; 
        changedIngredient.unit = changedIngredient.unit; 
        changedIngredient.previousValue = previousValue; 
      }
      console.log(changedIngredient); 
    }); 


    console.log('ADDED INGREDIENTS!'); 
    console.log(addedIngredients); 

    console.log('CHANGED INGREDIENTS'); 
    console.log(editedIngredients); 

    console.log(allIngredients); 

    return allIngredients; 

    // Resolve modified ingredients 
  }

  handleClick (event) {
    console.log('Clicked on button!'); 
  }

  render() {
    return (
      <Grid className="recipeMain">
        <Row style={{margin: 10}}> 
          <h2 className="recipeHeader"> Comparing Changes </h2>
          <h4> Review the changes between the two recipes before creating the pull request </h4> 
        </Row> 
        <Row>
          <Col xs={6} md={6}>
            <h4> Your Recipe Ingredients</h4> 
            <RecipeIngredients ingredientList={this.state.pullRecipe.ingredients}/>
          </Col>
          <Col xs={6} md={6}>
            <h4> Source Recipe Ingredients</h4> 
            <RecipeIngredients ingredientList={this.state.masterRecipe.ingredients}/>
          </Col> 
        </Row> 
        <Row>
          <Col xs={12} md={12}>
            <h4> Merged Ingredients </h4> 
            <IngredientsTable ingredientList={this.state.allIngredients}/>
          </Col>
        </Row> 
      </Grid> 
    );
  }
}

export default PullRequestMain;
