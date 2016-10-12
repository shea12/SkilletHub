import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import ExploreList from './ExploreList'; 

//Bootstrap 
import { Grid, Row, Col, Table, Button, Form, FormGroup, FormControl, ControlLabel, Well } from 'react-bootstrap';

// Axios 
var axios = require('axios'); 

class ExploreMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newRecipes: [], 
      popularRecipes: [], 
      trendingRecipes: []
    }
  }

  componentWillMount() {
    axios.get(`/Explore`)
    .then((results) => {
      console.log('Successful explore request'); 
      console.log(results.data); 
      var exploreResults = results.data; 
      this.setState({
        newRecipes: exploreResults.byDates,
        popularRecipes: exploreResults.byForks, 
        trendingRecipes: exploreResults.byRandom
      }); 
    }); 
  }

  render() {
    return (
      <Grid>
        <Row> 
          <h3> Explore </h3>
        </Row> 
        <Row>
          <Col xs={4} md={4}>
            <h4> The Cutting Edge </h4> 
            <p> Browse through Skillet Hub's newest recipes and stay up to date on the latest in taste-driven development. </p> 
            <ExploreList name="newRecipes" recipeList={this.state.newRecipes} handleUserClick={this.props.handleUserClick} handleRecipeCookClick={this.props.handleRecipeCookClick} handleRecipeForkClick={this.props.handleRecipeForkClick}/>
          </Col>
          <Col xs={4} md={4}>
            <h4> The Unicorns </h4> 
            <p> The myths. The legends. The most popular recipes on Skillet Hub. </p> 
            <ExploreList name="popularRecipes" recipeList={this.state.popularRecipes} handleUserClick={this.props.handleUserClick} handleRecipeCookClick={this.props.handleRecipeCookClick} handleRecipeForkClick={this.props.handleRecipeForkClick}/>
          </Col>
          <Col xs={4} md={4}>
            <h4> The Hot List </h4> 
            <p> These recipes are the currently trending topics in Skillet Hub's community. </p> 
            <ExploreList name="trendingRecipes" recipeList={this.state.trendingRecipes} handleUserClick={this.props.handleUserClick} handleRecipeCookClick={this.props.handleRecipeCookClick} handleRecipeForkClick={this.props.handleRecipeForkClick}/>
          </Col>
        </Row> 
      </Grid> 
    )
  }
}

export default ExploreMain; 