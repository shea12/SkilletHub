import React from 'react';
import { browserHistory, Router, Route, IndexRoute, Link} from 'react-router';
import RecipeList from './RecipeList'

// Placeholder recipe data 
import placeholders from '../../../placeholders'

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

    // Temporary placeholder values   
    this.setState({
      userProfile: placeholders.user,
      recipeList: placeholders.recipes
    }); 
  }

  render() {
    return (
      <div className="userProfile">
        <h3>WELCOME TO YOUR USER PAGE</h3>
        <h4> {this.state.userProfile.name} </h4>
        <h5>Recipe List: </h5>
        <RecipeList recipeList={this.state.recipeList} />
      </div>
    );
  }
}

export default UserProfile;
