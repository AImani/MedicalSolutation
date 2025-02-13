import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

export type ProfileImageProps = {
     label: string,
     fieldName: string
}

export const ProfileImage = ({label, fieldName}: ProfileImageProps) => {
    const { setValue, watch, formState } = useFormContext()
    const [previewUrl, setPreviewUrl] = useState('');

    const { getInputProps, open } = useDropzone({
        accept: { 'images': ['.jpg', '.jpeg'] },
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            setValue(fieldName, file);
            setPreviewUrl(URL.createObjectURL(file)); // Create preview URL
        },
    });

    return (
        <>
            <label className='d-block'>{label}</label>
            <input {...getInputProps()} />

            {/* Image preview */}
            {previewUrl ? (
                // <div className="mt-3">
                //     <img src={previewUrl} alt="Image preview" style={{ maxWidth: '200px' }} />
                // </div>
                <div className="me-0 mb-4">
                    <div className="symbol symbol-100px symbol-lg-180px symbol-md-200px symbol-fixed position-relative border border-gray-300">
                        <img src={previewUrl} alt="image" />
                        <div className='position-absolute text-center ' style={{ bottom: '-1rem', width: '100%' }} >
                            <button type="button" className="btn btn-light-danger py-2 px-3 w-35px h-35px rounded-circle" onClick={() => {
                                setPreviewUrl('');
                                setValue(fieldName, undefined);
                            }}>
                                <i className='fas fa-remove p-0'></i>
                            </button>
                            <button type="button" className="btn btn-light-primary py-2 px-3 w-35px h-35px rounded-circle" onClick={open}>
                                <i className='fas fa-search p-0'></i>
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="me-0 mb-4 symbol symbol-100px symbol-lg-180px symbol-md-200px symbol-fixed position-relative border border-gray-300 cursor-pointer" onClick={open}>
                        <img src="/media/avatars/blank.png" />
                        <div className='position-absolute text-center ' style={{ bottom: '-1rem', width: '100%' }}>
                            <button type="button" className="btn btn-light-primary py-2 px-3 w-35px h-35px rounded-circle" >
                                <i className='fas fa-search p-0'></i>
                            </button>
                        </div>
                    </div>
                    {formState.errors[fieldName] && <p className="text-danger">{formState.errors[fieldName].message?.toString()}</p>}
                </>
            )}
        </>
    );
}