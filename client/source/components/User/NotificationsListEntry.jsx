import React, {Component} from 'react';
import { Grid, Row, Col, Badge, Glyphicon, FormControl, Button } from 'react-bootstrap';

export default ({user, text, handleUserClick}) => {

  return (
        <Row height={50} style={{borderBottom: "1px solid rgba(128,128,128, 0.2)"}}> 
          <Col xs={2} md={2}> 
            <h2 > <Glyphicon glyph="certificate" bsSize="large"/> </h2> 
          </Col> 
          <Col xs={10} md={10} > 
            <h4 id={user} onClick={handleUserClick.bind(this)}> {`@${user} ${text}`} </h4>  
          </Col>
        </Row>
    )
}
