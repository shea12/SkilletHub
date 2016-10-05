import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

//Bootstrap 
import { Grid, Row, Col, FormGroup, FormControl, Button, Jumbotron, Carousel, Container, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap';

// Axios 
var axios = require('axios'); 

class CookMeMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: {
        name: {
          value: ''
        }
      },
      username: ''
    }; 
  }

  componentWillMount() {
    console.log('Cook Me main page is componentWillMounting!');

    axios.get(`/${this.props.params.username}/${this.props.params.recipe}`)
    .then((result)=> {
      var recipe = result.data; 
      this.setState({
        recipe: recipe,
        username: this.props.params.username
      }); 
    })
    .catch((error)=> {
      console.log(error); 
    }); 
    //use fn 'retreive version' to get full recipe
  }


  render() {
    return (
      <Grid className='cookMeMain' fluid='true'>

        <div className='jumbotron'>
          <div className='container-fluid'>
            <h1>{this.state.username}, let's cook {this.state.recipe.name.value}!</h1>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">col-md-12</div>
        </div>
        
      </Grid>
    );
  }
}


export default CookMeMain;