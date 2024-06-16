import React, { useEffect, useState } from 'react';
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { Link, useParams, useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { ToastContainer, toast } from "react-toastify";

export default function Staff(props) {
  let navigate = useNavigate();
  const [userList, setUserList] = useState();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [data, setData] = useState();
  let params = useParams();
  useEffect(() => {
    API.get(`identity/usersbygroup/2`).then((response) => {
      console.log("user list", response.data);
      setUserList(response.data);
      //setStaffData(response.data);
    })
      .catch((err) => {
        console.log("err", err);
      });
  }, [])
  console.log("props", props);
  const handleChange = (e) => {
    console.log("input value", e.target.value, e.target.name);
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }
  const onSubmit = () => {
    console.log("staff data", data);
    let setPayload = {
      "user_id": data?.user_id,
      "staff_type": data?.staff_type,
      "program_id": params?.id
    }
    API.post('program/api/program/createstaff/', setPayload).then((response) => {
      console.log("user detail", response.data);
      toast.success('Add Staff Successfully');
      setTimeout(() => {
        navigate("/editProgram/" + params?.id + "?tab=staff");
      }, 800);
    })
      .catch((err) => {
        console.log("err", err);
        toast.error("This fields are Required");
      });
  }
  return (
    <div className='p-4'>
      <h4>Add Staff</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            <label className='mb-2'>Staff Type</label>
            <select className='form-select'
              name="staff_type"
              onChange={(e) => handleChange(e)}
            // {...register("staff", { required: true })}
            >
              <option value=''>Select Staff</option>
              <option value="mentor">Mentor</option>
              <option value='teacher'>Teacher</option>
            </select>
            {/* {errors.staff && (<span className="validationError">Staff is required</span>)} */}
          </div>
        </div>
        <div className="my-3">
          <Link to={"/editProgram/" + params?.id + "?tab=staff"} className="btn btn-secondary mr-2">
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
