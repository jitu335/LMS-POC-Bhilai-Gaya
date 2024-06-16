import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
// import Tab from 'react-bootstrap/Tab';
// import Tabs from 'react-bootstrap/Tabs';
import ProgramSummary from './ProgramSummary';
import Staff from './StaffList';
import Fellows from './FellowsList';
import Admissions from './Admissions';
import API from '../../services/api';

export default function EditProgram(props) {
    let location = useLocation();
    let params = useParams();
    console.log("params", params?.id);
    const urlParams = new URLSearchParams(location.search);
    const paramtab = urlParams.get("tab");
    const [programData, setProgramData] = useState();
    const [viewProgramSummary, setViewProgramSummary] = useState(true);
    const [viewAdmissionStep, setViewAdmissionStep] = useState(true);
    const [currentTab, setCurrentTab] = useState(
        paramtab == "programSummary"
            ? "programSummary"
            : paramtab == "admissions"
                ? "admissions"
                : paramtab == "staff"
                    ? "staff"
                    : paramtab == "fellows"
                        ? "fellows"
                        : "programSummary"
    );
    useEffect(() => {
        API.get(`program/api/program/program/` + params?.id + "/").then((response) => {
            console.log("user detail", response.data);
            setProgramData(response.data);
        })
            .catch((err) => {
                console.log("err", err);
            });
    }, [])
    return (
        <div className='p-3'>
            <h5 className='mb-3'>{programData?.name}</h5>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li
                    className="nav-item"
                    onClick={() => { setCurrentTab("programSummary"); setViewProgramSummary(true) }}
                >
                    <a
                        className={`nav-link ${currentTab == "programSummary" ? "active" : ""
                            }`}
                        id="programSummary-tab"
                        data-toggle="tab"
                        href="#programSummary"
                        role="tab"
                        aria-controls="programSummary"
                        aria-selected="true"
                    >
                        Program Summary
                    </a>
                </li>
                <li
                    className="nav-item"
                    onClick={() => { setCurrentTab("admissions"); setViewAdmissionStep(true) }}
                >
                    <a
                        className={`nav-link ${currentTab == "admissions" ? "active" : ""
                            }`}
                        id="admissions-tab"
                        data-toggle="tab"
                        href="#admissions"
                        role="tab"
                        aria-controls="admissions"
                        aria-selected="false"
                    >
                        Admissions
                    </a>
                </li>

                <li
                    className="nav-item"
                    onClick={() => setCurrentTab("staff")}
                >
                    <a
                        className={`nav-link ${currentTab == "staff" ? "active" : ""
                            }`}
                        id="staff-tab"
                        data-toggle="tab"
                        href="#staff"
                        role="tab"
                        aria-controls="staff"
                        aria-selected="false"
                    >
                        Staff
                    </a>
                </li>
                <li
                    className="nav-item"
                    onClick={() => setCurrentTab("fellows")}
                >
                    <a
                        className={`nav-link ${currentTab == "fellows" ? "active" : ""
                            }`}
                        id="fellows-tab"
                        data-toggle="tab"
                        href="#fellows"
                        role="tab"
                        aria-controls="fellows"
                        aria-selected="false"
                    >
                        Fellows
                    </a>
                </li>
            </ul>
            <div
                className="d-block tab-content pt-2"
                id="myTabContent"
            >
                <div
                    className={`tab-pane fade ${currentTab == "programSummary" ? "active show" : ""
                        }`}
                    id="programSummary"
                    role="tabpanel"
                    aria-labelledby="programSummary-tab"
                >
                    <ProgramSummary programId={params?.id} viewProgramSummary={viewProgramSummary} setViewProgramSummary={setViewProgramSummary} />
                </div>
                <div
                    className={`tab-pane fade ${currentTab == "admissions" ? "active show" : ""
                        }`}
                    id="admissions"
                    role="tabpanel"
                    aria-labelledby="admissions-tab"
                >
                    <Admissions programId={params?.id} viewAdmissionStep={viewAdmissionStep} setViewAdmissionStep={setViewAdmissionStep} />
                </div>
                <div
                    className={`tab-pane fade ${currentTab == "staff" ? "active show" : ""
                        }`}
                    id="staff"
                    role="tabpanel"
                    aria-labelledby="staff-tab"
                >
                    <Staff programId={params?.id} />
                </div>
                <div
                    className={`tab-pane fade ${currentTab == "fellows" ? "active show" : ""
                        }`}
                    id="fellows"
                    role="tabpanel"
                    aria-labelledby="fellows-tab"
                >
                    <Fellows programId={params?.id} />
                </div>
            </div>
            {/* <Tabs
                defaultActiveKey="programSummary"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="programSummary" title="Program Summary">
                    <ProgramSummary />
                </Tab>
                <Tab eventKey="admissions" title="Admissions">
                    <h2>Admissions</h2>
                </Tab>
                <Tab eventKey="staff" title="Staff">
                    <Staff />
                </Tab>
                <Tab eventKey="fellows" title="Fellows">
                    <h2>Fellows</h2>
                </Tab>
            </Tabs> */}
        </div>
    )
}
