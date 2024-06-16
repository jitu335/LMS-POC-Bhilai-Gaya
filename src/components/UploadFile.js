import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import API from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import Dropbox from './Dropbox';

export default function UploadFile({ show, handleClose, setFileUrl }) {

    const [files, setFiles] = useState([]);
    const [acceptedFormat, setAcceptedFormat] = useState({
        "application/pdf": [".pdf"],
        "text/csv": [".csv"],
        "application/msword": [".doc"],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    });

    const handleUpload = () => {
        let file = files[0];
        if (file) {
            // if (file.type != 'application/pdf' && file.type != 'application/doc') {
            //   toast.error("File does not support. You must use .pdf ");
            //   return false;
            // }
            
            if (file.size > 10e6) {
                toast.error("Please upload a file smaller than 10 MB");
                return false;
            }
            const formData = new FormData();
            formData.append("file_url", file);

            API.post('admission/api/admission/media/upload/', formData).then((response) => {
                if (response.status === 201) {
                    console.log("response data", response.data);
                    setFileUrl(response?.data?.file_url);
                } else {
                    console.log("response", response)
                    toast.error(response.error_description);
                }
            })
                .catch((err) => {
                    console.log("err", err);
                    toast.error(err.response.data.error_description);
                })
        }
        handleClose();
    }

    // useEffect(() => {
    //     setAcceptedFormat({
    //         "application/pdf": [".pdf"],
    //         "text/csv": [".csv"],
    //         "application/msword": [".doc"],
    //         "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    //     });
    // }, []);

    return (
        <div className='centerModal'>
            <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered> 
                
                
                <Modal.Header closeButton>
                    <Modal.Title>Select File</Modal.Title>
                </Modal.Header>

                <Modal.Body className="mx-3 p-2">
                    <Dropbox files={files} setFiles={setFiles} acceptedFormat={acceptedFormat}/>  
                        
                    </Modal.Body>
                <Modal.Footer>

        <Button variant="secondary" onClick={handleClose}>CANCEL</Button>
                        
     <Button variant="primary" className="btn-primary-background" type="submit" onClick={handleUpload}>SAVE</Button>
                        
            </Modal.Footer>
            </Modal>
            <ToastContainer />
        </div>
    )
}
