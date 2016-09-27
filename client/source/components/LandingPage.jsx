import React from 'react';

class LandingPage extends React.Component {

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
        <div className='signUpPage'>
        <h1 className='signUpPage'>Welcome to SkilletHub</h1>
        <h1 className='signUpPage'> Sign Up </h1>
        <form className="signupForm" onSubmit={this.handleSubmit.bind(this)} method="post">
          <input type="text" onChange={this.handleChange.bind(this)} value={this.state.username} className="usernameInput" name="username"/>
          <input type="password" onChange={this.handleChange.bind(this)} value={this.state.password} className="passwordInput" name="password"/>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}

export default LandingPage;
