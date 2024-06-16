import React from 'react';
import { Link } from 'react-router-dom';

export default function ViewFellows() {
    return (
        <div className='p-4'>
            <h4>View Fellows</h4>
            <div className='row mb-3'>
                <div className='col-md-4'>
                    <label className='mb-2'>Name <span className="required">*</span></label>
                    <p><b>John</b></p>
                </div>
                <div className='col-md-4'>
                    <label className='mb-2'>Email <span className="required">*</span></label>
                    <p><b>j.dd@co.com</b></p>
                </div>
                <div className='col-md-4'>
                    <label className='mb-2'>Phone Number</label>
                    <p><b>9875643212</b></p>
                </div>
            </div>
            <div className='row mb-3'>
                <div className='col-md-4'>
                    <label className='mb-2'>Assigned TA</label>
                    <p><b>Liz Erd, John D</b></p>
                </div>
                <div className='col-md-4'>
                    <label className='mb-2'>Assigned CSC</label>
                    <p><b>Liz Erd</b></p>
                </div>
                <div className='col-md-4'>
                    <label className='mb-2'>Assigned Team</label>
                    <p><b>DEESDFD</b></p>
                </div>
            </div>
            <div className='row mb-3'>
                <div className='col-md-4'>
                    <label className='mb-2'>Status</label>
                    <p><b>Enrolled</b></p>
                </div>
                <div className='col-md-4'>
                    <label className='mb-2'>Withdrawl Reason</label>
                    <p><b>N/A</b></p>
                </div>
            </div>
            <div className="my-3">
                <Link to="/editProgram?tab=fellows" className="btn btn-secondary mr-2">
                    CANCEL
                </Link>
            </div>
        </div>
    )
}
