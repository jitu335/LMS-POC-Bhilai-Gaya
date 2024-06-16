import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useForm } from "react-hook-form";
import API from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import UploadFile from "../../components/UploadFile";

export default function AddAdmission({ programId, viewAdmissionStep, setViewAdmissionStep }) {

  const [show, setShow] = useState(false);
  const [admissionFormData, setAdmissionFormData] = useState({});
  const [fileUrl, setFileUrl] = useState();

  // For Error Message
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const titleField = register("title", { required: true });
  const linkField = register("link", { required: true });
  const descriptionField = register("description", { required: true });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdmissionFormData({ ...admissionFormData, [name]: value });
  };

  const handleCancel = () => {
    setViewAdmissionStep(true);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function onSubmit() {
    console.log("formdata onSubmit", admissionFormData);
    admissionFormData.program_id = programId;
    admissionFormData.mark_as_completed = false;
    admissionFormData.display_weight = 0;
    // admissionFormData.add_file_link = file;

    await API.postJSON(
      `admission/api/admission/step/create/`,
      admissionFormData
    )
      .then((response) => {
        handleCancel();
        toast.success("Admission Step Added Successfully!");
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  useEffect(() => {
    setAdmissionFormData({
      ...admissionFormData,
      "add_file_link": fileUrl
    });
  }, [fileUrl]);

  return (
    <div>
      <h4>Add Admission Step</h4>
      <div className="">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="name">
                <Form.Label>Name Of Step</Form.Label>
                <Form.Control
                  name="title"
                  placeholder="Enter Name Of Step"
                  {...titleField}
                  onChange={(e) => {
                    titleField.onChange(e);
                    handleInputChange(e);
                  }}
                />
                {errors.title && (
                  <span className="validationError">
                    Name of step is required
                  </span>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Add Link</Form.Label>
                <Form.Control
                  placeholder=""
                  name="link"
                  {...linkField}
                  onChange={(e) => {
                    titleField.onChange(e);
                    handleInputChange(e);
                  }}
                />
                {errors.link && (
                  <span className="validationError">Link is required</span>
                )}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="description">
                <Form.Label>Description / Details</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="description"
                  {...descriptionField}
                  onChange={(e) => {
                    titleField.onChange(e);
                    handleInputChange(e);
                  }}
                />
                {errors.description && (
                  <span className="validationError">
                    Description is required
                  </span>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="file">
              <Form.Label>Add File <small>(PDF, DOC, DOCX or CSV only)</small></Form.Label>
              {/* {files.length > 0 && !show ? (
                files.map((file) => <div key={file.name}>{file.name}</div>)
              ) : (
                <div className="d-flex">
                  <Form.Control type="file" onChange={(e) => uploadImage(e)} />
                </div>
              )} */}
              <div className="d-flex">
                <Form.Control placeholder="" type="text" readOnly disabled value={admissionFormData?.add_file_link?.substring(admissionFormData.add_file_link.lastIndexOf('/') + 1)} />
                <Button variant="dark" type="button" className="mx-2 btn-primary-background" size="sm" onClick={handleShow}>
                  BROWSE
                </Button>
              </div>
            </Form.Group>
            <Form.Group as={Col} controlId=""></Form.Group>
          </Row>
          <div className="my-3">
            <Button
              variant="secondary"
              type="button"
              className="mx-2"
              onClick={handleCancel}
            >
              CANCEL
            </Button>
            <Button
              variant="primary"
              type="submit"
              className="mx-2 btn-primary-background"
            >
              SAVE
            </Button>
          </div>
        </Form>
      </div>

      <UploadFile show={show} handleClose={handleClose} setFileUrl={setFileUrl} />
      <ToastContainer />
    </div>
  );
}
