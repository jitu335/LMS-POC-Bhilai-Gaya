import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function DeleteModal({ showModal, hideModal, confirmModal, id, type }) {

    return (
        <Modal show={showModal} onHide={hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            
            <Modal.Body><div className="alert alert-danger">Are you sure you want to delete?</div></Modal.Body>

            <Modal.Footer> 
                <Button variant="default" onClick={hideModal}>No</Button>
                    
             <Button variant="danger" onClick={() => confirmModal(id)}>Yes</Button>  
                    
                

            </Modal.Footer>
        </Modal>
    )
}
