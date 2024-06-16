import React, { useState, useEffect } from 'react';
import logo from '../c1logo_color.webp';
import logo1 from '../logo.svg'
import Dropbox from './Dropbox';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import API from "../services/api";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";

export default function LogoModal({ image, setImage, show, handleClose }) {


    const [files, setFiles] = useState([])
    const [images, setImages] = useState([])
    const [acceptedFormat, setAcceptedFormat] = useState({})

    useEffect(() => {
        setAcceptedFormat({
            'image/*': ['.jpeg', '.jpg', '.png']
        })
    }, []);

    const handleCancel = () => {
        setImages(null);
        handleClose();
    }

    // let images = files.map((file) => (
    //     <img src={file.preview} alt="preview" className="allLogos" key={file.name} onClick={(e) => imageClick(file.preview, e)} />
    // ))
    // setImages(files.map((file) => (
    //     <img src={file.preview} alt="preview" className="allLogos" key={file.name} onClick={(e) => imageClick(file.preview, e)} />
    // )))

    useEffect(() => {
        setImages(files.map((file) => (
            <img src={file.preview} alt="preview" className="allLogos" key={file.name} />
        )))
    }, [files]);

    // let images = files.map((file) => (
    //   <div key={file.name}>
    //     <div>
    //       <img src={file.preview} style={{ width: "80px", padding: "6px" }} alt="preview" />
    //     </div>
    //   </div>
    // ))


    // useEffect(() => {
    //   // Make sure to revoke the data uris to avoid memory leaks
    //   files.forEach(file => URL.revokeObjectURL(file.preview));
    // }, [files]);

    const handleUpload = () => {

        console.log("file name", files[0]);
        let file = files[0];
        if (file) {
            if (file.type != 'image/png' && file.type != 'image/jpeg') {
                toast.error("File does not support. You must use .png or .jpg ");
                return false;
            }
            if (file.size > 10e6) {
                toast.error("Please upload a file smaller than 10 MB");
                return false;
            }
            const formData = new FormData();
            formData.append("image_url", file);
            API.post('admission/api/admission/media/upload/', formData).then((response) => {
                if (response.status === 201) {
                    console.log("response data", response.data);
                    setImage(response?.data?.image_url)
                    handleClose();
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
    }

    return (
        <Modal show={show} onHide={handleCancel} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>Select Logo</Modal.Title>
            </Modal.Header>
            <Modal.Body className="mx-3 p-2">
                {/* <Dropbox image={image} setImage={setImage} acceptedFormat={acceptedFormat} /> */}
                {/* <LogoModal image={image} setImage={setImage} /> */}
                <div>
                    {images &&
                        <div className="d-flex justify-content-center">
                            {/* <img src={logo} alt="logo" className='allLogos' key="logo" onClick={() => imageClick('logo')} />
                <img src={logo1} alt="logo" className='allLogos' key="logo1" onClick={(e) => imageClick('logo1', e)} />
                {images} */}
                            {/* <ToggleButtonGroup type="radio" name="group" >
                    <ToggleButton variant="transparent" className="btn-outline-secondary" value="logo" id="1" ><img src={logo} alt="logo" className='allLogos' key="logo" /></ToggleButton>
                    <ToggleButton variant="transparent" value="logo1" id="2" ><img src={logo1} alt="logo" className='allLogos' key="logo1" /></ToggleButton>
                    {images}
                </ToggleButtonGroup> */}
                            {images}
                        </div>
                    }

                    {!images && image &&
                        <div className="d-flex justify-content-center">
                            <img src={image} className="allLogos" alt="" />
                        </div>
                    }
                    <Dropbox files={files} setFiles={setFiles} acceptedFormat={acceptedFormat} />

                    <ToastContainer />
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>CANCEL</Button>
                    
                <Button variant="primary" className='btn-primary-background' onClick={handleUpload}>SAVE</Button>
             </Modal.Footer>
        </Modal>

    )
}
