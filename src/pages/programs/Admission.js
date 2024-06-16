import React from 'react'
import Button from "react-bootstrap/Button";
import AdmissionStep from './AdmissionStep';

export default function Admission({ programId, viewAdmissionStep, setViewAdmissionStep }) {

    const addAdmissionStep = () => {
        setViewAdmissionStep(false)
    }
    return (
        <>
            <div className='d-flex justify-content-between'>
                <h4>Admissions Set Up</h4>
                <Button variant="primary" type="submit" className="mx-2 btn-primary-background" onClick={addAdmissionStep}>
                    + ADD ADMISSION STEP
                </Button>
            </div>
            <AdmissionStep programId={programId} />
        </>
    )
}

