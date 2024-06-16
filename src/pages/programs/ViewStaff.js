import React from 'react';
import { Link } from 'react-router-dom';

export default function ViewStaff() {
  return (
    <div className='p-4'>
      <h4>View Staff</h4>
        <div className='row mb-3'>
          <div className='col-md-4'>
            <label className='mb-2'>Name <span className="required">*</span></label>
            <p><b>John</b></p>
          </div>
          <div className='col-md-4'>
            <label className='mb-2'>Correlation One Email <span className="required">*</span></label>
            <p><b>j.dd@co.com</b></p>
          </div>
          <div className='col-md-4'>
            <label className='mb-2'>Personal Email</label>
            <p><b>j.dd@co.com</b></p>
          </div>
        </div>
        <div className='row mb-3'>
          <div className='col-md-4'>
            <label className='mb-2'>Phone Number</label>
            <p><b>9875643212</b></p>
          </div>
          <div className='col-md-4'>
            <label className='mb-2'>Staff Type</label>
            <p><b>CSC</b></p>
          </div>
          <div className='col-md-4'>
            <label className='mb-2'>City/Town</label>
            <p><b>Atlanta</b></p>
          </div>
        </div>
        <div className='row mb-3'>
          <div className='col-md-4'>
            <label className='mb-2'>State/Region</label>
            <p><b>GA</b></p>
          </div>
          <div className='col-md-4'>
            <label className='mb-2'>Country</label>
            <p><b>USA</b></p>
          </div>
        </div>
        <div className="my-3">
          <Link to="/editProgram?tab=staff" className="btn btn-secondary mr-2">
            CANCEL
          </Link>
        </div>
    </div>
  )
}
