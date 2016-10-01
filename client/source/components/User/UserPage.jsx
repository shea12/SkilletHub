import React from 'react';
import { browserHistory, Router, Route, IndexRoute, Link} from 'react-router';
import RecipeListEntry from './RecipeListEntry'; 

//Bootstrap 
import { Image, Grid, Row, Col, Form, FormGroup, FormControl, Button, Container, ControlLabel, DropdownButton, MenuItem, Nav, NavItem } from 'react-bootstrap';

// Server Requests
var axios = require('axios');

// Placeholder recipe data 
import placeholders from '../../../../placeholders'


class UserProfile extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      username: '',
      userID: null,  
      password: '',
      firstname: '',
      lastname: '',
      email: '',
      image: 'http://www.trbimg.com/img-53c59dde/turbine/la-dd-jacques-pepin-gordon-ramsay-20140715',
      userProfile: null, 
      recipeList: [],
      bio: 'Click here to write a short bio'
    }; 
  }

  componentWillMount() {
    // console.log('User page is mounting!'); 
    // console.log(Object.keys(placeholders)); 
    // TODO: Implement request that loads the profile information  
      --> // User Service 
    this.setState({
      username: this.props.username, 
      userID: this.props.userID,
      date: 'May 4th, 2012'
    }); 

    // TODO: Implement request that loads the recipe list for a given user to this components state. 
      --> // Main Server 
    axios.get(`/${this.props.username}/profile`)
    .then((results) => {
      // console.log(Object.keys(results)); 
      console.log(results.data.recipes); 
      this.setState({
        recipeList: results.data.recipes
      }); 
    })
    .catch((error) => {
      console.log(error); 
    }); 
    // Temporary placeholder values   
    // this.setState({
    //   userProfile: placeholders.user,
    //   recipeList: placeholders.recipes
    // }); 
  }

  handleSelect() {
    console.log('Clicked on this user nav element!'); 
  }

  render() {
    return (
      <Grid> 
        <Row> 
          <Col xs={4} md={4}>
            <img src={this.state.image} width={250} height={250} style={{borderRadius: 10}} />
            <h3> {this.state.username} </h3>
            <h4> {this.state.userID} </h4>
            <p> {this.state.bio} </p> 
            <p> {this.state.email} </p>
            <p> {this.state.date} </p>
          </Col> 
          <Col xs={8} md={8}>
            <div style={{borderRadius: 10, background: '#e8f4f8', border: 'solid 3px #e8f4f8', marginBottom: 10}}>
              <h5> Get Cooking! </h5>
              <h6> Click here to get started by creating a new recipe! </h6> 
            </div> 
            <Nav bsStyle="tabs" justified activeKey={2} onSelect={this.handleSelect} style={{marginTop: 20}}>
              <NavItem eventKey={1} >Overview</NavItem>
              <NavItem eventKey={2} title="Item">Recipes</NavItem>
              <NavItem eventKey={3} disabled>Favorites</NavItem>
              <NavItem eventKey={3} disabled>Followers</NavItem>
              <NavItem eventKey={3} disabled>Following</NavItem>
            </Nav>
            {this.state.recipeList.map((recipe, i) => (
              <RecipeListEntry key={recipe.branches[0].mostRecentVersionId} recipe={recipe} handleUserClick={this.props.handleUserClick} handleRecipeClick={this.props.handleRecipeClick}/>
            ))}
          </Col>
        </Row> 
      </Grid> 
    );
  }
}

export default UserProfile;


