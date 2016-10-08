import React from 'react';
import { browserHistory, Router, Route, IndexRoute, Link} from 'react-router';
import RecipeListEntry from './RecipeListEntry'; 
import FollowingListEntry from './FollowingListEntry';
import PullRequestEntry from './PullRequestEntry';  

//Bootstrap 
import { Image, Grid, Row, Col, Form, FormGroup, FormControl, Button, Container, ControlLabel, DropdownButton, MenuItem, Nav, NavItem, Badge } from 'react-bootstrap';

// Server Requests
var axios = require('axios');

// Placeholder recipe data 
import placeholders from '../../../../placeholders'

var userProfileTemplate = {
  firstname: '',
  lastname: '',
  email: '',
  createdAt: '',
  bio: ''
}

var pullRequestsTemplate = {
  received: [],
  sent: []
}

class UserProfile extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      userID: null,
      username: '',
      userProfile: userProfileTemplate, 
      image: 'http://www.trbimg.com/img-53c59dde/turbine/la-dd-jacques-pepin-gordon-ramsay-20140715',
      loggedInUserProfile: true,   
      activeKey: 2,
      recipeList: [],
<<<<<<< 6b26c071e7f666c20a46d43e2c3b884989488ac7
      followingList: []
=======
      followingList: placeholders.followingList,
      pullRequests: pullRequestsTemplate
>>>>>>> Modify User component to requst and display data for Pull Request
    }; 
  }

  componentWillMount() {
    console.log('PARAMS USER PAGE: ', this.props.params); 
    var usernameParameter = this.props.params.username; 

    // TODO: Remove this to user a user's actual picture. 
    var userImage = placeholders.images[usernameParameter] || 'https://cdn4.iconfinder.com/data/icons/kitchenware-2/100/04-512.png';  

    // axios.get(`/${usernameParameter}/profile`)
    // .then((results) => {
    //   console.log('USER PROFILE RESULTS DATA'); 
    //   console.log(results.data);

    //   this.setState({
    //     username: usernameParameter, 
    //     userID: this.props.userID,
    //     userProfile: results.data,
    //     image: userImage, 
    //     recipeList: results.data.recipes,
    //   });

    // })
    // .catch((error) => {
    //   console.log(error); 
    // }); 

    /////////
    // PROPER SPREAD WAY TO REQUEST SERVER -> Requires response from server for no pull requests. 
    //////
    axios.all([this.getUser(usernameParameter), this.getPullRequests(usernameParameter)])
    .then(axios.spread((user, pullRequests) => {

      console.log('USER PROFILE RESULTS DATA'); 
      console.log(user.data); 

      console.log('pullRequests DATA'); 
      console.log(pullRequests); 

      this.setState({
        username: usernameParameter, 
        userID: this.props.userID,
        userProfile: user.data,
        image: userImage, 
        recipeList: user.data.recipes,
        pullRequests: pullRequests.data
      }); 

    }))
    .catch((error) => {
      console.log(error); 
    }); 
  }

   componentWillReceiveProps(nextProps) {
    var usernameParameter = nextProps.params.username; 
    var userImage = placeholders.images[usernameParameter] || 'https://cdn4.iconfinder.com/data/icons/kitchenware-2/100/04-512.png';  
    // var otherUser = this.props.username !== username; 
    // console.log('OTHER USER: ', otherUser); 

    axios.get(`/${usernameParameter}/profile`)
    .then((results) => {
      console.log('SUCCESSFULLY REQUESTED PROFILE'); 
      console.log(results.data.recipes); 
      this.setState({
        username: usernameParameter, 
        userID: this.props.userID,
        userProfile: results.data,
        image: userImage, 
        recipeList: results.data.recipes,
        loggedInUserProfile: this.props.loggedInUserProfile,
        activeKey: 2
      }); 
    })
    .catch((error) => {
      console.log(error); 
    }); 
  }

  getUser(usernameParameter) {
    return axios.get(`/${usernameParameter}/profile`); 
  }

  getPullRequests(usernameParameter) {
    return axios.get(`/${usernameParameter}/get-pulls`); 
  }

  handleTabSelect(eventKey) {
    event.preventDefault(); 
    this.setState({activeKey: eventKey}); 
  }

  requestPullRequests(event) {
    event.preventDefault(); 
    console.log('requesting pull request data!'); 
    var usernameParameter = this.props.params.username; 
    axios.get(`/${usernameParameter}/get-pulls`)
    .then((result) => {
      console.log('successful request pull'); 
      console.log(result); 
    })
    .catch((error) => {
      console.log(error); 
    }); 
  }

  _renderActiveComponent(){
    // Determine functionality for button in recipe view 
      // If loading current user profile page -> cook 
    if (this.state.loggedInUserProfile) {
      var buttonText = 'edit'; 
      var handleButtonClick = this.props.handleRecipeEditClick; 
    } else {
      var buttonText = 'fork'; 
      var handleButtonClick = this.props.handleRecipeForkClick; 
    }
    if (this.state.activeKey === 2) {
      return (
        this.state.recipeList.map((recipe, i) => (
          <RecipeListEntry 
            key={recipe.rootRecipeId} 
            recipe={recipe} 
            username={this.state.username}
            buttonText={buttonText}
            handleForkedFromUserClick={this.props.handleUserClick} 
            handleRecipeViewClick={this.props.handleRecipeViewClick}
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
    } else if (this.state.activeKey === 5) {
      return (
        this.state.pullRequests.received.map((pullRequest, i) => (
           <PullRequestEntry 
            key={'pullRequest' + i} 
            pullRequest={pullRequest}
            username={this.props.params.username}
            handleUserClick={this.props.handleUserClick}
            handlePullRequestClick={this.props.handlePullRequestClick}
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
            <p> {this.state.userProfile.bio} </p> 
            <p> {this.state.userProfile.email} </p>
            <p> {this.state.userProfile.createdAt} </p>
          </Col> 
          <Col xs={8} md={8}>
            <div style={{borderRadius: 5, background: 'rgba(128,128,128, 0.2)', border: 'solid 1px rgba(173,216,230, 0.7)', marginBottom: 10}}>
              <h5 style={{marginLeft: 10}}> Get Cooking! </h5>
              <h6 style={{marginLeft: 10}}> Click here to get started by creating a new recipe! </h6> 
            </div> 
            <Nav bsStyle="tabs" justified activeKey={this.state.activeKey} onSelect={this.handleTabSelect.bind(this)} style={{marginTop: 20}}>
              <NavItem eventKey={1} disabled>Overview</NavItem>
              <NavItem eventKey={2} title="Recipes">Recipes</NavItem>
              <NavItem eventKey={3} title="Following">Following</NavItem>
              <NavItem eventKey={4} disabled> Followers </NavItem>
              <NavItem eventKey={5} >Pull Requests <Badge> {this.state.pullRequests.received.length} </Badge></NavItem>
            </Nav>
            {this._renderActiveComponent()}
          </Col>
        </Row> 
        <Row>
          <Button type="submit" onClick={this.requestPullRequests.bind(this)}> pulls </Button> 
        </Row> 
      </Grid> 
    );
  }
}

export default UserProfile;


