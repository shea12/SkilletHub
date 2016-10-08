import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import RecipeIngredients from '../Recipe/RecipeIngredients'; 
import IngredientsTable from './IngredientsTable'; 
import StepsTable from './StepsTable'; 
import PullRequestControl from './PullRequestControl'; 

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
    var pullRecipeRoute = `/${usernameParameter}/${recipeParameter}/${branchParameter}/${versionParameter}`; 

    // Route for the recipe that the pull request is being submitted to
    var sourceUsernameParameter = this.props.params.sourceUser; 
    var sourceRecipeParameter = this.props.params.sourceRecipe; 
    var sourceRecipeRoute = `/${sourceUsernameParameter}/${sourceRecipeParameter}`; 

    axios.all([this.getRecipe(pullRecipeRoute), this.getRecipe(sourceRecipeRoute)])
    .then(axios.spread((pull, source) => {

      var pullRecipe = pull.data;
      var sourceRecipe = source.data; 
      var comparisonIngredients = this.markupIngredients(pullRecipe.ingredients, sourceRecipe.ingredients); 
      var comparisonSteps = this.markupStepsSimple(pullRecipe.steps, sourceRecipe.steps); 

      this.setState({
        pullRecipe: pullRecipe,
        sourceRecipe: sourceRecipe,
        pullRecipeUser: usernameParameter,
        sourceRecipeUser: sourceUsernameParameter,
        comparisonIngredients: comparisonIngredients,
        comparisonSteps: comparisonSteps
      }); 


    }));
  }

  getRecipe(route) {
    return axios.get(route); 
  }

  markupIngredients(pullIngredients, sourceIngredients) {

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

  // markupSteps(pullSteps, sourceSteps) {

  //   var comparisonSteps = []; 
  //   var addedSteps = []; 

  //   // Handles applying properties to the edited, unedited and deleted ingredients from original recipe 
  //   sourceSteps.forEach((step, i) => {
  //     var pullStep = _.findWhere(pullSteps, {position: step.position}); 
  //     if (pullStep) {
  //       if (step.description !== pullStep.description) {
  //         var comparisonStep = _.extend({}, pullStep); 
  //         comparisonStep.edited = true; 
  //       } else {
  //         var comparisonStep = _.extend({}, step); 
  //       }
  //       comparisonSteps.push(comparisonStep); 
  //     } else {
  //       ingredient.deleted = true; 
  //       comparisonIngredients.push(ingredient); 
  //     }
  //   }); 

  //   // Handles highlighting the added ingredients
  //   pullIngredients.forEach((ingredient) => {
  //     var pullIngredient = _.findWhere(sourceIngredients, {name: ingredient.name}); 
  //     if (!pullIngredient) {
  //       ingredient.added = true; 
  //       addedIngredients.push(ingredient); 
  //     }
  //   }); 

  //   return comparisonIngredients.concat(addedIngredients); 
  // }

  markupStepsSimple(pullSteps, sourceSteps) {

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

    pullSteps.forEach((step, i) => {
      if (i > index) {
        step.added = true; 
        addedSteps.push(step); 
      }
    }); 

    return comparisonSteps.concat(addedSteps); 
  }

  markupStepsSimple(pullSteps, sourceSteps) {

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

    pullSteps.forEach((step, i) => {
      if (i > index) {
        step.added = true; 
        addedSteps.push(step); 
      }
    }); 

    return comparisonSteps.concat(addedSteps); 
  }

  createPullRequest(event) {
    event.preventDefault(); 
    var pullRequestObject = {};
    pullRequestObject.targetUsername = this.state.sourceRecipeUser; 
    pullRequestObject.sourceVersionId = this.state.pullRecipe._id; 
    pullRequestObject.targetVersionId = this.state.sourceRecipe._id; 
    this.props.handleCreatePullRequest(pullRequestObject); 
  }

  render() {
    return (
      <Grid >
        <PullRequestControl
          username={this.state.pullRecipe.username}
          recipename={this.state.pullRecipe.name.value}
          pullBranch={this.state.pullRecipe.branch}
          pullVersion={this.state.pullRecipe._id}
          sourceBranch={this.state.sourceRecipe.branch}
          sourceVersion={this.state.sourceRecipe._id}
          createPullRequest={this.createPullRequest.bind(this)}
        />
        <Row>
        <Row style={{margin: 10}}> 
          <h2 className="recipeHeader"> Comparing Changes </h2>
          <h4> Review the changes between the two recipes before creating the pull request </h4> 
        </Row> 
          <Col xs={6} md={6}>
            <h4> Your Recipe Ingredients</h4> 
            <IngredientsTable ingredientList={this.state.comparisonIngredients}/>
          </Col>
          <Col xs={6} md={6}>
            <h4> Source Recipe Ingredients</h4> 
            <RecipeIngredients ingredientList={this.state.sourceRecipe.ingredients}/>
          </Col> 
        </Row> 
        <Row>
          <Col xs={6} md={6}>
            <h4> Your Recipe Steps</h4> 
            <StepsTable steps={this.state.comparisonSteps}/>
          </Col>
          <Col xs={6} md={6}>
            <h4> Source Recipe Steps</h4> 
            <StepsTable steps={this.state.sourceRecipe.steps}/>
          </Col> 
        </Row> 
      </Grid> 
    );
  }
}

export default PullRequestMain;
