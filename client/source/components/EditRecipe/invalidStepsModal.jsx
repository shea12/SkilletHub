import React from 'react';

//Bootstrap 
import { Modal, Button, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class InvalidStepsModal extends React.Component {
  constructor(props) {
    super(props);
  }

  close(event) {
    // this.setState({showModal: false}); 
    console.log('CLOSING MODAL!'); 
    this.props.closeModal(); 
  }

  render () {
    return (
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title> Merge Conflict!</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <h4> Invalid Step Description </h4> 
            <p> There are steps in this recipe that include ingredients that you have uninstalled. </p> 
            <p> Please run 'npm-install-ingredients' to add these ingredients back or modify the following steps </p>
            <p> Steps: {this.props.invalidSteps.join(', ')} </p> 
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>

        </Modal.Dialog>
      </div>
    )
  }
}

export default InvalidStepsModal;



  // <div> 
  //   <Modal show={true} onHide={this.close.bind(this)}>
  //     <Modal.Dialog>
  //       <Modal.Header closeButton>
  //         <Modal.Title> Merge Conflict!</Modal.Title>
  //       </Modal.Header>

  //       <Modal.Body>
  //         <h4> Invalid Step Description </h4> 
  //         <p> There are steps in this recipe that include ingredients that you have uninstalled. </p> 
  //         <p> Please run 'npm-install-ingredients' to add these ingredients back or modify the following steps </p>
  //         <p> Steps: {this.props.invalidSteps.join(', ')} </p> 
  //       </Modal.Body>

  //       <Modal.Footer>
  //         <Button bsStyle="primary" onClick={this.close.bind(this)}>Close</Button>
  //       </Modal.Footer>

  //     </Modal.Dialog>
  //   </Modal>
  // </div>