import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import API from "../services/api";
import { Card } from "react-bootstrap";
import UploadFile from "./UploadFile";


export default function AdmissionStepModal({
  showModal,
  handleClose,
  editAdmissionStepData,
  handleSubmitAdmissionStep,
}) {
  const [show, setShow] = useState(showModal);
  const [file, setFile] = useState('');
  const [editAdmissionStepDataInfo, setEditAdmissionStepDataInfo] = useState(editAdmissionStepData);

  // For Error Message
  const { register, formState: { errors }, handleSubmit,} = useForm();
  const titleField = register("title", { required: true });
  const linkField = register("link", { required: true });
  const descriptionField = register("description", { required: true });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditAdmissionStepDataInfo({ ...editAdmissionStepDataInfo, [name]: value });
  };

  const onSubmit = () => {
    handleSubmitAdmissionStep(editAdmissionStepDataInfo);
  };

  const [showFileModal, setShowFileModal] = useState(false);
  const handleCloseFileModal = () => setShowFileModal(false);
  const handleShowFileModal = () => setShowFileModal(true);
  const [fileUrl, setFileUrl] = useState(editAdmissionStepData.add_file_link);

  useEffect(() => {
    setEditAdmissionStepDataInfo({
      ...editAdmissionStepDataInfo,
      "add_file_link": fileUrl
    });
  }, [fileUrl]);


  return (
    <>
      <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered >   
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Admission Step</Modal.Title>
          </Modal.Header>
          <Modal.Body className="mx-3 p-2">
            <div className="">
              <Form.Group controlId="name">
                <Form.Label>Name Of Step</Form.Label>

                <Form.Control placeholder="" name="title" defaultValue={editAdmissionStepDataInfo?.title} 
                 {...titleField}
                  onChange={(e) => {
                    titleField.onChange(e); 
                    handleInputChange(e); }} />
              </Form.Group>

              <Form.Group controlId="description" className="mt-2">
                <Form.Label>Description / Details</Form.Label> 

                <Form.Control as="textarea" rows={4} defaultValue={editAdmissionStepDataInfo?.description} name="description"
                  {...descriptionField}
                  onChange={(e) => {
                    titleField.onChange(e);
                    handleInputChange(e); }} />
              </Form.Group>

              <Form.Group controlId="link" className="mt-2"> 
                <Form.Label>Link</Form.Label> 

                <Form.Control placeholder="" defaultValue={editAdmissionStepDataInfo?.link} name="link"
                  {...linkField}
                  onChange={(e) => {
                    titleField.onChange(e);
                    handleInputChange(e);
                  }} />
              </Form.Group>

              <Form.Group controlId="file" className="mt-2">
                <Form.Label>Update File Document</Form.Label>

                <div className="d-flex">
                  <Card.Link href={editAdmissionStepDataInfo?.add_file_link} target="_blank" > {editAdmissionStepDataInfo.add_file_link.substring(editAdmissionStepDataInfo?.add_file_link.lastIndexOf('/') + 1)} </Card.Link>
                  <Button variant="dark" type="button" className="mx-2 btn-primary-background" size="sm" onClick={handleShowFileModal}> Update File </Button>  
                </div> 

                {/* <p>
                  <Card.Link href={editAdmissionStepDataInfo.add_file_link} target="_blank">
                    Open Uploaded File
                  </Card.Link>
                </p> */} 
              </Form.Group>
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}> CANCEL </Button> 

            <Button variant="primary" className="btn-primary-background" type="submit" > UPDATE </Button>  
          </Modal.Footer>
        </Form>
      </Modal>

      <UploadFile show={showFileModal} handleClose={handleCloseFileModal} setFileUrl={setFileUrl} />
      <ToastContainer />
    </>
  ); 
} 
