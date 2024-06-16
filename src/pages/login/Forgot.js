import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import API from "../../services/api";

export default function Forgot() {

    const [email, setEmail] = useState();
    const [vaildEmail, setValidEmail] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const getInputValue = (e) => {
        console.log("input value", e.target.value, e.target.name);
        if (e.target.name === "email") {
            setEmail(e.target.value);
        }
    };
    const submit = () => {
        console.log("login", email);
        var userId = localStorage.getItem('userId')
        let apiData = {
            "email": email
        }
        console.log("email", apiData)
        API.login('identity/password_reset/', apiData).then((response) => {
            if (response.status === 200) {
                console.log("response data", response.data);
                // toast.success("Password updated successfully");
                setValidEmail(true);
            } else {
                console.log("response", response)
                toast.error(response.error_description);
            }
        })
            .catch((err) => {
                console.log("err", err);
                // toast.error(err.response.data.error_description);
                toast.error(err.response?.data?.email[0])
            })
    };
    return (
        <>
            <div className="loginWrapper">
                <Container fluid>
                    <div className="row">
                        <div className="col-md-4"></div>
                        <div className="col-md-4">
                            <div className="loginForm">
                                {vaildEmail ?
                                    <div>
                                        <h2>
                                            Email has been sent successfully, please check your email and follow
                                            instruction to reset your password.
                                        </h2>
                                        <Link to="/" className="h6 mt-2">Click here to return to the login page</Link>
                                    </div>
                                    :
                                    <>
                                        <h2 className="mb-4 text-center">Forgot Password?</h2>
                                        <form onSubmit={handleSubmit(submit)}>
                                        
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                {/* <Form.Label>Email address</Form.Label> */}
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Enter your registered email"
                                                    name="email"
                                                    {...register("email", {
                                                        required: true,
                                                        pattern:
                                                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                    })}
                                                    onChange={(e) => getInputValue(e)}
                                                />
                                                {errors.email && (
                                                    <span className="validationError">Email is required</span>
                                                )}
                                            </Form.Group>

                                            <div className="d-flex justify-content-between align-items-center">
                                                <Button variant="primary" type="submit">
                                                    Submit
                                                </Button>
                                                <Link to="/" className="h6 text-right mb-0">Cancel</Link>
                                            </div>

                                        </form>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                </Container>
            </div>

        </>
    );
}
