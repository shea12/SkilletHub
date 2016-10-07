import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import RecipeDescription from './RecipeDescription'
import RecipeIngredients from './RecipeIngredients'
import ReadME from './ReadME'
import CookMe from '../CookRecipe/CookMeMain'
import VersionControl from '../VersionControl/VersionControlMain'

//Bootstrap 
import { Grid, Row, Col, Table, Button, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

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
      // user: {},
      username: '', 
      recipeIngredients: [],
      recipeSteps: [],
      selectedBranch: '', 
      branchVersions: [],
      recipeBranches: [], 
      createBranch: ''
    }; 
  }

  componentWillMount() {
    // console.log('Main recipe page is mounting!'); 
    // console.log('PARAMS RECIPE PAGE: ', this.props.params); 
    // var usernameParameter = this.props.params.username; 
    var usernameParameter = this.props.params.username; 
    // console.log('USERNAME PARAMETER:', usernameParameter); 

    var recipeParameter = this.props.params.recipe; 
    // console.log('RECIPE PARAMETER:', recipeParameter); 

    axios.get(`/${usernameParameter}/${recipeParameter}`)
    .then((result)=> {
      // console.log(result.data); 
      // console.log(Object.keys(result.data)); 
      var recipe = result.data; 
      console.log('RECIPE: ', recipe); 
      // console.log('DESCRIPTION:', recipe.description.value); 
      
      this.setState({
        recipe: recipe,
        username: usernameParameter, 
        recipeIngredients: recipe.ingredients, 
        recipeSteps: recipe.steps,
        recipeBranches: recipe.branches,
        selectedBranch: recipe.branch,
        selectedVersion: recipe._id
      }); 

      var branch = recipe.branch; 
      this.requestVersionData(branch); 

    })
    .catch((error)=> {
      console.log('Axios error: ', error); 
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
      event.preventDefault();
      var route = '/CookMe/'+this.state.username+'/'+this.props.params.recipe;
      console.log('NAVIGATING TO:', route); 
      browserHistory.push(`${route}`); 
    }
    if (inputType === 'edit') {
      console.log('Editting recipe'); 

      // TODO: Implement routing (react || server)
    }    
  }

  requestVersionData(branch) {
    var usernameParameter = this.props.params.username; 
    var recipeParameter = this.props.params.recipe; 
    axios.get(`/${usernameParameter}/${recipeParameter}/${branch}/versions`)
    .then((result) => {
      console.log('REQUESTED VERSIONS!'); 
      console.log(result.data); 
      var branchVersions = result.data; 
      console.log(branchVersions); 
      this.setState({
        branchVersions: branchVersions
      }); 
    })
    .catch((error) => {
      console.log(error); 
    }); 
  }

  requestSelectedVersion(event) {
    var usernameParameter = this.props.params.username; 
    var recipeParameter = this.props.params.recipe; 
    var branchParameter = this.state.selectedBranch;
    var versionParemeter = event.target.value; 
    axios.get(`/${usernameParameter}/${recipeParameter}/${branchParameter}/${versionParemeter}`)
    .then((result) => {
      console.log(result.data); 
      console.log(Object.keys(result.data)); 
      var recipe = result.data; 

      console.log('NAME: ', recipe.name.value); 
      console.log('DESCRIPTION:', recipe.description.value); 
      
      this.setState({
        recipe: recipe,
        username: usernameParameter, 
        recipeIngredients: recipe.ingredients, 
        recipeSteps: recipe.steps,
        recipeBranches: recipe.branches,
        selectedVersion: recipe._id
      });

    })
    .catch((error) => {
      console.log(error); 
    }); 
  }

  handleBranchSelect(event) {
    event.preventDefault(); 
    console.log('SELECTED BRANCH!'); 
    var branch = event.target.value; 
    console.log('BRANCH IS:', branch); 
    this.setState({
      selectedBranch: branch
    }); 
    this.requestVersionData(branch); 
  }

  handleVersionSelect(event) {
    event.preventDefault(); 
    console.log('SELECTED VERSION!'); 
    var version = event.target.value; 
    console.log('VERSION IS:', version); 
    this.requestSelectedVersion(event); 
  }

  handleChange (event) {
    var inputType = event.target.id; 
    if (inputType === 'createBranch') {
      this.setState({createBranch: event.target.value}); 
    }
  }

  handleCreateBranch(event) {
    event.preventDefault(); 
    var branch = this.state.createBranch;
    this.requestCreateBranch(branch); 
  }

  requestCreateBranch(branch) {
    var usernameParameter = this.props.params.username; 
    var recipeParameter = this.props.params.recipe; 
    var selectedVersion = this.state.selectedVersion
    console.log('ATTEMPTING TO CREATE BRANCH!'); 
    console.log(branch); 

    axios.post(`/${usernameParameter}/${recipeParameter}/${branch}`, {
      versionId: selectedVersion
    })
    .then((result) => {
      console.log('CREATED NEW BRANCH'); 
      console.log(result); 
      browserHistory.push(`/Recipe/${usernameParameter}/${recipeParameter}`); 
    })
    .catch((error) => {
      console.log(error); 
    }); 
  }

  _renderCreateBranch(){
    var branch = this.state.selectedBranch; 
    if (branch === 'create branch') {
      return (
        <form onSubmit={this.handleCreateBranch.bind(this)}> 
          <FormGroup>
            <ControlLabel>New Branch</ControlLabel>
              <FormControl type="text" id='createBranch' value={this.state.createBranch} onChange={this.handleChange.bind(this)} />
          </FormGroup>
          <Button type='submit' style={{display: 'none'}}>
            submit
          </Button>
        </form> 
      )
    } else {
      return (
        <FormGroup>
          <ControlLabel>Version</ControlLabel>
          <FormControl componentClass="select" id="unit" onChange={this.handleVersionSelect.bind(this)} >
            {this.state.branchVersions.map((version, i)=> (
              <option key={'version' + i} value={version._id}>{version._id} : version {i}</option>
            ))}
          </FormControl>
        </FormGroup>
      )
    }
  }

  render() {
    return (
      <Grid className="recipeMain">
        <Row style={{margin: 10}}> 
          <h3 className="recipeHeader"> {this.state.username} / {this.state.recipe.name.value}</h3>
        </Row> 
        <Row>
          <Col xs={6} md={6}>
            <img style={{maxWidth: '350px', maxHeight: '350px', display: 'block', margin: 'auto'}} src={this.state.recipe.picture.value} alt={'picture of food'}/>
          </Col>
          <Col xs={6} md={6}>
            <RecipeDescription recipeDescription={this.state.recipe} handleClick={this.handleClick.bind(this)}/>
          </Col> 
        </Row> 
        <VersionControl /> 
        <Row> 
          <Col xs={3} md={3}> 
          <FormGroup>
            <ControlLabel>Branch</ControlLabel>
            <FormControl componentClass="select" id="unit" onChange={this.handleBranchSelect.bind(this)} value={this.state.selectedBranch}>
              <optgroup label='available branches'> 
              {this.state.recipeBranches.map((branch, i)=> (
                <option key={'branch' + i} value={branch.name}>{branch.name}</option>
              ))}
              </optgroup>
              <optgroup label='new branch'>
                <option key={'create branch'} value={'create branch'}> create branch </option> 
              </optgroup>
            </FormControl>
          </FormGroup>
          </Col> 
          <Col xs={3} md={3}>
            {this._renderCreateBranch()}
          </Col>
        </Row> 
        <RecipeIngredients ingredientList={this.state.recipeIngredients}/>
        <ReadME readME={this.state.recipeSteps}/>
      </Grid> 
    );
  }
}

export default RecipeMain;

            // <FormGroup>
            //   <ControlLabel>Version</ControlLabel>
            //   <FormControl componentClass="select" id="unit" onChange={this.handleVersionSelect.bind(this)} >
            //     {this.state.branchVersions.map((version, i)=> (
            //       <option key={'version' + i} value={version._id}>{version._id} : version {i}</option>
            //     ))}
            //   </FormControl>
            // </FormGroup>
