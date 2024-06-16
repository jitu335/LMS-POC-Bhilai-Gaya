import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Accordion from "react-bootstrap/Accordion";
import { BiImageAlt } from "react-icons/bi";
import Modal from 'react-bootstrap/Modal';
import LogoModal from "../../components/LogoModal";
import API from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function WorkingProgramSummary(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [image, setImage] = useState(null);
    const [program, setProgram] = useState({})
    const [programCategory, setProgramCategory] = useState([])
    const [programType, setProgramType] = useState([])
    const [programRegion, setProgramRegion] = useState([])
    const [programCohort, setProgramCohort] = useState([])
    const [admissionType, setAdmissionType] = useState([])
    const [language, setLanguage] = useState([])
    const [curriculumCategory, setCurriculumCategory] = useState([])
    const [programCategorySelected, setProgramCategorySelected] = useState()
    const [programTypeSelected, setProgramTypeSelected] = useState()
    const [programRegionSelected, setProgramRegionSelected] = useState()
    const [programCohortSelected, setProgramCohortSelected] = useState()
    const [admissionTypeSelected, setAdmissionTypeSelected] = useState()
    const [languageSelected, setLanguageSelected] = useState()
    const [curriculumCategorySelected, setCurriculumCategorySelected] = useState()
    const [formErrors, setFormErrors] = useState({});

    let navigate = useNavigate();
    useEffect(() => {
        fetchData();
        getProgram();
    }, [])

    const fetchData = async () => {
        API.get('program/api/program/master/programcategory/')
            .then((response) => {
                if (response.status === 200) {
                    setProgramCategory(response.data);
                } else {
                    toast.error(response.error_description);
                }
            }).catch((err) => {
                toast.error(err.response.data.error_description);
            });
        API.get('program/api/program/master/programtype/')
            .then((response) => {
                if (response.status === 200) {
                    setProgramType(response.data);
                } else {
                    toast.error(response.error_description);
                }
            }).catch((err) => {
                toast.error(err.response.data.error_description);
            });
        API.get('program/api/program/master/programregion/')
            .then((response) => {
                if (response.status === 200) {
                    setProgramRegion(response.data);
                } else {
                    toast.error(response.error_description);
                }
            }).catch((err) => {
                toast.error(err.response.data.error_description);
            });
        API.get('program/api/program/master/programcohort/')
            .then((response) => {
                if (response.status === 200) {
                    setProgramCohort(response.data);
                } else {
                    toast.error(response.error_description);
                }
            }).catch((err) => {
                toast.error(err.response.data.error_description);
            });
        API.get('program/api/program/master/admissiontype/')
            .then((response) => {
                if (response.status === 200) {
                    setAdmissionType(response.data);
                } else {
                    toast.error(response.error_description);
                }
            }).catch((err) => {
                toast.error(err.response.data.error_description);
            });
        API.get('program/api/program/master/language/')
            .then((response) => {
                if (response.status === 200) {
                    setLanguage(response.data);
                } else {
                    toast.error(response.error_description);
                }
            }).catch((err) => {
                toast.error(err.response.data.error_description);
            });
        API.get('program/api/program/master/curriculumcategory/')
            .then((response) => {
                if (response.status === 200) {
                    setCurriculumCategory(response.data);
                } else {
                    toast.error(response.error_description);
                }
            }).catch((err) => {
                toast.error(err.response.data.error_description);
            });
    }
    const getProgram = () => {
        API.get('program/api/program/program/' + props.programId + '/').then((response) => {
            console.log("program detail", response.data);
            setProgram(response.data);
            setProgramCategorySelected(response?.data?.category_fk?.id)
            setProgramTypeSelected(response?.data?.program_type_fk?.id)
            setProgramCohortSelected(response?.data?.cohort_fk?.id)
            setProgramRegionSelected(response?.data?.region_fk?.id)
            setAdmissionTypeSelected(response?.data?.admission_type_fk?.id)
            setLanguageSelected(response?.data?.language_fk?.id)
            setCurriculumCategorySelected(response?.data?.curriculum_category_fk?.id)
        })
            .catch((err) => {
                console.log("err", err);
            });
    }
    const handleCancel = () => {
        props.setEdit(false)
    }
    const handleChange = (e) => {
        setProgram({
            ...program,
            [e.target.name]: e.target.value
        })
    }
    const handleValidation = (e) => {
        setFormErrors(validate(program));
    }
    const handleCheck = (e) => {
        setProgram({
            ...program,
            [e.target.name]: e.target.checked
        })
    }
    const handleCategory = (e) => {
        setProgramCategorySelected(e.target.value)
    }
    const handleType = (e) => {
        setProgramTypeSelected(e.target.value)
    }
    const handleCohort = (e) => {
        setProgramCohortSelected(e.target.value)
    }
    const handleRegion = (e) => {
        setProgramRegionSelected(e.target.value)
    }
    const handleAdmissionType = (e) => {
        setAdmissionTypeSelected(e.target.value)
    }
    const handleLanguage = (e) => {
        setLanguageSelected(e.target.value)
    }
    const handleCurriculumCateogory = (e) => {
        setCurriculumCategorySelected(e.target.value)
    }

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.name) {
            errors.name = "Program Name is required!";
        }
        if (!values.program_email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.program_email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.manager) {
            errors.manager = "Manager is required!";
        }
        if (!values.discription) {
            errors.discription = "Description is required!";
        }
        if (!values.start_date) {
            errors.startDate = "Start Date is required!";
        }
        if (!values.end_date) {
            errors.endDate = "End Date is required!";
        }
        if (!values.target_class_size) {
            errors.targetClassSize = "Target Class Size is required!";
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        var userId = localStorage.getItem('userId')
        let apiData = {
            name: program.name,
            program_type_fk: programTypeSelected == null || programTypeSelected == undefined ? programType[0].id : programTypeSelected,
            category_fk: programCategorySelected == null || programCategorySelected == undefined ? programCategory[0].id : programCategorySelected,
            cohort_fk: programCohortSelected == null || programCohortSelected == undefined ? programCohort[0].id : programCohortSelected,
            region_fk: programRegionSelected == null || programRegionSelected == undefined ? programRegion[0].id : programRegionSelected,
            curriculum_category_fk: curriculumCategorySelected == null || curriculumCategorySelected == undefined ? curriculumCategory[0].id : curriculumCategorySelected,
            admission_type_fk: admissionTypeSelected == null || admissionTypeSelected == undefined ? admissionType[0].id : admissionTypeSelected,
            language_fk: languageSelected == null || languageSelected == undefined ? language[0].id : languageSelected,
            start_date: program.start_date,
            end_date: program.end_date,
            target_class_size: program.target_class_size,
            manager: program.manager,
            program_email: program.program_email,
            logo_url: "https://www.google.com/search?q=logo+url&rlz=1C1JJTC_enIN1004IN1004&oq=logo+url&aqs=chrome..69i57j0i512l9.4916j0j7&sourceid=chrome&ie=UTF-8#imgrc=rW3yxpWIIoHpoM",
            is_active: program.is_active,
            discription: program.discription,
            created_by: program.created_by,
            updated_by: userId,
        }
        console.log(apiData)
        setFormErrors(validate(program));
        console.log("after validate");
        console.log(Object.keys(formErrors).length)
        if (Object.keys(formErrors).length === 0) {
            API.put('program/api/program/detailprogram/' + props.programId + '/', apiData).then((response) => {
                if (response.status === 200) {
                    console.log("response data", response.data);
                    toast.success("Program updated successfully");
                    setTimeout(() => {
                        props.setEdit(false)
                    }, 1500);
                } else {
                    console.log("response", response)
                    toast.error(response.error_description);
                }
            })
                .catch((err) => {
                    console.log("err", err);
                    toast.error(err.response.data.error_description);
                })
        }
    }
    return (
        <>
            <Accordion defaultActiveKey="0" flush>
                <div className="timeline">
                    <Form onSubmit={handleSubmit}>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                <h4 className="">Program Information</h4>
                                <span className="note mx-2">
                                    Note program data inputted here will be used to setup the
                                    training site for your program
                                </span>
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className="pInfo">
                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="type">
                                            <Form.Label>Program Type</Form.Label>
                                            <Form.Select name="programTypeSelected" defaultValue={programTypeSelected} onChange={handleType}>
                                                {programType.map(({ id, type }, index) => <option value={id} key={id}>{type}</option>)}
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="category">
                                            <Form.Label>Program Category</Form.Label>
                                            <Form.Select name="programCategorySelected" defaultValue={programCategorySelected} onChange={handleCategory}>
                                                {programCategory.map(({ id, category }, index) => <option value={id} key={id}>{category}</option>)}
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="cohort">
                                            <Form.Label>Program Cohort</Form.Label>
                                            <Form.Select name="cohort" defaultValue={program.cohort} onChange={handleCohort}>
                                                {programCohort.map(({ id, cohort_number }, index) => <option value={id} key={id}>{cohort_number}</option>)}
                                            </Form.Select>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="name">
                                            <Form.Label className="required-field">Program Name</Form.Label>
                                            <Form.Control placeholder="" name="name" value={program.name} onChange={handleChange} />
                                            <p className="validationError">{formErrors.name}</p>
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="email">
                                            <Form.Label className="required-field">Program Email Address</Form.Label>
                                            <Form.Control type="email" placeholder="Program email address" name="program_email" value={program.program_email} onChange={handleChange} />
                                            <p className="validationError">{formErrors.email}</p>
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="manager">
                                            <Form.Label className="required-field">Program Manager</Form.Label>
                                            <Form.Control name="manager" value={program.manager} onChange={handleChange} />
                                            <p className="validationError">{formErrors.manager}</p>
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} xs={12} md={4} lg={4} controlId="description">
                                            <Form.Label className="required-field">Program Description</Form.Label>
                                            <Form.Control name="discription" value={program.discription} onChange={handleChange} />
                                            <p className="validationError">{formErrors.description}</p>
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="logo">
                                            <Form.Label>Program Logo</Form.Label>
                                            <div className="d-flex">
                                                <BiImageAlt size="2.4rem" />
                                                <Button variant="dark" type="button" className="mx-2" size="sm" onClick={handleShow}>
                                                    UPDATE
                                                </Button>
                                            </div>
                                            {/* <div className="d-flex">
                {file ? <BiImageAlt size="2.4rem" />
                  : <><Form.Control placeholder="" type="text" readOnly />
                    <Button variant="dark" type="button" className="mx-2" size="sm" onClick={handleShow}>
                      BROWSE
                    </Button></>
                }
              </div> */}
                                        </Form.Group>
                                        {/* <Form.Group as={Col} controlId="admins">
                                            <Form.Label>Other Program Admins</Form.Label>
                                            <Form.Select defaultValue="" className="fw-bold">
                                                <option>A</option>
                                                <option>...</option>
                                            </Form.Select>
                                        </Form.Group> */}

                                        <Form.Group as={Col} controlId=""></Form.Group>
                                    </Row>
                                </div>

                                <div className="pDates mt-4">
                                    <h4 className="mb-3">Program Dates</h4>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="programDates">
                                            <Form.Label className="required-field">Program Start Date</Form.Label>
                                            <Form.Control type="date" placeholder="" name="start_date" value={program.start_date} onChange={handleChange} />
                                            <p className="validationError">{formErrors.startDate}</p>
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="endDate">
                                            <Form.Label className="required-field">Program End Date</Form.Label>
                                            <Form.Control type="date" placeholder="" name="end_date" value={program.end_date} onChange={handleChange} />
                                            <p className="validationError">{formErrors.endDate}</p>
                                        </Form.Group>
                                        <Form.Group as={Col} controlId=""></Form.Group>
                                    </Row>
                                    {/* <Row>
                                        <Form.Group as={Col} controlId="appOpenDate">
                                            <Form.Label>Application Open Date</Form.Label>
                                            <Form.Control type="date" placeholder="" />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="appEndDate">
                                            <Form.Label>Application End Date</Form.Label>
                                            <Form.Control type="date" placeholder="" />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="admins"></Form.Group>
                                    </Row> */}
                                </div>

                                <div className="pDetails mt-4">
                                    <h4 className="mb-3">Program Details</h4>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="details">
                                            <Form.Label className="required-field">Target Class Size</Form.Label>
                                            <Form.Control placeholder="" name="target_class_size" value={program.target_class_size} onChange={handleChange} />
                                            <p className="validationError">{formErrors.targetClassSize}</p>
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="region">
                                            <Form.Label>Program Region</Form.Label>
                                            <Form.Select name="region" value={program.region} onChange={handleRegion}>
                                                {programRegion.map(({ id, region }, index) => <option value={id} key={id}>{region}</option>)}
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="curriculumCategory">
                                            <Form.Label>Curriculum Category</Form.Label>
                                            <Form.Select name="curriculumCategory" value={program.curriculumCategory} onChange={handleCurriculumCateogory}>
                                                {curriculumCategory.map(({ id, category }, index) => <option value={id} key={id}>{category}</option>)}
                                            </Form.Select>
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3 d-flex align-items-center">
                                        <Form.Group as={Col} controlId="admissionType">
                                            <Form.Label>Admission Type</Form.Label>
                                            <Form.Select name="admissionType" value={program.admissionType} onChange={handleAdmissionType}>
                                                {admissionType.map(({ id, type }, index) => <option value={id} key={id}>{type}</option>)}
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="language">
                                            <Form.Label>Language</Form.Label>
                                            <Form.Select name="language" value={program.language} onChange={handleLanguage}>
                                                {language.map(({ id, language }, index) => <option value={id} key={id}>{language}</option>)}
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Check type="switch" id="is_active" label="Program Site is Active" name="is_active" value={program.is_active} checked={program.is_active} onChange={handleCheck} />
                                        </Form.Group>
                                    </Row>
                                    {/* <Row>
                                        <Form.Group as={Col}>
                                            <Form.Check
                                                type="switch"
                                                id="includeTrainingAccess"
                                                label="Program includes Training App Access For Fellows"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Check
                                                type="switch"
                                                id="internalView"
                                                label="Program Site Is Internal View Only"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="admins"></Form.Group>
                                    </Row> */}
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <div className="my-5 d-flex justify-content-end ">
                            <Button variant="secondary" type="button" className="mx-2" onClick={handleCancel}>
                                CANCEL
                            </Button>
                            <Button variant="primary" type="submit" className="mx-2 btn-primary-background">
                                SAVE
                            </Button>
                        </div>
                    </Form>
                </div>
            </Accordion>
            <ToastContainer />
            <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Select Logo</Modal.Title>
                </Modal.Header>
                <Modal.Body className="mx-3 p-2">
                    {/* <Dropbox image={image} setImage={setImage} /> */}
                    <LogoModal image={image} setImage={setImage} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        CANCEL
                    </Button>
                    <Button variant="primary" className='btn-primary-background' onClick={handleClose}>
                        SAVE
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
