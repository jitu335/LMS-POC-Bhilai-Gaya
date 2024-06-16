import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import logo from '../../c1logo_color.webp';
import API from "../../services/api";


function Login() {
  let navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm(); 
  const [email, setemail] = useState(); 
  const [password, setPassword] = useState(); 

  const emailField = register("email", { required: true });
  const passwordField = register("password", { required: true }); 

  const getInputValue = (e) => {
    console.log("input value", e.target.value, e.target.name, email, password);

    if (e.target.name === 'email') {
      setemail(e.target.value);
    } 

    if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  }

  const submit = () => {
    console.log("login", email, password);

    let apiData = {
      email: email,
      password: password,
      grant_type: "password",
      client_id: 'bReb3QwExQ0ARgSUjrgHY5N0Nol8UUmKcwnJqp7b',
      client_secret: 'JfohN5zJTNpdRMWVJPn6AYOipmQkCMW5AaeftGB8a1rsHd1TwNaI6Hj8CyZHU3R',
    }

    const data = API.login('identity/o/token/', apiData).then((response) => {

      if (response.status === 200) {
        console.log("response data", response.data);

        localStorage.setItem("authtoken", response.data.access_token);
        localStorage.setItem("expires_in", response.data.expires_in);
        localStorage.setItem("refresh_token", response.data.refresh_token);

        let isAuthtoken = localStorage.getItem("authtoken");
        console.log("isAuthtoken", isAuthtoken);

        toast.success("Loggedin Successfully"); 

        setTimeout(() => {
          navigate('/programList');
          window.location.reload();
        }, 800);
      } else {
        console.log("response", response)
        toast.error(response.error_description);
      }
    })
      .catch((err) => {
        console.log("err", err);
        toast.error(err.response.data.error_description);
      });
    console.log("isAuthtoken", localStorage.getItem("authtoken"));
    // if (email === 'admin@test.com' && password === '123456') {
    //   toast.success('Login Successfully');
    //   setTimeout(() => {
    //     navigate('/programList');
    //   }, 1000);

    // } else {
    //   toast.error('email or Password incorrect');
    // }
  }
  return (
    <div className="loginWrapper">
      <Container fluid >
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="loginForm">
              <h2 className="mb-4 text-center"><img src={logo} alt="logo" className="img-fluid px-5" /></h2>

              
              <form onSubmit={handleSubmit(submit)}>
                <Form.Group className="mb-3" controlId="formBasicemail">
                  <Form.Label>Email Address <span className="required">*</span></Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter User Name"
                    name="email"
                    {...emailField}
                    onChange={(e) => {
                      emailField.onChange(e);
                      getInputValue(e);
                      }} />
                  {errors.email && <span className="validationError">Email Address is required</span>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password <span className="required">*</span></Form.Label>
                  <Form.Control
                    type="password"
                    name="password" 
                    placeholder="Enter your password"
                    {...passwordField}
                    onChange={(e) => {
                      passwordField.onChange(e);
                      getInputValue(e);
                    }
                    } />
                  {errors.password && <span className="validationError">Password is required</span>}
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Show password" />
              </Form.Group> */}
                <div className="d-grid">
                  <Button size="lg" className="btn-primary-background" variant="primary" type="submit">
                    Login
                  </Button>
                  <Link to="/forgot" className="mt-2 h6">Forgot Password?</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </Container>
    </div>
  );
}

export default Login;
