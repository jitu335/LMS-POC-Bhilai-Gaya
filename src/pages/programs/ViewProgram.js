import React, { useState, useEffect } from 'react'
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { BiImageAlt } from "react-icons/bi";
import API from "../../services/api";

export default function ViewProgram(props) {
  const handleClick = () => {
    props.setViewProgramSummary(false)
  }
  const [program, setProgram] = useState({});
  useEffect(() => {
    getProgram();
  }, [])
  const getProgram = () => {
    API.get('program/api/program/program/' + props.programId + '/').then((response) => {
      console.log("program detail", response.data);
      setProgram(response.data);
    })
      .catch((err) => {
        console.log("err", err);
      });
  }
  return (
    <div className="timeline">
      <Form>
        <div className="d-flex justify-content-between">
          <h4 className="">Program Information</h4>
          <Button variant='primary btn-primary-background' className="mx-2" onClick={handleClick}>
            Edit
          </Button>
        </div>
        <div className="pInfo">
          <Row className="mb-3">
            <Form.Group as={Col} controlId="type">
              <Form.Label>Program Type</Form.Label>
              <p className="inputFields" >{program?.program_type_fk?.type}</p>
            </Form.Group>

            <Form.Group as={Col} controlId="category">
              <Form.Label>Program Category</Form.Label>
              <p className="inputFields" >{program?.category_fk?.category}</p>
            </Form.Group>

            <Form.Group as={Col} controlId="cohort">
              <Form.Label>Program Cohort</Form.Label>
              <p className="inputFields" >{program?.cohort_fk?.cohort_number}</p>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="name">
              <Form.Label>Program Name</Form.Label>
              <p className="inputFields" >{program?.name}</p>
            </Form.Group>
            <Form.Group as={Col} controlId="email">
              <Form.Label>Program Email Address</Form.Label>
              <p className="inputFields" >{program?.program_email}</p>
            </Form.Group>
            <Form.Group as={Col} controlId="manager">
              <Form.Label>Program Manager</Form.Label>
              <p className="inputFields" >{program?.manager}</p>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} xs={12} md={4} lg={4} controlId="description">
              <Form.Label>Program Description</Form.Label>
              <p className="inputFields" >{program?.discription}</p>
            </Form.Group>
            <Form.Group as={Col} controlId="logo">
              <Form.Label>Program Logo</Form.Label>
              <div>
                {program?.logo_url && <img src={program?.logo_url} className="selectedLogo" />}
                {!program?.logo_url && <BiImageAlt size="2.4rem" />}
              </div>
            </Form.Group>
            {/* <Form.Group as={Col} controlId="admins">
              <Form.Label>Other Program Admins</Form.Label>
              <p className="inputFields" >A</p>
            </Form.Group> */}

            <Form.Group as={Col} controlId=""></Form.Group>
          </Row>
        </div>

        <div className="pDates mt-4">
          <h4 className="mb-3">Program Dates</h4>
          <Row className="mb-3">
            <Form.Group as={Col} xs={12} md={4} lg={4} controlId="startDate">
              <Form.Label>Program Start Date</Form.Label>
              <p className="inputFields" >{program?.start_date}</p>
            </Form.Group>

            <Form.Group as={Col} xs={12} md={4} lg={4} controlId="endDate">
              <Form.Label>Program End Date</Form.Label>
              <p className="inputFields" >{program?.end_date}</p>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={4} lg={4} controlId=""></Form.Group>
          </Row>
          {/* <Row>
            <Form.Group as={Col} xs={12} md={4} lg={4} controlId="appOpenDate">
              <Form.Label>Application Open Date</Form.Label>
              <Form.Control type="date" placeholder="" />
            </Form.Group>

            <Form.Group as={Col} xs={12} md={4} lg={4} controlId="appEndDate">
              <Form.Label>Application End Date</Form.Label>
              <Form.Control type="date" placeholder="" />
            </Form.Group>
            <Form.Group
              as={Col}
              xs={12}
              md={4}
              lg={4}
              controlId="admins"
            ></Form.Group>
          </Row> */}
        </div>

        <div className="pDetails mt-4">
          <h4 className="mb-3">Program Details</h4>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="details">
              <Form.Label>Target Class Size</Form.Label>
              <p className="inputFields" >{program?.target_class_size}</p>
            </Form.Group>

            <Form.Group as={Col} controlId="region">
              <Form.Label>Program Region</Form.Label>
              <p className="inputFields" >{program?.region_fk?.region}</p>
            </Form.Group>

            <Form.Group as={Col} controlId="curriculumCategory">
              <Form.Label>Curriculum Category</Form.Label>
              <p className="inputFields" >{program?.curriculum_category_fk?.category}</p>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="admissionType">
              <Form.Label>Admission Type</Form.Label>
              <p className="inputFields" >{program?.admission_type_fk?.type}</p>
            </Form.Group>
            <Form.Group as={Col} controlId="language">
              <Form.Label>Language</Form.Label>
              <p className="inputFields" >{program?.language_fk?.language}</p>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Program Site is Active</Form.Label>
              <p className="inputFields" >{program?.is_active ? "Yes" : "No"}</p>
            </Form.Group>
          </Row>
          {/* <Row>
            <Form.Group as={Col}>
              <Form.Label>Program includes Training App Access For Fellows</Form.Label>
              <p className="inputFields" >{program?.end_date}</p>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Program Site Is Internal View Only</Form.Label>
              <p className="inputFields" >Yes</p>
            </Form.Group>
            <Form.Group as={Col} controlId="admins"></Form.Group>
          </Row> */}
        </div>

      </Form>
    </div>
  );
}
