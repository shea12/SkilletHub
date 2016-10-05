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
      stepsArray: [],
      username: ''
    }; 
  }

  componentWillMount() {
    console.log('Cook Me main page is componentWillMounting!');

    axios.get(`/${this.props.params.username}/${this.props.params.recipe}`)
    .then((result)=> {
      var recipe = result.data; 

      var stepsArray = [];
      for (var i = 0; i < recipe.steps.length; i++) {
        if (recipe.steps[i].time === null) {
          recipe.steps[i].time = '-';
        }
        stepsArray.push({
          stepDescription: recipe.steps[i].description,  //string
          ingredients: recipe.steps[i].ingredients,      //array of strings
          time: recipe.steps[i].time,                    //int
          position: recipe.steps[i].position             //int
        });
      }

      this.setState({
        recipe: recipe,
        stepsArray: stepsArray,
        username: this.props.params.username
      }); 
    })
    .catch((error) => {
      console.log(error);
    }); 
    //use fn 'retreive version' to get full recipe
  }


  render() {
    return (
      <Grid className='cookMeMain' fluid={true}>

        <div className='jumbotron' style={{'background-image': 'url("http://ce.unm.edu/assets/imgs/enrich/cooking-header")'}}>
          <div className='container-fluid'>
            <h1 style={{textAlign: 'center', color: '#0AF7E8'}}>{this.state.username}, let's cook {this.state.recipe.name.value}!</h1>
          </div>
        </div>

        <div className="row" style={{margin: '0 auto'}}>
          {this.state.stepsArray.map((step, index) => (
            <div className="col-md-12" style={{border: '1px solid black', padding: '10px', margin: '0 auto', 'margin-bottom': '10px'}}>
              
              <div className="col-md-1" style={{border: '1px solid green', 'margin-right': '20px', 'height': '100%'}}>
                  {step.time} minutes
              </div>

              <div className="col-md-6" style={{border: '1px solid blue'}}>
                {step.stepDescription}
              </div>

            </div>
          ))}
        </div>
        
      </Grid>
    );
  }
}


export default CookMeMain;