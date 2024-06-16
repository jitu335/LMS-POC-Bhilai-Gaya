import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import LogoModal from "../../components/LogoModal";
import API from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";

export default function Program() {

  let navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
  const [program, setProgram] = useState({});
  const [image, setImage] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    API.get('program/api/program/master/programcategory/')    
      .then((response) => {
        if (response.status === 200) {   
          setProgramCategory(response.data);
          setProgramCategorySelected(response.data[0].id)
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
          setProgramTypeSelected(response.data[0].id)
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
          setProgramRegionSelected(response.data[0].id)
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
          setProgramCohortSelected(response.data[0].id)
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
          setAdmissionTypeSelected(response.data[0].id)
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
          setLanguageSelected(response.data[0].id)
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
          setCurriculumCategorySelected(response.data[0].id)
        } else {
          toast.error(response.error_description);
        }
      }).catch((err) => {
        toast.error(err.response.data.error_description);
      });
  }

  const handleCancel = () => {
    navigate('/programList');
  }
  const handleChange = (e) => {
    setProgram({
      ...program,
      [e.target.name]: e.target.value
    })
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

  const onSubmit = (e) => {
    var userId = localStorage.getItem('userId')
    let apiData = {
      name: program.name,
      program_type_fk: programTypeSelected,
      category_fk: programCategorySelected,
      cohort_fk: programCohortSelected,
      region_fk: programRegionSelected,
      curriculum_category_fk: curriculumCategorySelected,
      admission_type_fk: admissionTypeSelected,
      language_fk: languageSelected,
      start_date: program.startDate,
      end_date: program.endDate,
      target_class_size: program.targetClassSize,
      manager: program.manager,
      program_email: program.email,
      logo_url: image,
      is_active: program.isActive,
      is_favorite: false,
      discription: program.description,
      created_by: userId,
      updated_by: userId,
    }
    console.log(apiData)
    API.post('program/api/program/detailprogram/', apiData).then((response) => {
      if (response.status === 201) {
        console.log("response data", response.data);
        toast.success("Program added successfully");
        setTimeout(() => {
          navigate('/programList');
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

  const validate = (program) => {
    if (program?.endDate === "") {
      errors.dateValidate = false;
    }
    if (program?.endDate < program?.startDate) {
      errors.dateValidate = true;
    } else {
      errors.dateValidate = false;
    }
  };

  // For Error Message
  const nameField = register("name", { required: true });
  const managerField = register("manager", { required: true });
  const descriptionField = register("description", { required: true });
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const emailField = register("email", { required: true, pattern: regex });
  const targetClassSizeField = register("targetClassSize", { required: true });
  const startDateField = register("startDate", { required: true });
  const endDateField = register("endDate", { required: true });
  const dateValidateField = register("endDate", { validate: validate(program) });

  return (
    <div className="p-4">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="pInfo">
          <h4 className="mb-4">Program Information</h4>
          <Row className="mb-3">
            <Col xs={12} md={4} lg={4}>
              <Form.Group controlId="type">
                <Form.Label>Program Type</Form.Label>
                <Form.Select name="programTypeSelected" value={programTypeSelected} onChange={handleType}>
                  {programType.map(({ id, type }, index) => <option value={id} key={id}>{type}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} md={4} lg={4}>
              <Form.Group controlId="category">
                <Form.Label>Program Category</Form.Label>
                <Form.Select name="programCategorySelected" value={programCategorySelected} onChange={handleCategory}>
                  {programCategory.map(({ id, category }, index) => <option value={id} key={id}>{category}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} md={4} lg={4}>
              <Form.Group controlId="cohort">
                <Form.Label>Program Cohort</Form.Label>
                <Form.Select name="cohort" value={program.cohort} onChange={handleCohort}>
                  {programCohort.map(({ id, cohort_number }, index) => <option value={id} key={id}>{cohort_number}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-2">
            <Form.Group as={Col} xs={12} md={4} lg={4} controlId="name">
              <Form.Label className="required-field">Program Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Program name" name="name" defaultValue={program?.name} {...nameField} onChange={(e) => { nameField.onChange(e); handleChange(e); }} />
              {errors.name && (<span className="validationError">Program Name is required!</span>)}
            </Form.Group>
            <Form.Group as={Col} xs={12} md={4} lg={4} controlId="email">
              <Form.Label className="required-field">Program Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter Program email address" name="email" defaultValue={program?.email} {...emailField} onChange={(e) => { emailField.onChange(e); handleChange(e); }} />
              {errors.email && (<span className="validationError">Program Email Address is required!</span>)}
            </Form.Group>
            <Form.Group as={Col} xs={12} md={4} lg={4} controlId="manager">
              <Form.Label className="required-field">Program Manager</Form.Label>
              <Form.Control name="manager" placeholder="Enter Program Manager" defaultValue={program?.manager} {...managerField} onChange={(e) => { managerField.onChange(e); handleChange(e); }} />
              {errors.manager && (<span className="validationError">Program Manager is required!</span>)}
            </Form.Group>
          </Row>
          <Row className="mb-2">
            <Form.Group as={Col} xs={12} md={4} lg={4} controlId="description">
              <Form.Label className="required-field">Program Description</Form.Label>
              <Form.Control name="description" placeholder="Enter Program Description" defaultValue={program.description} {...descriptionField} onChange={(e) => { descriptionField.onChange(e); handleChange(e); }} />
              {errors.description && (<span className="validationError">Program Description is required!</span>)}
            </Form.Group>
            <Form.Group as={Col} xs={12} md={4} lg={4} controlId="logo">
              <Form.Label>Program Logo</Form.Label>
              {/* <Form.Control type="file" /> */}
              <div className="d-flex">
                {image ? <img src={image} alt="logo" className='selectedLogo' />
                  // <BiImageAlt size="2.4rem" />
                  : <><Form.Control placeholder="" type="text" readOnly />
                    <Button variant="dark" type="button" className="mx-2 btn-primary-background" size="sm" onClick={handleShow}>
                      BROWSE
                    </Button></>
                }
              </div>
            </Form.Group>

            {/* <Form.Group as={Col} xs={12} md={4} lg={4} controlId="admins">
              <Form.Label>Other Program Admins</Form.Label>
              <Form.Select defaultValue="">
                <option>A</option>
                <option>...</option>
              </Form.Select>
            </Form.Group> */}

            <Form.Group as={Col} xs={12} md={4} lg={4} controlId=""></Form.Group>
          </Row>
        </div>

        <div className="pDates mt-4">
          <h4 className="mb-3">Program Dates</h4>
          <Row className="mb-3">
            <Form.Group as={Col} xs={12} md={4} lg={4} controlId="startDate">
              <Form.Label className="required-field">Program Start Date</Form.Label>
              <Form.Control type="date" placeholder="" name="startDate" {...startDateField} onChange={(e) => { startDateField.onChange(e); handleChange(e); }} />
              {errors.startDate && (<span className="validationError">Start Date is required!</span>)}
            </Form.Group>

            <Form.Group as={Col} xs={12} md={4} lg={4} controlId="endDate">
              <Form.Label className="required-field">Program End Date</Form.Label>
              <Form.Control type="date" placeholder="" name="endDate" {...endDateField} {...dateValidateField} onChange={(e) => { endDateField.onChange(e); dateValidateField.onChange(e); handleChange(e); }} />
              {errors.endDate && (<><span className="validationError">End Date is required!</span><br /></>)}
              {errors.dateValidate && !errors.endDate && (<span className="validationError">End Date can not be before Start Date!</span>)}
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
            <Form.Group as={Col} xs={12} md={4} lg={4} controlId="details">
              <Form.Label className="required-field">Target Class Size</Form.Label>
              <Form.Control placeholder="Enter Target Class Size" name="targetClassSize" defaultValue={program.targetClassSize} {...targetClassSizeField} onChange={(e) => { targetClassSizeField.onChange(e); handleChange(e); }} />
              {errors.targetClassSize && (<span className="validationError">Target Class Size is required!</span>)}
            </Form.Group>

            <Form.Group as={Col} xs={12} md={4} lg={4} controlId="region">
              <Form.Label>Program Region</Form.Label>
              <Form.Select name="region" value={program.region} onChange={handleRegion}>
                {programRegion.map(({ id, region }, index) => <option value={id} key={id}>{region}</option>)}
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} xs={12} md={4} lg={4} controlId="">
              <Form.Label>Curriculum Category</Form.Label>
              <Form.Select name="curriculumCategory" value={program.curriculumCategory} onChange={handleCurriculumCateogory}>
                {curriculumCategory.map(({ id, category }, index) => <option value={id} key={id}>{category}</option>)}
              </Form.Select>
            </Form.Group>
          </Row>

          <Row className="mb-3 d-flex align-items-center">
            <Form.Group as={Col} xs={12} md={4} lg={4} controlId="admissionType">
              <Form.Label>Admission Type</Form.Label>
              <Form.Select name="admissionType" value={program.admissionType} onChange={handleAdmissionType}>
                {admissionType.map(({ id, type }, index) => <option value={id} key={id}>{type}</option>)}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={4} lg={4} controlId="language">
              <Form.Label>Language</Form.Label>
              <Form.Select name="language" value={program.language} onChange={handleLanguage}>
                {language.map(({ id, language }, index) => <option value={id} key={id}>{language}</option>)}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={4} lg={4}>
              <Form.Check type="switch" id="isActive" label="Program Site is Active" name="isActive" value={program.isActive} onChange={handleCheck} />
            </Form.Group>
          </Row>
          {/* <Row>
            <Form.Group as={Col} xs={12} md={4} lg={4}>
              <Form.Check
                type="switch"
                id="includeTrainingAccess"
                label="Program includes Training App Access For Fellows" onChange={handleCheck}
              />
            </Form.Group>
            <Form.Group as={Col} xs={12} md={4} lg={4}>
              <Form.Check
                type="switch"
                id="internalView"
                label="Program Site Is Internal View Only" onChange={handleCheck}
              />
            </Form.Group>
            <Form.Group as={Col} xs={12} md={4} lg={4} controlId=""></Form.Group>
          </Row> */}
        </div>

        <div className="mt-5">
          <span>
            Note:  This Information will be saved and editable in the program details on the Program Summary tab
          </span>
        </div>
        <div className="my-3">
          <Button variant="secondary" type="button" className="mx-2" onClick={handleCancel}>
            CANCEL
          </Button>
          <Button variant="primary" type="submit" className="mx-2 btn-primary-background" >
            SAVE
          </Button>
        </div>
      </Form >
      <ToastContainer />

      <LogoModal image={image} setImage={setImage} show={show} handleClose={handleClose} />

    </div >
  );
}
