import React from 'react';
import { browserHistory, Router, Route, IndexRoute, Link} from 'react-router';
import RecipeListEntry from './RecipeListEntry'; 
import FollowingListEntry from './FollowingListEntry'; 

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
      otherUser: false,   
      firstname: '',
      lastname: '',
      email: '',
      image: 'http://www.trbimg.com/img-53c59dde/turbine/la-dd-jacques-pepin-gordon-ramsay-20140715',
      userProfile: null, 
      recipeList: [],
      bio: 'Click here to write a short bio',
      activeKey: 2,
      followingList: placeholders.followingList
    }; 
  }

  componentWillMount() {
    console.log('PARAMS USER PAGE: ', this.props.params); 
    var username = this.props.params.username; 
    var userImage = placeholders.images[username] || 'https://cdn4.iconfinder.com/data/icons/kitchenware-2/100/04-512.png';  

    axios.get(`/${this.props.params.username}/profile`)
    .then((results) => {
      console.log('USER PROFILE RESULTS'); 
      console.log(results); 
      console.log('USER PROFILE RESULTS DATA'); 
      console.log(results.data); 
      this.setState({
        username: this.props.params.username, 
        userID: this.props.userID,
        date: 'May 4th, 2012', 
        image: userImage, 
        recipeList: results.data.recipes
      }); 
    })
    .catch((error) => {
      console.log(error); 
    }); 
  }

   componentWillReceiveProps(nextProps) {
      console.log('RECEIVING PROPS!'); 
      console.log('PARAMS USER PAGE: ', nextProps.params);
      console.log(nextProps); 
      var username = nextProps.params.username; 
      var userImage = placeholders.images[username] || 'https://cdn4.iconfinder.com/data/icons/kitchenware-2/100/04-512.png';  
      var otherUser = this.props.username !== username; 
      console.log('OTHER USER: ', otherUser); 

      axios.get(`/${username}/profile`)
      .then((results) => {
        console.log('SUCCESSFULLY REQUESTED PROFILE'); 
        console.log(results.data.recipe); 
        this.setState({
          username: username, 
          date: 'May 4th, 2012', 
          otherUser: otherUser, 
          image: userImage, 
          recipeList: results.data.recipes,
          activeKey: 2
        }); 
      })
      .catch((error) => {
        console.log(error); 
      }); 
    }

  handleSelect(eventKey) {
    event.preventDefault(); 
    this.setState({activeKey: eventKey}); 
  }

  _renderActiveComponent(){
    // Determine functionality for button in recipe view 
      // If loading current user profile page -> cook 
    if (this.state.otherUser) {
      var buttonText = 'fork'; 
      var handleButtonClick = this.props.handleRecipeForkClick; 
    } else {
      var buttonText = 'edit'; 
      var handleButtonClick = this.props.handleRecipeEditClick; 
    }
    if (this.state.activeKey === 2) {
      return (
        this.state.recipeList.map((recipe, i) => (
          <RecipeListEntry 
            key={recipe.rootRecipeId} 
            recipe={recipe} 
            username={this.state.username}
            buttonText={buttonText}
            handleUserClick={this.props.handleUserClick} 
            handleRecipeClick={this.props.handleRecipeViewClick}
            handleButtonClick={handleButtonClick}
          />
        ))
      )
    } else if (this.state.activeKey === 3) {
      return (
        this.state.followingList.map((user, i) => (
           <FollowingListEntry 
            key={'following' + i} 
            user={user} 
            handleUserClick={this.props.handleUserClick}
          />
        ))
      )
    }
  }

  render() {
    return (
      <Grid> 
        <Row> 
          <Col xs={4} md={4}>
            <img src={this.state.image} width={250} height={250} style={{borderRadius: 10}} />
            <h3> {this.state.username} </h3>
            <p> {this.state.bio} </p> 
            <p> {this.state.email} </p>
            <p> {this.state.date} </p>
          </Col> 
          <Col xs={8} md={8}>
            <div style={{borderRadius: 5, background: 'rgba(128,128,128, 0.2)', border: 'solid 1px rgba(173,216,230, 0.7)', marginBottom: 10}}>
              <h5 style={{marginLeft: 10}}> Get Cooking! </h5>
              <h6 style={{marginLeft: 10}}> Click here to get started by creating a new recipe! </h6> 
            </div> 
            <Nav bsStyle="tabs" justified activeKey={this.state.activeKey} onSelect={this.handleSelect.bind(this)} style={{marginTop: 20}}>
              <NavItem eventKey={1} disabled>Overview</NavItem>
              <NavItem eventKey={2} title="Recipes">Recipes</NavItem>
              <NavItem eventKey={3} title="Following">Following</NavItem>
              <NavItem eventKey={4} disabled>Followers</NavItem>
              <NavItem eventKey={5} disabled>Favorites</NavItem>
            </Nav>
            {this._renderActiveComponent()}
          </Col>
        </Row> 
      </Grid> 
    );
  }
}

export default UserProfile;


