import clsx from "clsx";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ProfileImageProps {
    fieldName: string;
    label: string;
    onImageSelect: (file: File) => void; // Add this prop
}

export const ImageInput: React.FC<ProfileImageProps> = ({ fieldName, label, onImageSelect }) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            if (acceptedFiles.length > 0) {
                const file = acceptedFiles[0];
                onImageSelect(file); // Pass the selected file to the parent component
                setPreviewUrl(URL.createObjectURL(file));
            }
        },
        [onImageSelect]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/*': ['.jpeg', '.png', '.gif'],
        },
        onDrop,
    });

    return (
        <div className="input-group w-100 h-65px" {...getRootProps()}>
            {previewUrl ? (
                <label className="input-group-text p-2" htmlFor="inputGroupSelect02">
                    <img src={previewUrl} alt="Preview" className="rounded-full h-50px w-auto object-cover" />
                </label>

            ) : (
                <label className="input-group-text p-2" htmlFor="inputGroupSelect02">
                    <img src='/media/avatars/blank.png' alt="Preview" className="rounded-full h-50px w-auto object-cover" />
                </label>
            )}
            <input {...getInputProps()} id={fieldName} className="d-none" />
            <button className="btn btn-light-primary border" type="button" id="button-addon2">انتخاب تصویر</button>
        </div>

        // <div className="flex flex-col items-center">
        //     <div
        //         {...getRootProps()}
        //         className={clsx(
        //             'w-20 h-20 rounded-full flex items-center justify-center mb-2 cursor-pointer',
        //             'border-2 border-dashed border-gray-300',
        //             isDragActive ? 'bg-gray-100 border-blue-500' : 'bg-gray-200 hover:bg-gray-100',
        //             'transition-colors duration-200'
        //         )}
        //     >
        //         <input {...getInputProps()} id={fieldName} />
        //         {previewUrl ? (
        //             <img src={previewUrl} alt="Preview" className="rounded-full w-full h-full object-cover" />
        //         ) : (
        //             <span className="text-gray-500">Image</span>
        //         )}
        //     </div>
        //     <label htmlFor={fieldName} className="text-sm text-gray-600 cursor-pointer">
        //         {label}
        //     </label>
        //     {/* Hidden input for file selection would go here */}
        //     {/* <input type="file" id={fieldName} className="hidden" /> */}
        // </div>
    );
};
