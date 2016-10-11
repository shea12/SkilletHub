import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

//Bootstrap 
import { Image, Grid, Row, Col, Form, FormGroup, Badge, ProgressBar, Jumbotron, Carousel, FormControl, Button, Container, ControlLabel, DropdownButton, MenuItem, Nav, NavItem } from 'react-bootstrap';
const progressBarStyles = ['success', 'warning', 'danger']; 

// Axios 
var axios = require('axios'); 

class SearchResultsMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      searchResultsArray: []
    };
  }

  componentWillMount() {
    console.log('searchResults main mounting!');
    var username = this.props.username;
    var searchTerm = this.props.params.search;
    //need to remove spaces from the seach string and replace
    //  the spaces with + sign
    var searchTermPlus = searchTerm.replace(/\s+/g, '+').toLowerCase();

    //make axios request to search endpoint with user entered search terms
    axios.get(`/search/${searchTermPlus}`)
    .then((result) => {
      var searchResultsArray = result.data;
      console.log('results: ', result);
      this.setState({
        searchResultsArray: searchResultsArray,
        searchTerm: searchTerm,
        username: username
      });
    })
    .catch((error) => {
      console.log('error getting search results: ', error);
    })
  }

  render() {
    return (
      <Grid className='SearchResultsMain'> 
        <Row> 
          <h1> Search Results for: {this.state.searchTerm} </h1>
        </Row>

        <div className="row" style={{margin: '0 auto', width: '980px'}} >
          {this.state.searchResultsArray.map((recipe, index) => (
          <div className="col-md-12" style={{padding: '10px', marginBottom: '20px', borderRadius: '6px', height: '240px', width: '940px'}}>
            <div className="col-md-10" style={{border: '1px solid rgba(128, 128, 128, 0.2)', borderRadius: '6px', height: '140px'}}>
              <Row height={50}> 
                <Col xs={6} md={6}> 
                  <h2 data-recipe={recipe.rootRecipeId} data-username={this.state.username}> {recipe.name.value || 'Master Recipe'} </h2> 
                  <h5 data-recipe={recipe.rootRecipeId} data-username={this.state.username}> recipe id: {recipe.rootRecipeId} </h5>
                </Col> 
                <Col xs={4} md={4} style={{marginTop: 25}}>  
                  <ProgressBar bsStyle={progressBarStyles[(Math.floor(Math.random() * 4))]} now={(Math.floor(Math.random() * 100))} />
                </Col>
                <Col xs={2} md={2} style={{marginTop: 20}}> 
                  <h4> forks <Badge>{Math.floor(Math.random() * 20)}</Badge></h4> 
                  <Button data-username={this.state.username} data-recipe={recipe.rootRecipeId} data-branch={'master'} data-version={recipe.branches[0].mostRecentVersionId}> View Recipe </Button> 
                </Col>
              </Row>
            </div>
          </div>
          ))}
        </div>

      </Grid>
    );
  }
}

export default SearchResultsMain;


/*
<div className="row" style={{margin: '0 auto', width: '980px'}} >
  {this.state.searchResultsArray.map((recipe, index) => (
  <div className="col-md-12" style={{padding: '10px', marginBottom: '40px', borderRadius: '6px', height: '240px', width: '940px'}}>
    <div className="col-md-10" style={{border: '1px solid rgba(128, 128, 128, 0.2)', borderRadius: '6px', height: '140px'}}>
      {recipe.name}
    </div>
  </div>
  ))}
</div>
*/






