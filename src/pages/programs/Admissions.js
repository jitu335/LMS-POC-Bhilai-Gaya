import React, { useState, useEffect, useRef } from 'react'
import Admission from './Admission'
import AddAdmission from './AddAdmission';

export default function Admissions({ programId, viewAdmissionStep, setViewAdmissionStep }) {

    return (
        <div className="start">
            {viewAdmissionStep && <Admission programId={programId} setViewAdmissionStep={setViewAdmissionStep} />}
            {!viewAdmissionStep && <AddAdmission programId={programId} setViewAdmissionStep={setViewAdmissionStep} />}
        </div>
    );

}
