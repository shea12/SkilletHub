import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import RecipeDescription from '../Recipe/RecipeDescription'; 

//Bootstrap 
import { Grid, Row, Col, Table, Button, Form, FormGroup, FormControl, ControlLabel, Well, Panel } from 'react-bootstrap';

// Placeholder recipe data 
import placeholders from '../../../../placeholders'

// Axios 
var axios = require('axios'); 

class IssuesMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: placeholders.recipeTemplate, 
      title: 'Title', 
      issueType: 'general comment',   
      text: '',
      selectDisabled: true,
      buttonDisabled: true, 
      clearedTitle: false, 
      clearedDetails: false, 
      details: 'Leave a comment',
      position: ''
    }
  }

  componentWillMount() {
    var usernameParameter = this.props.params.username; 
    var recipeParameter = this.props.params.recipe; 
    var issueObject = this.props.params.issueObject; 

    axios.get(`/${usernameParameter}/${recipeParameter}`)
    .then((result)=> {
      var recipe = result.data; 
      console.log('RECIPE: ', recipe);       
      this.setState({
        recipe: recipe
      }); 
    })
    .catch((error) => {
      console.log(error); 
    }); 
  }

  handleChange (event) {
    var inputType = event.target.id; 
    if (inputType === 'title') {
      this.setState({title: event.target.value}); 
    } else if (inputType === 'issueType') {
      this.setState({issueType: event.target.value, selectDisabled: false}); 
    } else if (inputType === 'details') {
      this.setState({details: event.target.value}); 
    } else if (inputType === 'position') {
      this.setState({position: event.target.value}); 
    } 
  }

  handleClick (event) {
    event.preventDefault(); 
    console.log('Clicked on: ', event.target); 
    var issueObject = {}; 
    issueObject.title = this.state.title; 
    issueObject.data = this.state.details; 
    if (this.state.issueType === 'ingredient' || this.state.issueType === 'step') {
      issueObject.type = this.state.issueType; 
      issueObject.position = this.state.position; 
    }
    issueObject.usernameParameter = this.props.params.username; 
    issueObject.recipeParameter = this.props.params.recipe; 
    this.props.handleNewIssueSubmit(issueObject); 
  }

  handleFocus(event) {
    event.preventDefault(); 
    var focus = event.target.id; 
    if (focus === 'title' && !this.state.clearedTitle) {
      this.setState({
        title: '',
        clearedTitle: true
      }); 
    }
    if (focus === 'details' && !this.state.clearedDetails) {
      this.setState({
        details: '',
        clearedDetails: true
      }); 
    }
  }

  _renderPositionSelect() {
    var issueType = this.state.issueType; 
    if (issueType === 'ingredient') {
      return (
        <FormGroup style={{margin: 5}}>
          <ControlLabel>{this.state.issueType}</ControlLabel>
          <FormControl componentClass="select" id="position" onChange={this.handleChange.bind(this)} >
            {this.state.recipe.ingredients.map((ingredient, i)=> (
              <option key={'ingredient' + i} value={ingredient.position}>{ingredient.position} : {ingredient.name}</option>
            ))}
          </FormControl>
        </FormGroup>
      )
    } else if (issueType === 'step') {
      return (
        <FormGroup style={{margin: 5}}>
          <ControlLabel>{this.state.issueType}</ControlLabel>
          <FormControl componentClass="select" id="position" onChange={this.handleChange.bind(this)} >
            {this.state.recipe.steps.map((step, i)=> (
              <option key={'step' + i} value={step.position}>{step.position} : {step.description.slice(0, 30)}...</option>
            ))}
          </FormControl>
        </FormGroup>
      )
    } else if (issueType === 'general comment') {
      return (
        <h5 style={{marginTop: 10}}> Write in your comments on the recipe here. Please note, if you have a comment regarding a specific ingredient or step in this recipe, please select 'Ingredient' or 'Step' from the dropdown. </h5> 
      )
    }
  }

  _renderSubmitButton(){
    if (this.state.title !== 'Title' && this.state.details !== 'Leave a comment' && this.state.details !== '') {
      return (
        <Button bsStyle="success" style={{margin: 15 }} onClick={this.handleClick.bind(this)}>Submit New Issue</Button> 
      )
    } else {
      return (
        <Button disabled bsStyle="success" style={{margin: 15 }} onClick={this.handleClick.bind(this)}>Submit New Issue</Button> 
      )
    }
  }

  render() {
    return (
      <Grid>
        <h3> Issues </h3>
        <Row style={{margin: 10}}> 
          <h3 className="recipeHeader"> {this.state.recipe.username} / {this.state.recipe.name.value}</h3>
        </Row> 
        <Row>
          <Col xs={6} md={6}>
            <Well>
              <img style={{maxWidth: '350px', maxHeight: '350px', display: 'block', margin: 'auto'}} src={this.state.recipe.picture.value} alt={'picture of food'}/>
            </Well>
          </Col>
          <Col xs={6} md={6}>
              <RecipeDescription style={{height: '350px'}} recipeDescription={this.state.recipe} handleClick={this.handleClick.bind(this)}/>
          </Col> 
        </Row> 
        <Row> 
          <h3> Create New Issue </h3>
          <h5> Issues are used to collaborate with the Skillet Hub to iteratively develop recipes and discuss cooking techniques and best practices. </h5> 
        </Row> 
        <Row> 
          <Col xs={10} md={10} xsOffset={1} mdOffset={1} style={{marginTop: 10}}>
            <Panel> 
              <Row> 
                <FormGroup style={{margin: 15}}>
                  <ControlLabel>Issue Title</ControlLabel>
                  <FormControl type="text" id="title" value={this.state.title} onChange={this.handleChange.bind(this)} onFocus={this.handleFocus.bind(this)}/>
                </FormGroup>
              </Row> 
              <Row> 
                <Col xs={6} md={6} >
                  <FormGroup style={{margin: 5}}>
                    <ControlLabel>Issue Type</ControlLabel>
                    <FormControl componentClass="select" id="issueType" onChange={this.handleChange.bind(this)}>
                      <option key="1" value="general comment">General Comment</option>
                      <option key="2" value="step">Step</option>
                      <option key="3" value="ingredient">Ingredient</option>
                    </FormControl>
                  </FormGroup>
                </Col> 
                <Col xs={6} md={6} >
                  {this._renderPositionSelect()}
                </Col> 
              </Row>
              <Row> 
                <FormGroup style={{margin: 15 }}>
                  <ControlLabel>Issue Details</ControlLabel>
                  <FormControl componentClass="textarea" id="details" value={this.state.details} onChange={this.handleChange.bind(this)} onFocus={this.handleFocus.bind(this)} style={{minHeight: 150}}/>
                </FormGroup>
              </Row>
              <Row> 
                {this._renderSubmitButton()}
              </Row>   
            </Panel> 
          </Col>
        </Row> 
        <Row> 
          <p>{JSON.stringify(this.state.issueObject)}</p>
        </Row>
      </Grid> 
    )
  }
}

export default IssuesMain; 

