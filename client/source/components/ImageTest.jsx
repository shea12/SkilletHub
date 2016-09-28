import React from 'react';
import { Grid, Row, Col, FormGroup, FormControl, Button, Jumbotron, Carousel } from 'react-bootstrap';


class ImageTest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: 'Enter username', 
      password: ''
    }; 
  }

  handleSubmit (event) {
    console.log(event); 
    console.log(this.state.username, this.state.password);
  }

  handleChange (event) {
    var inputType = event.target.className; 
    if (inputType === 'usernameInput') {
      this.setState({username: event.target.value}); 
    } else {
      this.setState({password: event.target.value}); 
    }
  }

  // TODO: Modify render() to display image (half/whole) similar to Github/Facebook with the sign up form. 

  render() {
    return (
      <Grid>
        <Jumbotron style={{
         'background-image': 'url("http://67.media.tumblr.com/426d4abee7ca7c24c0414edbe35f8ddb/tumblr_nlwab73eK91s4468do1_1280.jpg")',
         'background-size': 'cover'
        }}>
        </Jumbotron>
        <Row className="show-grid">
          <Col xs={4} md={4}>
            <h3 className='signUpPage'> Sign Up </h3>
            <form className="signupForm" onSubmit={this.handleSubmit.bind(this)} method="post">
              <FormGroup controlId="formBasicText">
              <input type="text" onChange={this.handleChange.bind(this)} value={this.state.username} className="usernameInput" name="username"/>
              <input type="password" onChange={this.handleChange.bind(this)} value={this.state.password} className="passwordInput" name="password"/>
              <button type="submit">Sign Up</button>
              </FormGroup>
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default ImageTest;