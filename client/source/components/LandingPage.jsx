import React from 'react';
import { Grid, Row, Col, FormGroup, FormControl, Button, Jumbotron, Carousel, Container, ControlLabel } from 'react-bootstrap';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '1UserTest', 
      password: '8Characters!',
      firstname: 'test',
      lastname: 'user3',
      email: 'testuser3@email.com'
    }; 
  }

  handleSubmit (event) {
    // debugger;
    event.preventDefault(); 
    console.log(event); 
    console.log(this.state.username, this.state.password);
    var user = this.state; 
    this.props.handleSignUp(user);
  }

  handleChange (event) {
    var inputType = event.target.id; 
    if (inputType === 'username') {
      this.setState({username: event.target.value}); 
    } else if (inputType === 'password') {
      this.setState({password: event.target.value}); 
    } else if (inputType === 'firstname') {
      this.setState({firstname: event.target.value}); 
    } else if (inputType === 'lastname') {
      this.setState({lastname: event.target.value}); 
    } else if (inputType === 'email') {
      this.setState({email: event.target.value}); 
    }
  }

  // TODO: Modify render() to display image (half/whole) similar to Github/Facebook with the sign up form. 

  render() {
    return (
        <Jumbotron style={{
         'backgroundImage': 'url(\"http://67.media.tumblr.com/426d4abee7ca7c24c0414edbe35f8ddb/tumblr_nlwab73eK91s4468do1_1280.jpg\")',
         'backgroundSize': 'cover',
         'height': 940
        }}> 
          <Row className="show-grid">
            <Col xs={4} xsOffset={7} md={4} mdOffset={7}> 
            <form onSubmit={this.handleSubmit.bind(this)} style={{'background':'white', 'height': 300, 'borderRadius': 10}}>
              <FormGroup style={{padding: 10}}>
                <ControlLabel> Sign Up For SkilletHub </ControlLabel>
                <FormControl type="text" id="username" onChange={this.handleChange.bind(this)} value={this.state.username} name="username" style={{margin: 5}}/>
                <FormControl type="password" id="password" onChange={this.handleChange.bind(this)} value={this.state.password} name="password" style={{margin: 5}}/>
                <FormControl type="text" id="firstname" onChange={this.handleChange.bind(this)} value={this.state.firstname} name="firstname" style={{margin: 5}}/>
                <FormControl type="text" id="lastname" onChange={this.handleChange.bind(this)} value={this.state.lastname} name="lastname" style={{margin: 5}}/>
                <FormControl type="text" id="email" onChange={this.handleChange.bind(this)} value={this.state.email} name="email" style={{margin: 5}}/>
                <Button type="submit" style={{margin: 5}} bsSize="large" block>Sign Up</Button>  
              </FormGroup>
            </form>
            </Col>
          </Row>
        </Jumbotron>
    );
  }
}



export default LandingPage;
