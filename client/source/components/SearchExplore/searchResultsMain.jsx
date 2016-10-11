import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

//Bootstrap 
import { Grid, Row, Col, FormGroup, FormControl, Button, Jumbotron, Carousel, Container, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap';

// Axios 
var axios = require('axios'); 

class SearchResultsMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: ''
    };
  }

  componentWillMount() {
    console.log('searchResults main mounting!');
    //make axios request to search endpoint with user entered search terms
    // axios.get()
    this.setState({searchTerm: this.props.params.search});
  }


  render() {
    return (
      <Grid className='SearchResultsMain'> 
        <Row> 
          <h1> Search Results for: {this.state.searchTerm} </h1>
        </Row>
      </Grid>
    );
  }
}

export default SearchResultsMain;