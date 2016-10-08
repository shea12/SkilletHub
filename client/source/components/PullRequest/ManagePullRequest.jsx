import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import RecipeIngredients from '../Recipe/RecipeIngredients'; 
import IngredientsTable from './IngredientsTable'; 
import StepsTable from './StepsTable'; 
import PullRequestControl from './ManagePullRequestControl'; 

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
      pullRecipe: placeholders.recipeTemplate,
      sourceRecipe: placeholders.recipeTemplate,
      pullUser: {},
      sourceUser: {}, 
      allIngredients: [], 
      recipeName: '',
      recipeDescription: '',
      recipeIngredients: [],
      recipeReadME: [],
      comparisonIngredients: [],
      comparisonSteps: []
    }; 
  }

  componentWillMount() {
    console.log('Pull request page is mounting!');

    // Route for the recipe that is being submitted as pull request
    var usernameParameter = this.props.params.username; 
    var recipeParameter = this.props.params.recipe; 
    var branchParameter = this.props.params.branch;
    var versionParameter = this.props.params.version;
    var sourceRecipeRoute = `/${usernameParameter}/${recipeParameter}/${branchParameter}/${versionParameter}`; 

    // Route for the recipe that the pull request is being submitted to
    var pullUsernameParameter = this.props.params.pullUser; 
    var pullRecipeParameter = this.props.params.pullRecipe; 
    var pullRecipeRoute = `/${pullUsernameParameter}/${pullRecipeParameter}`; 

    axios.all([this.getRecipe(sourceRecipeRoute), this.getRecipe(pullRecipeRoute)])
    .then(axios.spread((source, pull) => {

      var pullRecipe = pull.data;
      var sourceRecipe = source.data; 
      var comparisonIngredients = this.markupIngredients(sourceRecipe.ingredients, pullRecipe.ingredients); 
      var comparisonSteps = this.markupStepsSimple(sourceRecipe.steps, pullRecipe.steps); 

      this.setState({
        pullRecipe: pullRecipe,
        sourceRecipe: sourceRecipe,
        pullRecipeUser: pullUsernameParameter,
        sourceRecipeUser: usernameParameter,
        comparisonIngredients: comparisonIngredients,
        comparisonSteps: comparisonSteps
      }); 

    }));
  }

  getRecipe(route) {
    return axios.get(route); 
  }

  markupIngredients(sourceIngredients, pullIngredients) {
    var comparisonIngredients = []; 
    var addedIngredients = []; 

    // Handles applying properties to the edited, unedited and deleted ingredients from original recipe 
    sourceIngredients.forEach((ingredient, i) => {
      var pullIngredient = _.findWhere(pullIngredients, {name: ingredient.name}); 
      if (pullIngredient) {
        if (ingredient.amount !== pullIngredient.amount || ingredient.unit !== pullIngredient.unit || ingredient.prep !== pullIngredient.prep) {
          var comparisonIngredient = _.extend({}, pullIngredient); 
          comparisonIngredient.edited = true; 
        } else {
          var comparisonIngredient = _.extend({}, ingredient); 
        }
        comparisonIngredients.push(comparisonIngredient); 
      } else {
        ingredient.deleted = true; 
        comparisonIngredients.push(ingredient); 
      }
    }); 

    // Handles highlighting the added ingredients
    pullIngredients.forEach((ingredient) => {
      var pullIngredient = _.findWhere(sourceIngredients, {name: ingredient.name}); 
      if (!pullIngredient) {
        ingredient.added = true; 
        addedIngredients.push(ingredient); 
      }
    }); 

    return comparisonIngredients.concat(addedIngredients); 

  }

  markupStepsSimple(sourceSteps, pullSteps) {
    var comparisonSteps = []; 
    var addedSteps = []; 
    var index = 0; 

    // Handles applying properties to the edited, unedited and deleted ingredients from original recipe 
    sourceSteps.forEach((step, i) => {
      var pullStep = _.findWhere(pullSteps, {position: step.position}); 
      if (pullStep) {
        if (step.description !== pullStep.description) {
          var comparisonStep = _.extend({}, pullStep); 
          comparisonStep.edited = true; 
        } else {
          var comparisonStep = _.extend({}, step); 
        }
        comparisonSteps.push(comparisonStep); 
      } 
      index = i; 
    });

    // Handles highlighting the added steps
    pullSteps.forEach((step, i) => {
      if (i > index) {
        step.added = true; 
        addedSteps.push(step); 
      }
    }); 

    return comparisonSteps.concat(addedSteps); 
  }

  render() {
    return (
      <Grid >
        <PullRequestControl
          username={this.state.sourceRecipeUser}
          recipename={this.state.sourceRecipe.name.value}
          pullBranch={this.state.pullRecipe.branch}
          pullVersion={this.state.pullRecipe._id}
          sourceBranch={this.state.sourceRecipe.branch}
          sourceVersion={this.state.sourceRecipe._id}
          handlePullRequestResponse={this.props.handlePullRequestResponse}
          handlePullRequestEdit={this.props.handlePullRequestEdit}
        />
        <Row>
        <Row style={{margin: 10}}> 
          <h2 className="recipeHeader"> Comparing Changes </h2>
          <h4> Review the changes between the two recipes before creating the pull request </h4> 
        </Row> 
          <Col xs={6} md={6}>
            <h4> Your Recipe Ingredients</h4> 
            <RecipeIngredients ingredientList={this.state.sourceRecipe.ingredients}/>
          </Col>
          <Col xs={6} md={6}>
            <h4> Pull Request Recipe Ingredients</h4> 
            <IngredientsTable ingredientList={this.state.comparisonIngredients}/>
          </Col> 
        </Row> 
        <Row>
          <Col xs={6} md={6}>
            <h4> Your Recipe Steps</h4> 
            <StepsTable steps={this.state.sourceRecipe.steps}/>
          </Col>
          <Col xs={6} md={6}>
            <h4> Pull Request Recipe Steps</h4> 
            <StepsTable steps={this.state.comparisonSteps}/>
          </Col> 
        </Row> 
      </Grid> 
    );
  }
}

export default PullRequestMain;
