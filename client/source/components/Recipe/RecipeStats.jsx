import React, {Component} from 'react';

//Bootstrap 
import { Grid, Row, Col, Table, Button, DropdownButton, MenuItem, ProgressBar, Glyphicon } from 'react-bootstrap';

var branchNames = ['master', 'vegetarian', 'spicy', 'experimental']; 
var versionNames = ['57f40818a186225f4d8c8257', '57818a1862f4025f4d8c8257', '574d8c82818a1862f4025f57', '57862f4024d8c82818a15f57']; 
var numbers = [33, 27, 40]; 
var colors = ['success', 'warning', 'danger']; 

export default ({commits, branches, forks, stars}) => {
  return (
        <Grid style={{border: "1px solid rgba(128,128,128, 0.2)", borderRadius: 10, marginTop: 15, marginBottom: 15}}>
          <Row> 
            <Col xs={3} md={3} >
              <h5 style={{fontWeight: 'bold', marginLeft: 10, textAlign: 'center'}}> <Glyphicon glyph="ok" /> {`${14} commits`} </h5>
            </Col> 
            <Col xs={3} md={3} >
              <h5 style={{fontWeight: 'bold', marginLeft: 10, textAlign: 'center'}}> <Glyphicon glyph="th-list" /> {`${branches.length} branches`} </h5>
            </Col> 
            <Col xs={3} md={3} >
              <h5 style={{fontWeight: 'bold', marginLeft: 10, textAlign: 'center'}}> <Glyphicon glyph="cutlery" /> {`${78} forks`} </h5>
            </Col> 
            <Col xs={3} md={3} >
              <h5 style={{fontWeight: 'bold', marginLeft: 10, textAlign: 'center'}}> <Glyphicon glyph="star" /> {`${120} stars`} </h5>
            </Col> 
          </Row> 
          <Row> 
            <ProgressBar>
              {numbers.map((number, i)=> (
                <ProgressBar bsStyle={colors[i]} now={number} key={'progress'+i} />
              ))}
              </ProgressBar>
          </Row> 
        </Grid> 
  ); 
}