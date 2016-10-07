import React, { Component } from 'react';
import { Grid, Row, Col, Table, Button } from 'react-bootstrap';

export default ({recipeDescription, handleClick}) => {
  return (
      <div> 
        <Row style={{borderBottom: "4px solid rgba(128,128,128, 0.2)", height: '80%', textAlign: "center", marginBottom: 10}}> 
          <Col xs={3} md={3}> 
            <h4> serves </h4> 
            <h4> {recipeDescription.servings.value} </h4> 
          </Col>
          <Col xs={1} md={1}> 
            <h1 style={{color: 'rgba(128,128,128, 0.2)'}}> / </h1> 
          </Col>
          <Col xs={3} md={3}> 
            <h4> cook time </h4> 
            <h4> {recipeDescription.cookTime.value} </h4> 
          </Col>
          <Col xs={1} md={1}> 
            <h1 style={{color: 'rgba(128,128,128, 0.2)'}}> / </h1> 
          </Col>
          <Col xs={3} md={3}> 
            <h4> skill level </h4> 
            <h4> {recipeDescription.skillLevel.value} </h4> 
          </Col>
        </Row> 
        <Row> 
          <p> {recipeDescription.description.value || `A basic ${recipeDescription.name} recipe`} </p> 
        </Row>
        <Row style={{marginTop: 15}}> 
          <Col xs={3} md={3}> 
            <Button style={{background: 'rgba(112, 189, 71, 0.8)', width: '100%', height: '50%', color: 'white', textShadow: 'none'}} bsSize='large' onClick={handleClick.bind(this)} id="fork" type="submit">Fork</Button>
          </Col>
          <Col xs={3} md={3} mdOffset={1} xsOffset={1}> 
            <Button style={{background: 'rgba(112, 189, 71, 0.8)', width: '100%', height: '50%', color: 'white', textShadow: 'none'}} bsSize='large' onClick={handleClick.bind(this)} id="cook" type="submit">Cook</Button>
          </Col>
          <Col xs={3} md={3} mdOffset={1} xsOffset={1}> 
            <Button style={{background: 'rgba(112, 189, 71, 0.8)', width: '100%', height: '50%', color: 'white', textShadow: 'none'}} bsSize='large'onClick={handleClick.bind(this)} id="edit" type="submit"> Edit </Button>
          </Col>
        </Row>
      </div> 
  ); 
}
