import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import API from '../../services/api';
import { ToastContainer, toast } from "react-toastify";
import PaginationTabs from '../../components/Pagination';

export default function StaffList(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [staffData, setStaffData] = useState();
    const [searchName, setSearchName] = useState("");
    const [query, setQuery] = useState({
        totalPages: 0,
        currentPage: 1,
        pages: [],
        //sortBy: "createdDate,DESC",
        perPage: 5,
    });
    console.log("props", props);
    useEffect(() => {
        API.get(`program/api/program/staff_by_programId/` + props.programId + `/?page=${query?.currentPage === 1 ? query?.currentPage : query?.currentPage
            }&page_size=${query?.perPage}${searchName ? `&name=${searchName}` : ''}`).then((response) => {
                console.log("user detail", response.data);
                setStaffData(response.data);
                let noOfPages = Math.ceil(response.data.count / 5);
                console.log("noOfPages", noOfPages);
                setQuery((q) => ({
                    ...q,
                    totalPages: noOfPages,
                    pages: new Array(noOfPages).fill().map((_i, inx) => inx),
                }));
            })
            .catch((err) => {
                console.log("err", err);
            });
    }, [props.programId,query?.currentPage])
    const deleteProgram = (id) => {
        console.log("delete program", id);
        API.delete(`program/api/program/createstaff/` + id + "/").then((response) => {
            console.log("program delete", response.data);
            toast.success("Staff Deleted Successfully");
            API.get(`program/api/program/staff_by_programId/` + props.programId + "/").then((response) => {
                console.log("user detail", response.data);
                setStaffData(response.data);
            })
                .catch((err) => {
                    console.log("err", err);
                });
        })
            .catch((err) => {
                console.log("err", err);
            });
    }
    const onSearch = () => {
        API.get(`program/api/program/staff_by_programId/` + props.programId + `/?page=${query?.currentPage === 1 ? query?.currentPage : query?.currentPage
            }&page_size=${query?.perPage}${searchName ? `&name=${searchName}` : ''}`).then((response) => {
                console.log("user detail", response.data);
                setStaffData(response.data);
                let noOfPages = Math.ceil(response.data.count / 5);
                console.log("noOfPages", noOfPages);
                setQuery((q) => ({
                    ...q,
                    totalPages: noOfPages,
                    pages: new Array(noOfPages).fill().map((_i, inx) => inx),
                }));
            })
            .catch((err) => {
                console.log("err", err);
            });
    };
    const paginate = (number) => {
        console.log("number", number);
        setQuery((q) => ({
            ...q,
            currentPage: number,
        }));
    };
    return (
        <>
            <div className='row mb-3'>
                <div className='col-md-3'>
                    <label className='mb-1'>Search Name</label>
                    <input type="text" placeholder="Search Name" className="form-control" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
                </div>
                <div className='col-md-3'>
                    <div className='d-flex align-items-end h-100'>
                        <button className="btn btn-primary mr-1 btn-primary-background" onClick={() => onSearch()}>Go</button>
                    </div>
                    {/* <label className='mb-1'>Status</label>
                    <select className='form-select'>
                        <option>Select Status</option>
                    </select> */}
                </div>
                <div className='col-md-3'>
                    {/* <label className='mb-1'>Custom Label</label>
                    <select className='form-select'>
                        <option>Select Label</option>
                    </select> */}
                </div>

                <div className='col-md-3'>
                    <div className='d-flex justify-content-end align-items-end h-100'>
                        {/* <button className="btn btn-primary mr-1 btn-primary-background">Go</button> */}
                        <Link to={"/addStaff/" + props.programId} className='btn btn-primary btn-primary-background'>Add Staff</Link>
                    </div>
                </div>
            </div>
            <Table striped hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Correlation One Email</th>
                        <th className='text-center'>Phone Number</th>
                        <th className='text-center'>Staff Type</th>
                        <th className='text-center'>City/Town</th>
                        <th className='text-center'>Country</th>
                        <th className='text-center'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {staffData?.results && staffData?.results?.map((item, i) => (
                        <tr>
                            <td>{item?.profile?.[0]?.name}</td>
                            <td>{item?.profile?.[0]?.alternate_email}</td>
                            <td className='text-center'>{item?.profile?.[0]?.alternate_contact}</td>
                            <td className='text-center'>{item?.userprogram?.staff_type}</td>
                            <td className='text-center'>{item?.address?.[0]?.city}</td>
                            <td className='text-center'>{item?.address?.[0]?.country}</td>
                            <td className='text-center'>
                                <button className='tableDeleteBtn' onClick={() => deleteProgram(item?.userprogram?.id)}><MdDelete /></button>
                                {/* <Dropdown className='tableDropdown'>
                                <Dropdown.Toggle id="dropdown-basic">
                                    <BsThreeDotsVertical />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item><Link to="/viewStaff"><MdRemoveRedEye /> View</Link></Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={handleShow}><MdEdit /> Edit</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={() => deleteProgram(item?.userprogram?.id)}><MdDelete /> Delete</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {staffData?.results?.length === 0 && (
                <h5 className="text-center p-3">No Data Found</h5>
            )}
            <div className="row">
                <div
                    style={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center" }}
                >
                    <div style={{ marginTop: "2px" }}>
                        {query.totalPages > 0 && (
                            <PaginationTabs
                                shareQuery={query}
                                pageShare={paginate}
                                paginate={paginate}
                            />
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><h5>Edit Staff Info</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row mb-3'>
                        <div className='col-md-6'>
                            <h6>John</h6>
                        </div>
                        <div className='col-md-6'>
                            <h6>j.dd@co.com</h6>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className="form-group">
                                <label className='mb-2'>Correlation One Email</label>
                                <select className='form-select'>
                                    <option>Select Email</option>
                                    <option>j.dd@co.com</option>
                                    <option>j.dd@co.com</option>
                                </select>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="form-group">
                                <label className='mb-2'>Staff Type</label>
                                <select className='form-select'>
                                    <option>Select Staff</option>
                                    <option>CSC</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size='sm' onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" className='btn-primary-background' size='sm' onClick={handleClose}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
