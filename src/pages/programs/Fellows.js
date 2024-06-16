import React, { useEffect, useState } from 'react';
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { Link, useParams, useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { ToastContainer, toast } from "react-toastify";

export default function Fellows() {
    let navigate = useNavigate();
    const [userList, setUserList] = useState();
    const [data, setData] = useState();
    const [staffData, setStaffData] = useState();
    let params = useParams();
    const { register, handleSubmit, formState: { errors } } = useForm();
    useEffect(() => {
        API.get(`identity/usersbygroup/3`).then((response) => {
            console.log("user list", response.data);
            setUserList(response.data);
            //setStaffData(response.data);
        })
            .catch((err) => {
                console.log("err", err);
            });

        API.get(`program/api/program/staff_by_programId/` + params?.id + "/").then((response) => {
            console.log("user detail", response.data);
            setStaffData(response.data);
        })
            .catch((err) => {
                console.log("err", err);
            });
    }, [])
    const handleChange = (e) => {
        console.log("input value", e.target.value, e.target.name);
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }
    const onSubmit = () => {
        console.log("staff data", data);
        let setPayload = {
            "user_id": data?.user_id,
            "is_completed": true,
            "status": data?.status,
            "assigned_ta": data?.assigned_ta,
            "program_id": params?.id,
            "application_status": "APPLIED",
            "assigned_teame": "string",
            "assigned_cse": "string",
        }
        API.post('program/api/program/createfellows/', setPayload).then((response) => {
            console.log("user detail", response.data);
            toast.success('Add Staff Successfully');
            setTimeout(() => {
                navigate("/editProgram/" + params?.id + "?tab=fellows");
            }, 800);
        })
            .catch((err) => {
                console.log("err", err);
                toast.error("This fields are Required");
            });
    }
    return (
        <div className='p-4'>
            <h4>Add Fellows</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* <div className='row mb-3'>
                    <div className='col-md-4'>
                        <label className='mb-2'>Name <span className="required">*</span></label>
                        <input className='form-control' {...register("name", { required: true })} type='text' name='name' placeholder='Please Enter Full Name' />
                        {errors.name && <span className="validationError">Name is required</span>}
                    </div>
                    <div className='col-md-4'>
                        <label className='mb-2'>Email <span className="required">*</span></label>
                        <input type="email" {...register("email", { required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} className='form-control' placeholder='Please Enter Email' />
                        {errors.email && <span className="validationError">Email is required</span>}
                    </div>
                    <div className='col-md-4'>
                        <label className='mb-2'>Phone Number</label>
                        <input className='form-control' type='number' placeholder="Please Enter Phone No" />
                    </div>
                </div> */}
                <div className='row mb-3'>
                    <div className='col-md-4'>
                        <label className='mb-2'>User Name</label>
                        <select className='form-select'
                            name="user_id"
                            onChange={(e) => handleChange(e)}
                        // {...register("user_id", { required: true })}
                        >
                            <option value=''>Select User</option>
                            {userList && userList.map((item, i) => (
                                <option value={item.id}>{item.username}</option>
                            ))}
                        </select>
                        {/* {errors.user_id && (<span className="validationError">User is required</span>)} */}
                    </div>
                    <div className='col-md-4'>
                        <label className='mb-2'>Status</label>
                        <select className='form-select' onChange={(e) => handleChange(e)} name="status">
                            <option value=''>Select Status</option>
                            <option value='Enrolled'>Enrolled</option>
                            <option value='Withdrawn'>Withdrawn</option>
                        </select>
                    </div>
                    <div className='col-md-4'>
                        <label className='mb-2'>Select Staff</label>
                        <select className='form-select' onChange={(e) => handleChange(e)} name="assigned_ta">
                            <option value=''>Select Staff</option>
                            {staffData?.response && staffData?.response?.map((item, i) => (
                                <option value={item.identity.id}>{item.identity.first_name + item.identity.last_name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="my-3">
                    <Link to={"/editProgram/" + params?.id + "?tab=fellows"} className="btn btn-secondary mr-2">
                        CANCEL
                    </Link>
                    <Button variant="primary" type="submit" className="btn-primary-background mx-2">
                        SAVE
                    </Button>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}
