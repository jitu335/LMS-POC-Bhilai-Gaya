import React from 'react';
import { useEffect } from 'react';
import { useDropzone } from "react-dropzone";


export default function Dropbox({ files, setFiles, acceptedFormat }) {

    useEffect(() => {
        setFiles([]);
    }, []);

    const { getRootProps, getInputProps, acceptedFiles, open } = useDropzone({
        accept: {
            ...acceptedFormat
        },
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            )
        },
        noClick: true,
        noKeyboard: true,
    })

    return (
        <div>
            {files[0] &&
                <div className="text-center mb-2 text-danger">{files[0].name}</div>
            }

            <div className="dropzone">
                <div {...getRootProps()} className="mt-2">
                    <input {...getInputProps()} />

                    <p>Drag & Drop files here</p>
                    <p>Or</p>

                    <button type="button" className="btn" onClick={open}>BROWSE</button>
              </div>
            </div>
        </div>
    ) }
