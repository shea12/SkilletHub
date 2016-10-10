import React, {Component} from 'react';
import { Image, Grid, Row, Col, Form, FormGroup, Badge, ProgressBar, FormControl, Button, Container, ControlLabel, DropdownButton, MenuItem, Nav, NavItem } from 'react-bootstrap';

export default ({pullRequest, username, handleUserClick, handlePullRequestClick}) => {

  return (
        <Row height={50}> 
          <Col xs={6} md={6}> 
            <h2 id={pullRequest.sendingUser} onClick={handleUserClick.bind(this)}> sent from {pullRequest.sendingUser} </h2> 
            <h4 id={pullRequest.sendingUser}> pull request submitted at {pullRequest.createdAt} </h4>
          </Col> 
          <Col xs={4} md={4} style={{marginTop: 20}}> 
            <Button 
              data-username={username}
              data-recipe={pullRequest.targetVersion}
              data-branch={'master'}
              data-version={pullRequest.targetVersion}
              data-pulluser={pullRequest.sendingUser}
              data-pullrecipe={pullRequest.targetVersion}
              data-pullrequest={JSON.stringify(pullRequest)}
              onClick={handlePullRequestClick.bind(this)}> 
                Manage Pull Request 
            </Button> 
          </Col>
          <Col xs={2} md={2} style={{marginTop: 20}}> 
            <h4> status </h4> 
            <Badge>{pullRequest.status}</Badge>
          </Col>
        </Row>
    )
}