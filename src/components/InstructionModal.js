import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";

export default function InstructionModal({
  instruction,
  showModal,
  hideModal,
  editInstructionData,
  handleSubmitInstruction
}) {
  const [show, setShow] = useState(showModal);
  const [editInstructionDataInfo, setEditInstructionData] = useState(
    editInstructionData
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const instructionTitleField = register("instruction_title", {
    required: true,
  });
  const instructionContentField = register("instruction_content", {
    required: true,
  });

  const handleClose = () => {
    setShow(false);
    hideModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditInstructionData({ ...editInstructionDataInfo, [name]: value });
  };

  const onSubmit = () => {
    handleSubmitInstruction(editInstructionDataInfo); // Call parent function via props
   
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
      <Form onSubmit={handleSubmit(onSubmit)}>

        <Modal.Header closeButton> 
          <Modal.Title>
            {instruction ? (
              <span>Edit Set Up Instruction</span>
            ) : (
              <span>Add Set Up Instruction</span>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
            <Form.Group className="mb-2" controlId="instruction_title">
              <Form.Label>Instruction Title</Form.Label>

              <Form.Control placeholder="Enter Instruction Title" name="instruction_title"
                defaultValue={editInstructionDataInfo?.instruction_title}
                {...instructionTitleField}
                onChange={(e) => {
                    instructionTitleField.onChange(e);
                  handleInputChange(e);
                }} />

              {errors.instruction_title && ( <span className="validationError">Instruction title is required</span>)}
            </Form.Group>


            <Form.Group className="mb-2" controlId="instruction_content">
              <Form.Label>Instruction Content</Form.Label>


              <Form.Control as="textarea" rows={4} name="instruction_content"
                defaultValue={editInstructionDataInfo?.instruction_content}
                {...instructionContentField}
                onChange={(e) => {
                  instructionContentField.onChange(e);
                  handleInputChange(e);
                }}/>

              {errors.instruction_content && ( <span className="validationError">Instruction content is required</span>)}
            </Form.Group>
          
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>CANCEL</Button>
            
          {instruction ? (
            <Button vvariant="primary" className="btn-primary-background" type="submit" >Update</Button>
              
              ) : (

          <Button variant="primary" className="btn-primary-background" type="submit">SAVE </Button>
          )}

        </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
