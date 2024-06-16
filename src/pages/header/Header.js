//import logo from './c1logo_color.webp';
import './header.css';
import React,{useEffect, useState} from 'react'
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { useProSidebar } from 'react-pro-sidebar';
import API from '../../services/api';

const Header = () => {
  const [userDetail,setUserDetail]=useState();
  const { collapseSidebar, toggleSidebar, broken } = useProSidebar();
  useEffect(() => {
    API.get('identity/me/').then((response) => {
       // console.log("user detail", response.data);
        setUserDetail(response.data);
        localStorage.setItem("userId", response.data.id);
    })
    .catch((err) => {
        console.log("err", err);
    });
}, [])


  return (
    <>
      <Navbar expand="lg" sticky="top">
        {!broken && (
          <button onClick={() => collapseSidebar()} >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
          </svg>
        </button>)}

        <main>
          <div>
            {broken && (
              <button className="btn p-0 btn-toggle" onClick={() => toggleSidebar()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                </svg>
              </button>
            )}
          </div>
        </main>

        
        <NavDropdown
              id="nav-dropdown-dark-example"
              title={userDetail?.username}
              align="end"
            >
              <NavDropdown.Item><Link to="/profile">View Profile</Link></NavDropdown.Item>
              {/* <NavDropdown.Item href="/userprofile">User Profile</NavDropdown.Item> */}
              <NavDropdown.Divider />
              <NavDropdown.Item><Link to="/resetpassword">Reset Password</Link></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
        {/* <Navbar.Brand as={Link} to="/"><img src={logo} alt="logo"/></Navbar.Brand> */}


      </Navbar>
    </>
  )
}

export default Header