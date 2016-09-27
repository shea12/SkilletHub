import React from 'react';
import { browserHistory, Router, Route, IndexRoute, Link} from 'react-router';
import RecipeList from './RecipeList'

class UserProfile extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      userProfile: {
        name: 'Gordon Ramsey'
      }, 
      recipeList: [],
    }; 
  }

  componentWillMount() {
    console.log('User page is mounting!'); 
    // TODO: Implement request that loads the profile information  
      --> // User Service 

    // TODO: Implement request that loads the recipe list for a given user to this components state. 
      --> // Main Server 
  }

  render() {
    return (
      <div className="userProfile">
        <h3>WELCOME TO YOUR USER PAGE</h3>
        <h6> {this.state.userProfile.name} </h6>
        <RecipeList recipeList={this.state.recipeList} />
      </div>
    );
  }
}

export default UserProfile;
