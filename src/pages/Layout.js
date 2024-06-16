import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import logo from '../c1logo_color.webp';
import { IconContext } from "react-icons";
import { TbDotsDiagonal } from "react-icons/tb";
import { MdOutlineDashboard, MdOutlineFolder } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { Link,useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';



export default function Layout() {
  let navigate = useNavigate();
  const Logout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };
  // const { collapseSidebar } = useProSidebar();

  return (
    <>
      <div className="app-wrapper">
        <Sidebar className="sidebar" collapsedWidth="0px" customBreakPoint="800px">
          <Navbar.Brand as={Link} to="/programList"><img src={logo} alt="logo" className='img-fluid mb-2 mainLogo' /></Navbar.Brand>
          <Menu>
            <MenuItem routerLink={<Link to="/programList" />}><IconContext.Provider value={{ size: '1.5rem' }}><MdOutlineFolder /></IconContext.Provider> Programs</MenuItem>
            <MenuItem routerLink={<Link to="/dashboard" />}><IconContext.Provider value={{ size: '1.5rem' }}><MdOutlineDashboard /></IconContext.Provider> Program Dashboards</MenuItem>
            <MenuItem routerLink={<Link to="/ops-resources" />}><IconContext.Provider value={{ size: '1.5rem' }}><TbDotsDiagonal /></IconContext.Provider> Ops Resources</MenuItem>
            <MenuItem onClick={Logout}><IconContext.Provider value={{ size: '1.5rem' }}><BiUser /></IconContext.Provider> Logout</MenuItem>
          </Menu>
        </Sidebar>
        <div className='main-wrapper'>
          <Header />
          <div><Outlet /></div>
        </div>
      </div>
    </>
  )
}
