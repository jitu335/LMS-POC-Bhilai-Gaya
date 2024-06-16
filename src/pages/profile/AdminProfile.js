import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import logo from '../../assets/media/user-icon.png';
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import API from "../../services/api";

export default function AdminProfile() {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const [file, setFile] = useState();
    const [userToken, setUserToken] = useState();
    const [userProfile, setUserProfile] = useState();
    const [loader, setLoader] = useState(true);
    let userID = localStorage.getItem("userId");
    const nameField = register("name", { required: true });
    const bioField = register("bio", { required: true });
    const emailField = register("alternate_email", { required: true });
    const contactField = register("alternate_contact", { required: true });
    useEffect(() => {
        //setLoader(true);
        API.get(`profile/api/user/profile_by_user_id/` + userID + "/").then((response) => {
            console.log("user detail", response.data);
            setUserToken(response?.data?.[0]?.id);
            setUserProfile((item) => ({
                ...item,
                "name": response?.data?.[0]?.name,
                "bio": response?.data?.[0]?.bio,
                "alternate_email": response?.data?.[0]?.alternate_email,
                "alternate_contact": response?.data?.[0]?.alternate_contact,
            }));
            setFile(response?.data?.[0]?.profile_image_url);
            setLoader(false);
        })
            .catch((err) => {
                console.log("err", err);
            });
    }, [])
    const handleChange = (e) => {
        console.log("file name", e.target.files[0], e.target.value, e);
        let file = e.target.files[0];
        if (file.type != 'image/png' && file.type != 'image/jpeg') {
            toast.error("File does not support. You must use .png or .jpg ");
            return false;
        }
        if (file.size > 10e6) {
            toast.error("Please upload a file smaller than 10 MB");
            return false;
        }
        setFile(e.target.files[0]);
        const formData = new FormData();
        formData.append("image_url", file);
        API.post('admission/api/admission/media/upload/', formData).then((response) => {
            if (response.status === 201) {
                console.log("response data", response.data);
                setFile(response?.data?.image_url)
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

    const handleInputChange = (e) => {
        console.log("input value", e.target.value, e.target.name);
        const { name, value } = e.target;
        setUserProfile({ ...userProfile, [name]: value });
    }

    const submit = () => {
        const formData = new FormData();

        formData.append("user_id", userID);
        formData.append("profile_image_url", file);
        formData.append("created_by", 'admin');
        formData.append("updated_by", 'admin');
        formData.append("name", userProfile.name);
        formData.append("bio", userProfile.bio);
        formData.append("alternate_email", userProfile.alternate_email);
        formData.append("alternate_contact", userProfile.alternate_contact);
        // let apiData = {
        //     "user_id": userID,
        //     "profile_image_url": file,
        //     "created_by": 'admin',
        //     "updated_by": 'admin',
        //     "name": userProfile.name,
        //     "bio": userProfile.bio,
        //     "alternate_email": userProfile.alternate_email,
        //     "alternate_contact": userProfile.alternate_contact,
        //     userProfile
        // }
        console.log("text Admin", file, userToken);

        API.put(`profile/api/user/user_profile/` + userToken + "/", formData).then((response) => {
            if (response.status === 200) {
                console.log("response data", response.data);

                setUserProfile({
                    "name": response?.data?.name,
                    "bio": response?.data?.bio,
                    "alternate_email": response?.data?.alternate_email,
                    "alternate_contact": response?.data?.alternate_contact,
                })
                setFile(response?.data?.profile_image_url);
                toast.success("Profile Updated Successfully");
            } else {
                console.log("response", response)
                //toast.error(response.error_description);
            }
        })
        // .catch((err) => {
        //     console.log("err", err);
        //     //toast.error(err?.response?.data?.name + '<br/>' + err?.response?.data?.bio + '<br/>' + err?.response?.data?.alternate_email + '<br/>' + err?.response?.data?.alternate_contact);
        // });
    }

    console.log("file", file);

    return (
        <div className="p-4 user-profile-container">
            {loader ? <></> : <>
                <div className="row">
                    <div className="col-sm-12 p-2 profile-avtar-section">{/* left col */}
                        <div className="text-center avtar-text">
                            <img src={file !== '' ? file : logo} alt="logo" className='img-fluid mb-2 mt-2' />
                            <div className="font-size-12">Upload a different photo...(only png or jpeg allow and file size max 10mb supported)</div>
                            <input type="file" className="text-center center-block file-upload mb-2 mt-2" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="col-sm-12 personal-info">{/* Right col */}
                        <h4 className="mb-2 mt-2">
                            Personal Information:
                        </h4>
                        <Form onSubmit={handleSubmit(submit)}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="manager">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        placeholder="Please Enter Name"
                                        type="text"
                                        name="name"
                                        defaultValue={userProfile?.name}
                                        {...nameField}
                                        onChange={(e) => {
                                            nameField.onChange(e);
                                            handleInputChange(e);
                                        }} />
                                    {errors.name && (<span className="validationError">Name is required</span>)}
                                </Form.Group>
                                <Form.Group as={Col} controlId="manager">
                                    <Form.Label>Bio</Form.Label>
                                    <Form.Control
                                        placeholder="Please Enter Bio"
                                        name="bio"
                                        defaultValue={userProfile?.bio}
                                        {...bioField}
                                        onChange={(e) => {
                                            bioField.onChange(e);
                                            handleInputChange(e);
                                        }} />
                                    {errors.bio && (<span className="validationError">Bio is required</span>)}
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} controlId="email">
                                    <Form.Label>Alternative Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="alternate_email"
                                        placeholder="Enter Email Address"
                                        {...emailField}
                                        onChange={(e) => {
                                            emailField.onChange(e);
                                            handleInputChange(e);
                                        }}
                                        defaultValue={userProfile?.alternate_email}
                                    />
                                    {errors.alternate_email && (<span className="validationError">Email is required</span>)}

                                </Form.Group>
                                <Form.Group as={Col} controlId="email">
                                    <Form.Label>Alternative Contact Number</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="alternate_contact"
                                        placeholder="Enter Contact Number"
                                        defaultValue={userProfile?.alternate_contact}
                                        maxLength={10}
                                        {...contactField}
                                        onChange={(e) => {
                                            contactField.onChange(e);
                                            handleInputChange(e);
                                        }}
                                    />
                                    {errors.alternate_contact && (<span className="validationError">Alternative Contact is required</span>)}

                                </Form.Group>
                            </Row>

                            <div className="my-3">
                                {/* <Button variant="primary" type="button" className="mx-2">
                                CANCEL
                            </Button> */}
                                <Button variant="primary" type="submit" className="mx-2 btn-primary-background">
                                    SAVE
                                </Button>
                            </div>
                        </Form>
                    </div>

                </div>

                <ToastContainer />
            </>
            }
        </div>
    );
}
