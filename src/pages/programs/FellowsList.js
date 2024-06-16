import React, { useState, useEffect } from 'react';
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

export default function FellowsList(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [fellowData, setFellowData] = useState();
    const [searchName, setSearchName] = useState("");
    const [status, setStatus] = useState("");
    console.log("props", props);
    const [query, setQuery] = useState({
        totalPages: 0,
        currentPage: 1,
        pages: [],
        //sortBy: "createdDate,DESC",
        perPage: 5,
    });
    useEffect(() => {
        API.get(`program/api/program/fellows_by_programId/` + props.programId + `/?page=${query?.currentPage === 1 ? query?.currentPage : query?.currentPage
            }&page_size=${query?.perPage}${searchName ? `&name=${searchName}` : ''}${status ? `&status=${status}` : ''}`).then((response) => {
                console.log("user detail", response.data);
                setFellowData(response.data);
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
    }, [query?.currentPage]);
    const paginate = (number) => {
        console.log("number", number);
        setQuery((q) => ({
            ...q,
            currentPage: number,
        }));
    };
    const deleteProgram = (id) => {
        console.log("delete program", id);
        API.delete(`program/api/program/createfellows/` + id + "/").then((response) => {
            console.log("program delete", response.data);
            toast.success("Fellow Deleted Successfully");
            API.get(`program/api/program/fellows_by_programId/` + props.programId + "/").then((response) => {
                console.log("user detail", response.data);
                setFellowData(response.data);
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
        API.get(`program/api/program/fellows_by_programId/` + props.programId + `/?page=${query?.currentPage === 1 ? query?.currentPage : query?.currentPage
            }&page_size=${query?.perPage}${searchName ? `&name=${searchName}` : ''}${status ? `&status=${status}` : ''}`).then((response) => {
                console.log("user detail", response.data);
                setFellowData(response.data);
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
    return (
        <>
            <div className='row mb-3'>
                <div className='col-md-3'>
                    <label className='mb-1'>Search Name</label>
                    <input type="text" placeholder="Search Name" className="form-control" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
                </div>
                <div className='col-md-3'>
                    <label className='mb-1'>Status</label>
                    <select
                        onChange={(e) => setStatus(e.target.value)}
                        defaultValue={status}
                        value={status}
                        name="is_active"
                        className="form-select"
                    >
                        <option value="">All</option>
                        <option value='Enrolled'>Enrolled</option>
                        <option value='Withdrawn'>Withdrawn</option>
                    </select>
                </div>
                <div className='col-md-3'>
                    <div className='d-flex align-items-end h-100'>
                        <button className="btn btn-primary mr-1 btn-primary-background" onClick={() => onSearch()}>Go</button>
                    </div>
                    {/* <label className='mb-1'>Custom Label</label>
                    <select className='form-select'>
                        <option>Select Label</option>
                    </select> */}
                </div>

                <div className='col-md-3'>
                    <div className='d-flex justify-content-end align-items-end h-100'>
                        <Link to={"/addFellows/" + props.programId} className='btn btn-primary btn-primary-background'>Add Fellows</Link>
                    </div>
                </div>
            </div>
            <Table striped hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th className='text-center'>Phone Number</th>
                        <th className='text-center'>Assigned TA</th>
                        <th className='text-center'>Assigned CSC</th>
                        <th className='text-center'>Assigned Team</th>
                        <th className='text-center'>Status</th>
                        <th className='text-center'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {fellowData?.results && fellowData?.results.map((item, i) => (
                        <tr>
                            <td>{item?.identity?.first_name + " " + item?.identity?.last_name}</td>
                            <td>{item?.profile?.[0]?.alternate_email}</td>
                            <td className='text-center'>{item?.profile?.[0]?.alternate_contact}</td>
                            <td className='text-center'>{item?.userprogram?.assigned_ta}</td>
                            <td className='text-center'>{item?.userprogram?.assigned_cse}</td>
                            <td className='text-center'>{item?.userprogram?.assigned_teame}</td>
                            <td className='text-center'>{item?.userprogram?.status}</td>
                            <td className='text-center'>
                                <button className='tableDeleteBtn' onClick={() => deleteProgram(item?.userprogram?.id)}><MdDelete /></button>
                                {/* <Dropdown className='tableDropdown'>
                                <Dropdown.Toggle id="dropdown-basic">
                                    <BsThreeDotsVertical />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item><Link to="/viewFellows"><MdRemoveRedEye /> View</Link></Dropdown.Item>
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
            {fellowData?.results?.length === 0 && (
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
                    <Modal.Title><h5>Edit Student Info</h5></Modal.Title>
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
                    <div className='row mb-3'>
                        <div className='col-md-6'>
                            <div className="form-group">
                                <label className='mb-2'>Assigned TA</label>
                                <select className='form-select'>
                                    <option>Select Assigned TA</option>
                                    <option>DSD</option>
                                </select>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="form-group">
                                <label className='mb-2'>Assigned CSC</label>
                                <select className='form-select'>
                                    <option>Select Assigned CSC</option>
                                    <option>Parokl</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col-md-6'>
                            <div className="form-group">
                                <label className='mb-2'>Assigned Team</label>
                                <select className='form-select'>
                                    <option>Select Assigned Team</option>
                                    <option>25</option>
                                    <option>30</option>
                                </select>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="form-group">
                                <label className='mb-2'>Status</label>
                                <select className='form-select'>
                                    <option>Select Status</option>
                                    <option>Enrolled</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className="form-group">
                                <label className='mb-2'>Withdrawl Reason</label>
                                <select className='form-select'>
                                    <option>Select Withdrawl Reason</option>
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
