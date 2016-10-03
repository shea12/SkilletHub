import React, {Component} from 'react';
import { Image, Grid, Row, Col, Form, FormGroup, Badge, ProgressBar, FormControl, Button, Container, ControlLabel, DropdownButton, MenuItem, Nav, NavItem } from 'react-bootstrap';

export default ({user, handleUserClick}) => {

  return (
        <Row height={50}> 
          <Col xs={6} md={6}> 
            <h2 id={user.username} onClick={handleUserClick.bind(this)}> {user.username} </h2> 
            <h4 id={user.recipes}> this user has {user.recipes} recipes </h4>
          </Col> 
          <Col xs={4} md={4} style={{marginTop: 20}}> 
            <h4> skilletHub skill level: </h4>  
            <ProgressBar bsStyle={'success'} now={user.skillLevel} label={`${user.skillLevel}%`}/>
          </Col>
          <Col xs={2} md={2} style={{marginTop: 20}}> 
            <h4> forks </h4> 
            <Badge>{user.totalForks}</Badge>
          </Col>
        </Row>
    )
}
