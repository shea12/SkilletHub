import React from 'react';
import { browserHistory, Router, Route, IndexRoute, Link} from 'react-router';
import RecipeListEntry from './RecipeListEntry'; 
import UserStats from './UserStats'; 
import FollowingListEntry from './FollowingListEntry';
import NotificationsListEntry from './NotificationsListEntry';  
import PullRequestEntry from './PullRequestEntry';  

//Bootstrap 
import { Image, Grid, Row, Col, Form, FormGroup, FormControl, Button, Container, ControlLabel, DropdownButton, MenuItem, Nav, NavItem, Badge, Glyphicon } from 'react-bootstrap';

// Server Requests
var axios = require('axios');
var _ = require('underscore'); 

const month = [];
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

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
      followUser: false,    
      activeKey: 1,
      recipeList: [],
      notificationsList: [], 
      followingList: [],
      pullRequests: pullRequestsTemplate
    }; 
  }

  componentWillMount() {
    console.log('PARAMS USER PAGE: ', this.props.params); 
    var usernameParameter = this.props.params.username; 

    // TODO: Remove this to user a user's actual picture. 
    var userImage = placeholders.images[usernameParameter] || 'https://cdn4.iconfinder.com/data/icons/kitchenware-2/100/04-512.png';  

    axios.all([this.getUser(usernameParameter), this.getNotifications(usernameParameter), this.getPullRequests(usernameParameter)])
    .then(axios.spread((user, notifications, pullRequests) => {

      // console.log('USER PROFILE RESULTS DATA'); 
      // console.log(user.data); 

      // console.log('NOTIFICATIONS RESULTS DATA'); 
      // console.log(notifications.data); 

      // console.log('pullRequests DATA'); 
      // console.log(pullRequests.data); 

      var pullRequests = pullRequests.data; 
      var recipes = user.data.recipes; 
      pullRequests.received.forEach((pullRequest) => {
        var pullRequestMatch = _.findWhere(recipes, {rootRecipeId: pullRequest.targetRootVersion}); 
        // console.log('PULL REQUEST MATCH: ', pullRequestMatch); 
        pullRequest.originalName = pullRequestMatch.name; 
      }); 

      console.log('PULL REQUESTS MODIFIED'); 
      console.log(pullRequests); 

      this.setState({
        username: usernameParameter, 
        userID: this.props.userID,
        userProfile: user.data,
        image: userImage, 
        recipeList: user.data.recipes,
        notificationsList: notifications.data, 
        // followingList: following.data, 
        pullRequests: pullRequests,
        followers: user.data.followers
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
        activeKey: 1
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

  getNotifications(usernameParameter) {
    return axios.get(`/${usernameParameter}/get-notifications`); 
  }

  getFollowing(usernameParameter) {
    return axios.get(`/${usernameParameter}/get-followed-users`); 
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

  _renderNavigationBar(){
    if (this.state.loggedInUserProfile) {
      return (
        <Nav bsStyle="tabs" justified activeKey={this.state.activeKey} onSelect={this.handleTabSelect.bind(this)} style={{marginTop: 20}}>
          <NavItem eventKey={1} title="Recipes">Recipes</NavItem>
          <NavItem eventKey={2} title="Notifications">Notifications</NavItem>
          <NavItem eventKey={3} title="Following">Following</NavItem>
          <NavItem eventKey={4} title="PullRequests">Pull Requests <Badge bsStyle="success">{this.state.pullRequests.received.length}</Badge></NavItem>
        </Nav>
      )
    } else {
      return (
        <Nav bsStyle="tabs" justified activeKey={this.state.activeKey} onSelect={this.handleTabSelect.bind(this)} style={{marginTop: 20}}>
          <NavItem eventKey={1} title="Recipes">Recipes</NavItem>
          <NavItem eventKey={2} title="Notifications" disabled>Notifications</NavItem>
          <NavItem eventKey={3} title="Following">Following</NavItem>
          <NavItem eventKey={4} title="PullRequests" disabled>Pull Requests</NavItem>
        </Nav>
      )
    }
  }

  _renderActiveComponent(){
      if (this.state.loggedInUserProfile) {
        var buttonText = 'edit'; 
        var handleButtonClick = this.props.handleRecipeEditClick; 
      } else {
        var buttonText = 'fork'; 
        var handleButtonClick = this.props.handleRecipeForkClick; 
      }
      if (this.state.activeKey === 1 && this.state.recipeList !== undefined) {
        return (
          this.state.recipeList.map((recipe, i) => (
            <RecipeListEntry 
              key={i + '' +recipe.rootRecipeId} 
              recipe={recipe} 
              username={this.state.username}
              branches={recipe.branches.length || 0}
              buttonText={buttonText}
              handleForkedFromUserClick={this.props.handleUserClick} 
              handleRecipeViewClick={this.props.handleRecipeViewClick}
              handleButtonClick={handleButtonClick}
            />
          ))
        )
      } else if (this.state.activeKey === 2 && this.state.notificationsList !== undefined) {
        return (
          this.state.notificationsList.map((notification, i) => (
             <NotificationsListEntry
              key={'notification' + i} 
              user={notification.text.split(' ')[0]} 
              text={notification.text.split(' ').slice(1).join(' ')} 
              handleUserClick={this.props.handleUserClick}
            />
          ))
        )
      } else if (this.state.activeKey === 3 && this.state.followingList !== undefined) {
        return (
          this.state.followingList.map((user, i) => (
             <FollowingListEntry 
              key={'following' + i} 
              user={user} 
              handleUserClick={this.props.handleUserClick}
            />
          ))
        )
      } else if (this.state.activeKey === 4 && this.state.pullRequests !== undefined) {
        return (
          this.state.pullRequests.received.map((pullRequest, i) => (
             <PullRequestEntry 
              key={'pullRequest' + i} 
              pullRequest={pullRequest}
              month={month}
              username={this.props.params.username}
              handleUserClick={this.props.handleUserClick}
              handlePullRequestClick={this.props.handlePullRequestClick}
            />
          ))
        )
      }
    }

  _renderJoinDate(createdAt) {
    if (createdAt) {
      var parseDate = createdAt.split('T')[0].split('-'); 
      return (
        <p><Glyphicon glyph="time" style={{marginRight: 5}}/>{`Joined on ${month[parseDate[1] - 1]} ${parseDate[2]}, ${parseDate[0]}`}</p>
      )
    }
  }

  render() {
    return (
      <Grid> 
        <Row> 
          <Col xs={4} md={4}>
            <img src={this.state.image} width={250} height={250} style={{borderRadius: 10, marginTop: 15}} />
            <h3 style={{color: 'gray'}}> {this.state.username} </h3>
            <p style={{color: 'blue', borderBottom: "1px solid rgba(128,128,128, 0.2)"}}> {this.state.userProfile.bio || 'Add a bio'} </p> 
            <p style={{color: 'blue'}}><Glyphicon glyph="envelope" style={{marginRight: 5}}/>{this.state.userProfile.email}</p>
            {this._renderJoinDate(this.state.userProfile.createdAt)}
          </Col> 
          <Col xs={8} md={8}>
            <UserStats 
              loggedInUserProfile={this.props.loggedInUserProfile} 
              followUser={this.state.followUser}
              recipeCount={this.state.recipeList.length} 
              followers={this.state.followers} 
              handleFollowUserClick={this.props.handleFollowUserClick}
            />
            {this._renderNavigationBar()}
            {this._renderActiveComponent()}
          </Col>
        </Row> 
      </Grid> 
    );
  }
}

export default UserProfile;


