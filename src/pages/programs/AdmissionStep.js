import React, { useState, useEffect } from "react";
import { Accordion, Container } from "react-bootstrap";
import { BiEdit } from "react-icons/bi";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { MdDelete } from "react-icons/md";
import InstructionModal from "../../components/InstructionModal";
import Modal from "react-bootstrap/Modal";
import { IoCheckmarkCircle, IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import API from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import Card from "react-bootstrap/Card";
import { useForm } from "react-hook-form";
import AdmissionStepModal from '../../components/AdmissionStepModal'


export default function AdmissionStep(props) {
  const [complete, setComplete] = useState(false);
  const [show, setShow] = useState(false);
  const [instruction, setInstruction] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [viewInstructionId, setViewInstructionId] = useState("");
  const [showInstructionModal, setShowInstructionModal] = useState(false);
  const [admissionStepData, setAdmissionStepData] = useState([]);
  const [isEditInstruction, setEditInstruction] = useState(false);
  const [editInstructionData, setEditInstructionData] = useState({
    id: "",
    instruction_title: "",
    instruction_content: "",
  });
  const [editAdmissionStepData, setEditAdmissionStepData] = useState({});

  const handleClose = () => {
    setEditAdmissionStepData({})
    setShow(false);

  };
  const viewInstructionTable = (id) => {
    setShowInstructions(true);
    setViewInstructionId(id);
  };
  const HideInstructionModal = () => {
    setShowInstructionModal(false);
    setEditInstructionData({
      id: "",
      instruction_title: "",
      instruction_content: "",
    });
  };
  const editAdmissionStep = (item) => {
    console.log("itemitemitemitem", item)
    setEditAdmissionStepData(item);
    setShow(true);
  };
  const addInstruction = () => {
    setInstruction(false);
    setShowInstructionModal(true);
  };
  const editInstruction = (item) => {
    setEditInstruction(true);
    setInstruction(true);
    setShowInstructionModal(true);
    setEditInstructionData(item);
  };

  async function handleSubmitAdmissionStep(formdata) {
    const payload = {
      title: formdata.title,
      link: formdata.link,
      description: formdata.description,
      mark_as_completed: formdata.mark_as_completed,
      add_file_link: formdata.add_file_link,
      program_id: formdata.program_id
    }
    await API.put(
      `admission/api/admission/step/` + formdata.id + `/`,
      payload
    )
      .then((response) => {
        handleClose();
        getAdmissionStepData();
        toast.success("Admission Updated Successfully!");
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  const handleCompleted = (item, value) => {
    const jsonData = {
      mark_as_completed: !value,
      program_id: item.program_id,
      title: item.title
    }
    API.put(
      `admission/api/admission/step/` + item.id + `/`,
      jsonData
    )
      .then((response) => {
        getAdmissionStepData();
        toast.success("Admission Updated Successfully!");
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  async function deleteAdmissionStep(id) {
    await API.delete(`admission/api/admission/step/` + id + `/`)
      .then((response) => {
        getAdmissionStepData();
        toast.success("Admission Deleted Successfully!");
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  async function deleteStepInstruction(id) {
    await API.delete(`admission/api/admission/step/instruction/` + id + `/`)
      .then((response) => {
        getAdmissionStepData();
        toast.success("Set Up Instruction Deleted Successfully!");
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  async function getAdmissionStepData() {
    // Get API for Admission Step List
    await API.get(
      `admission/api/admission/step/` + props.programId + `/program/`
    )
      .then((response) => {
        setAdmissionStepData(response.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  async function submitAddEditInstruction(formdata) {
    formdata.admissionStep = viewInstructionId;
    if (instruction) {
      await API.put(
        `admission/api/admission/step/instruction/` + formdata.id + `/`,
        formdata
      )
        .then(() => {
          getAdmissionStepData();
          HideInstructionModal();
          toast.success("Set Up Instruction Updated Successfully!");
        })
        .catch((err) => {
          console.log("err", err);
          toast.error(err);
        });
    } else {
      await API.post(
        `admission/api/admission/step/instruction/create/`,
        formdata
      )
        .then((response) => {
          getAdmissionStepData();
          HideInstructionModal();
          toast.success("Set Up Instruction Added Successfully!");
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }

  const handleSubmitInstruction = (formdata) => {
    submitAddEditInstruction(formdata);
  };

  useEffect(() => {
    getAdmissionStepData();
  }, []);

  return (
    <div className="ms-3">
      <Form>
        <Accordion defaultActiveKey="0" flush>
          {admissionStepData.map((item, index) => {
            return (
              <Accordion.Item eventKey={String(index)}>
                <div className="d-flex justify-content-between align-items-center my-1">
                  <h5 className="fw-bold">
                    {item.title} {item.mark_as_completed && <IoCheckmarkCircle />}
                  </h5>
                  <div className="d-flex justify-content-between align-items-center">
                    <BiEdit
                      className="acc-btn cursor-pointer mx-2"
                      onClick={(e) => editAdmissionStep(item)}
                    />
                    <div className="vhr"></div>
                    <MdDelete
                      className="acc-btn cursor-pointer mx-2"
                      onClick={(e) => deleteAdmissionStep(item.id)}
                    />
                    <div className="vhr"></div>
                    <Accordion.Header className=""></Accordion.Header>
                  </div>
                </div>
                <Accordion.Body className="pt-0">
                  <div className="d-flex justify-content-end">
                    <Button
                      className="secondary btn-primary-background"
                      onClick={(e) => viewInstructionTable(item.id)}
                    >
                      View Set Up Instruction
                    </Button>
                  </div>
                  <div className="">
                    <Form.Group className="mb-3" controlId="description">
                      <Form.Label>
                        {/* Click edit to add relevant details, links, and other
                          information. */}
                        Description / Details
                      </Form.Label>
                      <p className="inputFields">{item.description}</p>

                      {/* <Form.Control as="textarea" rows={3} /> */}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="link">
                      {/* <Form.Label>Link</Form.Label> */}
                      Link
                      <Card.Link href={item.link} target="_blank" className="mx-2">
                        {item.link}
                      </Card.Link>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="fileUrl">
                      Uploaded File
                      <Card.Link href={item.add_file_link} target="_blank" className="mx-2">
                        {item.add_file_link.substring(item.add_file_link.lastIndexOf('/') + 1)}
                      </Card.Link>
                    </Form.Group>
                    <Form.Check
                      type="switch"
                      id="includeTrainingAccess"
                      label="Mark As Complete"
                      name="isComplete"
                      defaultChecked={item.mark_as_completed}
                      onChange={() => handleCompleted(item, item.mark_as_completed)}
                    />
                  </div>

                  {showInstructions && viewInstructionId === item.id && (
                    <div className="instructions">
                      <div className="d-flex justify-content-between">
                        <h6>Set Up Instructions:</h6>
                        <IoClose
                          cursor="pointer"
                          onClick={() => setShowInstructions(false)}
                        />
                      </div>
                      <Table responsive hover size="sm">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Content</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item.admissioninstructionstep.map(
                            (instructionItem, ii) => {
                              return (
                                <>
                                  <tr>
                                    <td>{ii + 1}</td>
                                    <td className="w-custom-20">
                                      {instructionItem.instruction_title}
                                    </td>
                                    <td>
                                      {instructionItem.instruction_content}
                                    </td>
                                    <td className="w-custom-10 text-center">
                                      <BiEdit
                                        className="acc-btn cursor-pointer mx-2"
                                        onClick={() =>
                                          editInstruction(instructionItem)
                                        }
                                      />
                                      <div className="vhr"></div>
                                      <MdDelete
                                        className="acc-btn cursor-pointer mx-2"
                                        onClick={() =>
                                          deleteStepInstruction(instructionItem.id)
                                        }
                                      />
                                    </td>
                                  </tr>
                                </>
                              );
                            }
                          )}
                          {item.admissioninstructionstep.length === 0 && (
                            <tr>
                              <td colspan="4" className="text-center">
                                No records found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                      <Button
                        className="secondary btn-primary-background my-2"
                        size="sm"
                        onClick={addInstruction}
                      >
                        + Add More
                      </Button>
                    </div>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
          {admissionStepData.length === 0 && (
            <Accordion.Item className="text-center">
              No records found
            </Accordion.Item>
          )}
        </Accordion>
      </Form>

      {showInstructionModal ? (
        <InstructionModal
          instruction={instruction}
          showModal={showInstructionModal}
          hideModal={() => HideInstructionModal()}
          editInstructionData={editInstructionData}
          handleSubmitInstruction={handleSubmitInstruction}
        />
      ) : (
        ""
      )}

      {show ? (
        <AdmissionStepModal
          showModal={show}
          handleClose={handleClose}
          editAdmissionStepData={editAdmissionStepData}
          handleSubmitAdmissionStep={handleSubmitAdmissionStep}
        />
      ) : (
        ""
      )}
      <ToastContainer />
    </div>
  );
}
