import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";

export default function ResourceModal(props) {
  const [resModalShow, setResModalShow] = useState(props.showModal);
  const [disableSubmit, setDisableSubmit] = useState(false);

  const {register, formState: { errors },handleSubmit,} = useForm();
    
  const [opsResource, setOpsResource] = useState(props.editResData);

  // For Error Message
  const titleField = register("title", { required: true });
  const linkField = register("link", { required: true });
  const descriptionField = register("description", { required: true });

  const handleClose = () => {
    setResModalShow(false);
    props.hideModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOpsResource({ ...opsResource, [name]: value });
  };

  const onSubmit = () => {
    setDisableSubmit(true);
    props.handleSubmit(opsResource); // Call parent function via props
  };

  return (
    <>
      <Modal show={resModalShow} onHide={handleClose} animation={false} aria-labelledby="contained-modal-title-vcenter" centered> 
        
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>{props.isEdit ? "Edit" : "Add"} Resources</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Label>Resource Title</Form.Label>

              <Form.Control type="text" name="title" placeholder="Enter Resource Title"
                defaultValue={opsResource?.title}
                {...titleField}
                onChange={(e) => {
                  titleField.onChange(e);
                  handleInputChange(e);
                }}/>
              
              {errors.title && (<span className="validationError">Title is required</span>)}
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Label>Link</Form.Label>

              <Form.Control type="text" name="link" placeholder="Enter Link"
                defaultValue={opsResource?.link}
                {...linkField}
                onChange={(e) => {
                  linkField.onChange(e);
                  handleInputChange(e);
                }}/> 
              
              {errors.link && (<span className="validationError">Link is required</span>)}
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Label>Description</Form.Label>

              <Form.Control type="text" name="description" placeholder="Enter Description"
                defaultValue={opsResource?.description}
                {...descriptionField}
                onChange={(e) => {
                  descriptionField.onChange(e);
                  handleInputChange(e);
                }}/>
              
              {errors.description && (<span className="validationError">Description is required</span>)}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>

            <Button variant="secondary" onClick={handleClose}>CANCEL</Button>
              
          <Button type="submit" variant="primary" className="btn-primary-background" disabled={disableSubmit}>SAVE</Button>  
              
        </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
