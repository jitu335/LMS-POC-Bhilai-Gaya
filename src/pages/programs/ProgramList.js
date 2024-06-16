import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import API from '../../services/api';
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import PaginationTabs from '../../components/Pagination';

//import Table from '../../components/Table';

export default function ProgramList() {
    const [programData, setProgramData] = useState();
    const [programCategory, setProgramCategory] = useState();
    const [status, setStatus] = useState("");
    const [searchName, setSearchName] = useState("");
    const [category, setCategory] = useState("");
    const [query, setQuery] = useState({
        totalPages: 0,
        currentPage: 1,
        pages: [],
        //sortBy: "createdDate,DESC",
        perPage: 5,
    });
    useEffect(() => {
        getProgramList();
    }, [query?.currentPage])

    const getProgramList = () => {
        API.get(`program/api/program/program/?page=${query?.currentPage === 1 ? query?.currentPage : query?.currentPage
            }&page_size=${query?.perPage}${searchName ? `&search=${searchName}` : ''}${status ? `&is_active=${status}` : ''}${category ? `&category_fk=${category}` : ''}`).then((response) => {
                console.log("program detail", response.data);
                setProgramData(response.data);
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
    }
    const onSearch = () => {
        API.get(`program/api/program/program/?page=${query?.currentPage === 1 ? query?.currentPage : query?.currentPage
            }&page_size=${query?.perPage}${searchName ? `&search=${searchName}` : ''}${status ? `&is_active=${status}` : ''}${category ? `&category_fk=${category}` : ''}`).then((response) => {
                console.log("program detail", response.data);
                setProgramData(response.data);
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
    useEffect(() => {
        API.get('program/api/program/master/programcategory/').then((response) => {
            console.log("programcategory", response.data);
            setProgramCategory(response.data);
        })
            .catch((err) => {
                console.log("err", err);
            });
    }, [])
    const paginate = (number) => {
        console.log("number", number);
        setQuery((q) => ({
            ...q,
            currentPage: number,
        }));
    };
    const deleteProgram = (id) => {
        console.log("delete program", id);
        API.delete(`program/api/program/detailprogram/` + id + "/").then((response) => {
            console.log("program delete", response.data);
            toast.success("Program Deleted Successfully");
            getProgramList();
        })
            .catch((err) => {
                console.log("err", err);
            });
    }
    return (
        <div className='p-3'>
            <h4 className='mb-3'>Program List</h4>
            <div className='row mb-3'>
                <div className='col-md-3'>
                    <label className='mb-1'>Search by Program Name</label>
                    <input type="text" placeholder="Search by Program Name" className="form-control" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
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
                        <option value={true}>Active</option>
                        <option value={false}>Inactive</option>
                    </select>
                </div>
                <div className='col-md-3'>
                    <label className='mb-1'>Category</label>
                    <select className='form-select'
                        name="category_pk"
                        value={category}
                        defaultValue={category}
                        onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Select Category</option>
                        {programCategory && programCategory.map((item, i) => (
                            <option value={item.id}>{item.category}</option>
                        ))}
                    </select>
                </div>

                <div className='col-md-3'>
                    <div className='d-flex justify-content-between align-items-end h-100'>
                        <button className="btn btn-primary mr-1 btn-primary-background" onClick={() => onSearch()}>Go</button>
                        <Link to="/addProgram" className='btn btn-primary btn-primary-background'>Add Program</Link>
                    </div>
                </div>
            </div>
            <div className="table-responsive">
                <Table striped hover>
                    <thead>
                        <tr>
                            {/* <th className='text-center'>S.No.</th> */}
                            <th>Program Name</th>
                            <th className='text-center'>Create Date</th>
                            <th className='text-center'>Program Category</th>
                            <th className='text-center'>Program Manager</th>
                            <th className='text-center'>Status</th>
                            <th className='text-center'>Start Date</th>
                            <th className='text-center'>End Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {programData?.results && programData?.results?.map((item, index) => (
                            <tr>
                                {/* <td className='text-center'>{index + 1}</td> */}
                                <td>{item.name}</td>
                                <td className='text-center'>{moment
                                    .utc(item.created)
                                    .utc()
                                    .local()
                                    .format("YYYY-MM-DD")}</td>
                                <td className='text-center'>{item?.category_fk?.category}</td>
                                <td className='text-center'>{item.manager}</td>
                                <td className='text-center'>{item.is_active ? 'Active' : 'In-Active'}</td>
                                <td className='text-center'>{item.start_date}</td>
                                <td className='text-center'>{item.end_date}</td>
                                <td>
                                    <Dropdown className='tableDropdown'>
                                        <Dropdown.Toggle id="dropdown-basic">
                                            <BsThreeDotsVertical />
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            {/* <Dropdown.Item><MdRemoveRedEye /> View</Dropdown.Item>
                                            <Dropdown.Divider /> */}
                                            <Dropdown.Item><Link to={"/editProgram/" + item?.id}><MdEdit /> View</Link></Dropdown.Item>
                                            <Dropdown.Divider />
                                            <Dropdown.Item onClick={() => deleteProgram(item?.id)}><MdDelete /> Delete</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {/* <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div> */}
                {programData?.results?.length === 0 && (
                    <h5 className="text-center p-3">No Data Found</h5>
                )}
            </div>
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
        </div>
    )
}
