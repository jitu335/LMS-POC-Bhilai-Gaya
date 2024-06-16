import React, { useState } from 'react'
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import API from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {

    let navigate = useNavigate();
    const [data, setData] = useState();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const validate = (data) => {
        if (data?.new_password === data?.confirm_password) {
            errors.confirm_password = false;
        } else {
            errors.confirm_password = true;
        }
    };

    // For Error Message
    const oldPasswordField = register("old_password", { required: true });
    const newPasswordField = register("new_password", { required: true });
    const confirmPasswordField = register("confirm_password", { validate: validate(data) });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    }

    const submit = () => {
        var userId = localStorage.getItem('userId')
        let apiData = {
            "old_password": data?.old_password,
            "new_password": data?.new_password
        }
        console.log(apiData)
        API.patch('identity/change-password/', apiData).then((response) => {
            if (response.status === 200) {
                console.log("response data", response.data);
                toast.success("Password updated successfully");
                setTimeout(() => {
                    navigate('/');
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
    return (
        <div className="p-4 user-reset-password">
            <div className="row">
                <div className="col-md-4">{/* Right col */}
                    <h4 className="mb-2 mt-2">
                        Reset Password:
                    </h4>
                    <Form onSubmit={handleSubmit(submit)}>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="">
                                <Form.Label className='required-field'>Current Password</Form.Label>
                                <Form.Control type="password" placeholder="Current Password" name="old_password" value={data?.old_password}  {...oldPasswordField} onChange={(e) => { oldPasswordField.onChange(e); handleChange(e); }} />
                                {errors.old_password && (<span className="validationError">Current Password is required!</span>)}
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="">
                                <Form.Label className='required-field'>New Password</Form.Label>
                                <Form.Control type="password" placeholder="New Password" name="new_password" value={data?.new_password} {...newPasswordField} onChange={(e) => { newPasswordField.onChange(e); handleChange(e); }} />
                                {errors.new_password && (<span className="validationError">New Password is required!</span>)}
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="">
                                <Form.Label className='required-field'>Confirm New Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm New Password" name="confirm_password" value={data?.confirm_password} {...confirmPasswordField} onChange={(e) => { confirmPasswordField.onChange(e); handleChange(e); }} />
                                {errors.confirm_password && (<span className="validationError">Confirm Password should be same as New Password!</span>)}
                            </Form.Group>
                        </Row>
                        <div className="mb-3">
                            <Button variant="primary" type="submit" className='btn btn-primary-background'>
                                Submit
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
