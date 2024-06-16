import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Layout from "./pages/Layout";
import Signup from "./pages/signup/Signup";
import ProgramList from "./pages/programs/ProgramList";
import Forgot from "./pages/login/Forgot";
import Dashboard from "./pages/Dashboard";
import Program from "./pages/programs/Program";
import EditProgram from "./pages/programs/EditProgram";
import AdminProfile from "./pages/profile/AdminProfile";
import UserProfile from "./pages/profile/UserProfile";
import OpsResources from "./pages/opsresources/OpsResources";
import Staff from "./pages/programs/Staff";
import ViewStaff from "./pages/programs/ViewStaff";
import Fellows from "./pages/programs/Fellows";
import ViewFellows from "./pages/programs/ViewFellows";
import ResetPassword from "./pages/profile/ResetPassword";
import PageNotFound from "./pages/PageNotFound";
import ForgotPassword from "./pages/profile/ForgotPassword";
import API from "./services/api";

function Router(props) {
  let accessToken = localStorage.getItem("authtoken");
  // Start : Code for Referesh Token when Auth Token will expire
  const [expToken, setExpToken] = useState();
  let expires_in = localStorage.getItem("expires_in");
 
  function referesToken() {
      // do your logic
      console.log("This is referesh token expire logic", expires_in)
      let refresh_token = localStorage.getItem("refresh_token");
      console.log("refreshToekn",refresh_token);
      clearTimeout(expToken);
      const tokenExpire = setTimeout(() => {
        referesToken();

        if(localStorage.getItem("refresh_token"))
        {
        let apiData = {
          grant_type: "refresh_token", 
          refresh_token: localStorage.getItem("refresh_token"),
          client_id: 'bReb3QwExQ0ARgSUjrgHY5N0Nol8UUmKcwnJqp7b',
          client_secret: 'JfohN5zJTNpdRMWVJPn6AYOipmQkWD0raj5u2X7UE4qnYXUdzNlfeqN8uhakcEqbxFfRxZDwkq59O00g1grdPtfz7VPt2CMW5AaeftGB8a1rsHd1TwNaI6Hj8CyZHU3R',
        }
        console.log("apiData",apiData);
        
        const data = API.login('identity/o/token/', apiData).then((response) => {
          if (response.status === 200) {
            console.log("response data", response.data);
            localStorage.setItem("authtoken", response.data.access_token);
            localStorage.setItem("expires_in", response.data.expires_in);
            localStorage.setItem("refresh_token", response.data.refresh_token);
            //window.location.reload();
            //let refresh_token = localStorage.getItem("refresh_token");
            //console.log("refreshToekn",refresh_token);
          } else {
            console.log("response", response)
          }
        })
          .catch((err) => {
            console.log("err", err);
          });
        }
      }, expires_in);

  }

  // END: Code for Referesh Token when Auth Token will expire


  //let Navigate = useNavigate();
  const AuthRoutes = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/login" exact element={<Login />} />
          {/* <Route path="*" element={<PageNotFound/>} /> */}
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    )
  }
  const AdminRoutes = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* <Route path="*" element={<PageNotFound/>} /> */}
            <Route path="/addProgram" element={<Program />} />
            <Route path="/editProgram/:id" element={<EditProgram />} />
            <Route index element={<ProgramList />} />
            <Route path="/programList" element={<ProgramList />} />
            <Route path="/login" element={<ProgramList />} />
            <Route path="/addStaff/:id" element={<Staff />} />
            <Route path="/addFellows/:id" element={<Fellows />} />
            <Route path="/viewFellows" element={<ViewFellows />} />
            <Route path="/viewStaff" element={<ViewStaff />} />
            <Route path="/candidate/signup" element={<Signup />} />
            <Route path="/mentor/signup" element={<Signup />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/profile" element={<AdminProfile />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/ops-resources" element={<OpsResources />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    )
  }

  useEffect(() => {
    accessToken !== null && referesToken();
  }, [])
  
  return (
    <>
      {accessToken !== null ? <>{AdminRoutes()}</> : <>{AuthRoutes()}</>}
    </>
  );
}
export default Router;
