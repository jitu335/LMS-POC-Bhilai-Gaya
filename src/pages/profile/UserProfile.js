import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import logo from '../../assets/media/user-icon.png';
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";



export default function UserProfile() {
    const [file, setFile] = useState();
    const [name, setName] = useState('John Deo')
    const [email, setEmail] = useState('user@gmail.com')
    const [bio, setBio] = useState('This is user bio text')
    const [contact_number, setContactNumber] = useState(1324567890);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleChange = (e) => {

        let file = e.target.files[0];
        console.log(file.type)
        if (file.type != 'image/png' && file.type != 'image/jpeg') {
            toast.error("File does not support. You must use .png or .jpg ");
            return false;
        }
        if (file.size > 10e6) {
            toast.error("Please upload a file smaller than 10 MB");
            return false;
        }
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    const submit = () => {
        if (!name || !email || !bio || !contact_number) {
            toast.error("1 or more fields heaving error, please check");
        } else {
            toast.success('Details Updated Successfully');
        }

    }

    return (
        <div className="p-4 user-profile-container">
            <div className="row">
                <div className="col-sm-12 p-2 profile-avtar-section">{/* left col */}

                    <div className="text-center avtar-text">
                        <img src={file ? file : logo} alt="logo" className='img-fluid mb-2 mt-2' />
                        <div className="font-size-12">Upload a different photo...(only png or jpeg allow and file size max 10mb supported)</div>
                        <input type="file" className="text-center center-block file-upload mb-2 mt-2" onChange={handleChange} />
                    </div>
                </div>
                <div className="col-sm-12 personal-info">{/* Right col */}
                    <h4 className="mb-2 mt-2">
                        John Deo
                    </h4>

                    <Tabs
                        defaultActiveKey="PersonalInformation"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="PersonalInformation" title="Personal Information">
                            <Form onSubmit={handleSubmit(submit)}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="manager">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control placeholder="Admin" name="name" value={name} {...register("name", { required: true })} onChange={(e) => setName(e.target.value)} />
                                        {errors.name && <span className="validationError">Name is required</span>}
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="manager">
                                        <Form.Label>Bio</Form.Label>
                                        <Form.Control placeholder="Bio" name="bio" value={bio} {...register("bio", { required: true })} onChange={(e) => setBio(e.target.value)} />
                                        {errors.bio && <span className="validationError">Bio is required</span>}
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} controlId="email">
                                        <Form.Label>Alternative Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            {...register("email", { required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                                            placeholder="Enter Email Address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        {errors.email && <span className="validationError">Email is required</span>}

                                    </Form.Group>
                                    <Form.Group as={Col} controlId="email">
                                        <Form.Label>Alternative Contact Number</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="contact"
                                            {...register("contact", { required: true })}
                                            placeholder="Enter Contact Number"
                                            value={contact_number}
                                            onChange={(e) => setContactNumber(e.target.value)}
                                            maxLength={10}
                                        />
                                        {errors.contact_number && <span className="validationError">Alternative Contact is required</span>}

                                    </Form.Group>
                                </Row>

                                <div className="my-3">
                                    <Button variant="primary" type="button" className="mx-2">
                                        CANCEL
                                    </Button>
                                    <Button variant="primary" type="submit" className="mx-2">
                                        SAVE
                                    </Button>
                                </div>
                            </Form>
                        </Tab>
                        <Tab eventKey="AddressInformation" title="Address Information">
                            Tab 2
                        </Tab>
                        <Tab eventKey="ExperienceInformation" title="Experience Information">
                            Tab 2
                        </Tab>
                        <Tab eventKey="Education" title="Education">
                            Tab 3
                        </Tab>
                    </Tabs>
                </div>
            </div>




            {/* <Form>
                <div className="pInfo">
                    <h4 className="mb-4">
                        User Name
                    </h4>




                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="type">
                            <Form.Label>Program Type</Form.Label>
                            <Form.Select defaultValue="Outskilling">
                                <option>Outskilling</option>
                                <option>...</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="category">
                            <Form.Label>Program Category</Form.Label>
                            <Form.Select defaultValue="DSA4 Women">
                                <option>DSA4 Women</option>
                                <option>...</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="cohort">
                            <Form.Label>Program Cohort</Form.Label>
                            <Form.Select defaultValue="2.0">
                                <option>2.0</option>
                                <option>...</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="manager">
                            <Form.Label>Project Manager</Form.Label>
                            <Form.Control placeholder="Maria John" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="logo">
                            <Form.Label>Project Logo</Form.Label>
                            <Form.Control placeholder="" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="name">
                            <Form.Label>Project Name</Form.Label>
                            <Form.Control placeholder="DSA4 Women 2.0" />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} controlId="email">
                            <Form.Label>Project Manager</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Program email address"
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="admins">
                            <Form.Label>Other Program Admins</Form.Label>
                            <Form.Select defaultValue="">
                                <option>A</option>
                                <option>...</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="admins">
                        </Form.Group>
                    </Row>
                </div>

                <div className="pDates mt-4">
                    <h4 className="mb-3">Program Dates</h4>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="programDates">
                            <Form.Label>Project Dates</Form.Label>
                            <Form.Control type="date" placeholder="" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="endDate">
                            <Form.Label>Course End Date</Form.Label>
                            <Form.Control type="date" placeholder="" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="admins">
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} controlId="appOpenDate">
                            <Form.Label>Application Open Date</Form.Label>
                            <Form.Control type="date" placeholder="Program email address" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="appEndDate">
                            <Form.Label>Application End Date</Form.Label>
                            <Form.Control type="date" placeholder="" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="admins">
                        </Form.Group>
                    </Row>
                </div>

                <div className="pDetails mt-4">
                    <h4 className="mb-3">Program Details</h4>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="details">
                            <Form.Label>Target Class Size</Form.Label>
                            <Form.Control placeholder="" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="region">
                            <Form.Label>Program Region</Form.Label>
                            <Form.Select defaultValue="">
                                <option>Choose ..</option>
                                <option>...</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="curriculumCategory">
                            <Form.Label>Curriculum Category</Form.Label>
                            <Form.Select defaultValue="">
                                <option>Choose ..</option>
                                <option>...</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Check
                                type="switch"
                                id="includeTrainingAccess"
                                label="Program includes Training App Access For Fellows"
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="admissionType">
                            <Form.Label>Admission Type</Form.Label>
                            <Form.Control placeholder="" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="language">
                            <Form.Label>Language</Form.Label>
                            <Form.Control placeholder="" />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col}>
                            <Form.Check
                                type="switch"
                                id="siteActive"
                                label="Program Site is Active"
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Check
                                type="switch"
                                id="internalView"
                                label="Program Site Is Internal View Only"
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="admins">
                        </Form.Group>
                    </Row>
                </div>

                <div className="mt-5">
                    <span>
                        Note: This Information Will Be Saved And Editable In The Program
                        Details On The Program Summary Tab
                    </span>
                </div>
                <div className="my-3">
                    <Button variant="primary" type="button" className="mx-2">
                        CANCEL
                    </Button>
                    <Button variant="primary" type="submit" className="mx-2">
                        SAVE
                    </Button>
                </div>
            </Form> */}
        </div>
    );
}
