import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import SearchResultsList from './SearchResultsList'; 

//Bootstrap 
import { Image, Grid, Row, Col, Form, FormGroup, Badge, ProgressBar, Jumbotron, Carousel, FormControl, Button, Container, ControlLabel, DropdownButton, MenuItem, Nav, NavItem } from 'react-bootstrap';

// Axios 
var axios = require('axios'); 

/*
NOTE: SHOULD WE REMOVE USERS OWN RECIPES FROM SEARCH RESULTS??
*/

class SearchResultsMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      searchResultsArray: []
    };
  }

  componentWillMount() {
    this.getSearchResults();
  }

  componentWillReceiveProps(nextProps) {
    var searchTerm = nextProps.params.search;
    this.getSearchResults(searchTerm);
  }

  getSearchResults(searchTerm) {
    var searchTerm = searchTerm || this.props.params.search;
    //need to remove spaces from the seach string and replace
    //  the spaces with + sign
    var searchTermPlus = searchTerm.replace(/\s+/g, '+').toLowerCase();
    console.log('searchTermPlus: ', searchTermPlus);
    //make axios request to search endpoint with user entered search terms
    axios.get(`/search/${searchTermPlus}`)
    .then((result) => {
      var searchResultsArray = result.data;
      console.log('results: ', result);
      this.setState({
        searchResultsArray: searchResultsArray,
        searchTerm: searchTerm
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
          <h1> Search Results For: "{this.state.searchTerm}" </h1>
        </Row>
        <Row>
          <SearchResultsList name="searchResults" recipeList={this.state.searchResultsArray} handleUserClick={this.props.handleUserClick} handleRecipeForkClick={this.props.handleRecipeForkClick} handleRecipeCookClick={this.props.handleRecipeCookClick}/>
        </Row>
      </Grid>
    );
  }
}

export default SearchResultsMain;





