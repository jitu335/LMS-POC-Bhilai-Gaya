import React, { useState, useEffect, forwardRef } from "react";
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
import { useForm } from "react-hook-form";

export default function EditProgramSummary(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [image, setImage] = useState(null);
    const [program, setProgram] = useState();
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
    const [loading, setLoading] = useState(true);

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
            setLoading(true);
            console.log("program detail", response.data);
            // setProgram(response.data);
            setProgram((item) => ({
                ...item,
                "name": response?.data?.name,
                "manager": response?.data?.manager,
                "program_email": response?.data?.program_email,
                "discription": response?.data?.discription,
                "target_class_size": response?.data?.target_class_size,
                "start_date": response?.data?.start_date,
                "end_date": response?.data?.end_date,
                "is_active": response?.data?.is_active,
                "created_by": response?.data?.created_by,
                "logo_url": response?.data?.logo_url
            }));
            setImage(response?.data?.logo_url)
            setProgramCategorySelected(response?.data?.category_fk?.id)
            setProgramTypeSelected(response?.data?.program_type_fk?.id)
            setProgramCohortSelected(response?.data?.cohort_fk?.id)
            setProgramRegionSelected(response?.data?.region_fk?.id)
            setAdmissionTypeSelected(response?.data?.admission_type_fk?.id)
            setLanguageSelected(response?.data?.language_fk?.id)
            setCurriculumCategorySelected(response?.data?.curriculum_category_fk?.id)
            setLoading(false)
        })
            .catch((err) => {
                console.log("err", err);
            });
    }

    // useEffect(() => {
    //     console.log("program", program)
    // }, [program])
    const handleCancel = () => {
        props.setViewProgramSummary(true)
    }
    const handleChange = (e) => {
        setProgram({
            ...program,
            [e.target.name]: e.target.value
        });
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

    const { register, formState: { errors }, handleSubmit, } = useForm();

    // For Error Message
    const nameField = register("name", { required: true });
    const managerField = register("manager", { required: true });
    const descriptionField = register("discription", { required: true });
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const emailField = register("program_email", { required: true, pattern: regex });
    const targetClassSizeField = register("target_class_size", { required: true });
    const startDateField = register("start_date", { required: true });
    // const endDateField = register("end_date", { required: true, validate: (program) => program?.end_date < program?.start_date });
    const endDateField = register("end_date", { required: true });
    console.log("error", errors)
    const submit = (e) => {
        var userId = localStorage.getItem('userId')
        let apiData = {
            name: program?.name,
            program_type_fk: programTypeSelected,
            category_fk: programCategorySelected,
            cohort_fk: programCohortSelected,
            region_fk: programRegionSelected,
            curriculum_category_fk: curriculumCategorySelected,
            admission_type_fk: admissionTypeSelected,
            language_fk: languageSelected,
            start_date: program?.start_date,
            end_date: program?.end_date,
            target_class_size: program?.target_class_size,
            manager: program?.manager,
            program_email: program?.program_email,
            logo_url: image,
            is_active: program?.is_active,
            discription: program?.discription,
            created_by: program?.created_by,
            updated_by: userId,
        }
        console.log(apiData)
        API.put('program/api/program/detailprogram/' + props.programId + '/', apiData).then((response) => {
            if (response.status === 200) {
                console.log("response data", response.data);
                toast.success("Program updated successfully");
                setTimeout(() => {
                    props.setViewProgramSummary(true);
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

    const handleUpdateLogo = () => {
        setProgram({
            ...program,
            "logo_url": image
        });
    }

    return (
        loading ?
            <div className="text-center">
                <h3 className="">Loading ...</h3>
            </div>
            :
            <>
                {/* <Accordion defaultActiveKey="0" flush>
                <div className="timeline"> */}
                <Form onSubmit={handleSubmit(submit)}>
                    {/* <Accordion.Item eventKey="0">
                            <Accordion.Header> */}
                    <h4 className="">Program Information</h4>
                    <span className="note mx-2">
                        Note program data inputted here will be used to setup the
                        training site for your program
                    </span>
                    {/* </Accordion.Header>
                            <Accordion.Body> */}
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
                                <Form.Select name="cohort" defaultValue={programCohortSelected} onChange={handleCohort}>
                                    {programCohort.map(({ id, cohort_number }, index) => <option value={id} key={id}>{cohort_number}</option>)}
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="name">
                                <Form.Label className="required-field">Program Name</Form.Label>
                                <Form.Control placeholder="" type="text" name="name" defaultValue={program?.name} {...nameField} onChange={(e) => { nameField.onChange(e); handleChange(e); }} />
                                {errors.name && (<span className="validationError">Program Name is required!</span>)}
                            </Form.Group>
                            <Form.Group as={Col} controlId="email">
                                <Form.Label className="required-field">Program Email Address</Form.Label>
                                <Form.Control type="email" placeholder="Program email address" name="program_email" defaultValue={program?.program_email} {...emailField} onChange={(e) => { emailField.onChange(e); handleChange(e); }} />
                                {errors.program_email && (<span className="validationError">Program Email Address is required!</span>)}
                            </Form.Group>
                            <Form.Group as={Col} controlId="manager">
                                <Form.Label className="required-field">Program Manager</Form.Label>
                                <Form.Control name="manager" defaultValue={program?.manager} {...managerField} onChange={(e) => { managerField.onChange(e); handleChange(e); }} />
                                {errors.manager && (<span className="validationError">Program Manager is required!</span>)}
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} xs={12} md={4} lg={4} controlId="description">
                                <Form.Label className="required-field">Program Description</Form.Label>
                                <Form.Control name="discription" defaultValue={program?.discription} {...descriptionField} onChange={(e) => { descriptionField.onChange(e); handleChange(e); }} />
                                {errors.discription && (<span className="validationError">Program Description is required!</span>)}
                            </Form.Group>
                            <Form.Group as={Col} controlId="logo">
                                <Form.Label>Program Logo</Form.Label>
                                <div className="d-flex">
                                    {image && <img src={image} className="selectedLogo" />}
                                    {!image && <BiImageAlt size="2.4rem" />}
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
                                <Form.Control type="date" placeholder="" name="start_date" defaultValue={program?.start_date} {...startDateField} onChange={(e) => { startDateField.onChange(e); handleChange(e); }} />
                                {errors.start_date && (<span className="validationError">Start Date is required!</span>)}
                            </Form.Group>

                            <Form.Group as={Col} controlId="endDate">
                                <Form.Label className="required-field">Program End Date</Form.Label>
                                <Form.Control type="date" placeholder="" name="end_date" defaultValue={program?.end_date} {...endDateField} onChange={(e) => { endDateField.onChange(e); handleChange(e); }} />
                                {errors.end_date && errors.end_date.type === "required" && (<span className="validationError">End Date is required!</span>)}
                                {errors.end_date && errors.end_date.type === "validate" && (<span className="validationError">End Date can not be before Start Date!</span>)}
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
                                <Form.Control placeholder="" name="target_class_size" defaultValue={program?.target_class_size} {...targetClassSizeField} onChange={(e) => { targetClassSizeField.onChange(e); handleChange(e); }} />
                                {errors.target_class_size && (<span className="validationError">Target Class Size is required!</span>)}
                            </Form.Group>

                            <Form.Group as={Col} controlId="region">
                                <Form.Label>Program Region</Form.Label>
                                <Form.Select name="region" defaultValue={programRegionSelected} onChange={handleRegion}>
                                    {programRegion.map(({ id, region }, index) => <option value={id} key={id}>{region}</option>)}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} controlId="curriculumCategory">
                                <Form.Label>Curriculum Category</Form.Label>
                                <Form.Select name="curriculumCategory" defaultValue={curriculumCategorySelected} onChange={handleCurriculumCateogory}>
                                    {curriculumCategory.map(({ id, category }, index) => <option value={id} key={id}>{category}</option>)}
                                </Form.Select>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3 d-flex align-items-center">
                            <Form.Group as={Col} controlId="admissionType">
                                <Form.Label>Admission Type</Form.Label>
                                <Form.Select name="admissionType" defaultValue={admissionTypeSelected} onChange={handleAdmissionType}>
                                    {admissionType.map(({ id, type }, index) => <option value={id} key={id}>{type}</option>)}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} controlId="language">
                                <Form.Label>Language</Form.Label>
                                <Form.Select name="language" defaultValue={languageSelected} onChange={handleLanguage}>
                                    {language.map(({ id, language }, index) => <option value={id} key={id}>{language}</option>)}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Check type="switch" id="is_active" label="Program Site is Active" name="is_active" defaultValue={program?.is_active} checked={program?.is_active} onChange={handleCheck} />
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
                    {/* </Accordion.Body>
                        </Accordion.Item> */}
                    <div className="my-5 d-flex justify-content-end ">
                        <Button variant="secondary" type="button" className="mx-2" onClick={handleCancel}>
                            CANCEL
                        </Button>
                        <Button variant="primary" type="submit" className="mx-2 btn-primary-background">
                            SAVE
                        </Button>
                    </div>
                </Form>
                {/* </div>
            </Accordion> */}
                <ToastContainer />
                <LogoModal image={image} setImage={setImage} show={show} handleClose={handleClose} />
            </>
    );
}

