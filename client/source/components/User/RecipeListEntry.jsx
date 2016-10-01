var axios = require('axios');
import React, {Component} from 'react';
import { Image, Grid, Row, Col, Form, FormGroup, Badge, ProgressBar, FormControl, Button, Container, ControlLabel, DropdownButton, MenuItem, Nav, NavItem } from 'react-bootstrap';

const progressBarStyles = ['success', 'warning', 'danger']; 

export default ({recipe, handleUserClick, handleRecipeClick}) => {
  return (
        <Row height={50}> 
          <Col xs={6} md={6}> 
            <h2 id={recipe.name}> {recipe.name || 'Master Recipe'} </h2> 
            <h4 id={recipe.rootRecipeId} onClick={handleRecipeClick.bind(this)}> {recipe.rootRecipeId} </h4>
            <h6> forked from <Button id={recipe.rootRecipeId} onClick={handleUserClick.bind(this)} disabled>{recipe.sourceID} </Button></h6> 
          </Col> 
          <Col xs={4} md={4} style={{marginTop: 25}}>  
            <ProgressBar bsStyle={progressBarStyles[(Math.floor(Math.random() * 4))]} now={(Math.floor(Math.random() * 100))} />
          </Col>
          <Col xs={2} md={2} style={{marginTop: 20}}> 
            <h4> forks <Badge>{17}</Badge></h4> 
          </Col>
        </Row>
    )
}

