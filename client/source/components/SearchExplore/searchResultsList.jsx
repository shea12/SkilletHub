import React, {Component} from 'react';
//Bootstrap 
import { Grid, Row, Col, Table, Button, Thumbnail } from 'react-bootstrap';

export default ({recipeList, name, handleRecipeForkClick, handleRecipeCookClick}) => {
  return (
    <div> 
    {recipeList.map((recipe, i) => {
      return (
        <Col xs={3} md={3} key={`${name}${i}`} style={{padding: '0px', margin: '20px'}}> 
          <Thumbnail src={recipe.picture.value} alt="200x200">
            <h3>{recipe.name.value}</h3>
            <h4>cooked by // {recipe.username}</h4>
            <p>{recipe.description.value.split('.').slice(0,2).join('.')}...Click to read more</p>
            <p>
              <Button bsStyle="success" onClick={handleRecipeCookClick.bind(this)} data-username={recipe.username} data-recipe={recipe.rootVersion} data-branch={recipe.branch} data-version={recipe._id}>Cook</Button>&nbsp;
              <Button bsStyle="default" onClick={handleRecipeForkClick.bind(this)} data-username={recipe.username} data-recipe={recipe.rootVersion} data-branch={recipe.branch} data-version={recipe._id}>Fork</Button>
            </p>
          </Thumbnail>
        </Col>
      )
    })}
    </div> 
  ); 
}