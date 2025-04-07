import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

// Define the type for the file with preview
interface FileWithPreview extends File {
  preview?: string;
}

const FileUploadDropzone: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<FileWithPreview | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]; // Only take the first file for this example
      const fileType = file.type;
      let preview: string | undefined;

      if (fileType === 'application/pdf') {
        preview = '/media/svg/files/pdf.svg'; // Use a PDF icon (replace with your own)
      } else if (fileType.startsWith('image/')) {
        preview = URL.createObjectURL(file);
      }

      setUploadedFile(Object.assign(file, { preview }));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg', '.gif'],
      'application/pdf': ['.pdf'],
    },
    multiple: false, // Allow only one file for this example
  });

  // Clean up memory when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (uploadedFile?.preview && uploadedFile.type.startsWith('image/')) {
        URL.revokeObjectURL(uploadedFile.preview);
      }
    };
  }, [uploadedFile]);

  const removeFile = () => {
    if (uploadedFile?.preview && uploadedFile.type.startsWith('image/')) {
      URL.revokeObjectURL(uploadedFile.preview);
    }
    setUploadedFile(null);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' بایت';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' کیلوبایت';
    else return (bytes / (1024 * 1024)).toFixed(1) + ' مگابایت';
  };

  return (
    <div className="file-upload-container">
      {!uploadedFile ? (
        // Unselected Mode (CreateMedicalDocument)
        <div className="card card-dashed notice d-flex bg-light-primary border-primary h-md-150px p-6">
          <div className="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap">
            <div className="mb-3 mb-md-0 fw-semibold">
              <h4 className="text-gray-900 fw-bold">نکته مهم!</h4>
              <h6 className="text-gray-700 fw-bold mb-5">اطلاعات خواسته شده در فرم را با دقت وارد کنید.</h6>
              <div className="fs-6 text-gray-700 pe-7">
                مدارک پزشکی را با دقت اسکن و بعد از کاهش حجم در این بخش آپلود کنید.
              </div>
            </div>
            <div
              {...getRootProps()}
              className={`btn btn-primary px-6 align-self-center text-nowrap ${isDragActive ? 'active' : ''}`}
            >
              <input {...getInputProps()} />
              افزودن مدرک پزشکی
            </div>
          </div>
        </div>
      ) : (
        // Selected Mode (ViewMedicalDocument)
        <div className="card card-dashed h-xl-100 flex-row flex-stack flex-wrap p-6 bg-light-secondary">
          <div className="d-flex flex-column py-2">
            <div className="d-flex align-items-center fs-4 fw-bold mb-5">
              {uploadedFile.name}
              <span className="badge badge-light-primary fs-7 ms-2">اسکن</span>
            </div>
            <div className="d-flex align-items-center">
              <img
                src={uploadedFile.preview || '/media/svg/card-logos/visa.svg'} // Fallback to a default icon
                alt=""
                className="me-4 h-50px w-auto"
              />
              <div>
                <div className="fs-5 fw-bold text-gray-800">
                  تاریخ ثبت: سه شنبه{' '}
                  <span className="dir-ltr d-inline-block">1403/11/12 - 15:35</span>
                </div>
                <div className="fs-6 fw-semibold text-gray-500">
                  حجم فایل: {formatFileSize(uploadedFile.size)}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center py-2 flex-column flex-sm-row">
            <button
              title="ویرایش"
              type="button"
              className="btn btn-sm btn-light btn-active-light-primary"
              onClick={() => setUploadedFile(null)} // Simulate edit by resetting the file
            >
              <i className="fas fa-edit p-0"></i>
            </button>
            <button
              title="حذف"
              type="button"
              className="btn btn-sm btn-light btn-active-light-danger"
              onClick={removeFile}
            >
              <span className="indicator-label">
                <i className="fas fa-trash-alt p-0"></i>
              </span>
            </button>
            <button
              title="دانلود"
              type="button"
              className="btn btn-sm btn-light btn-active-light-primary"
              onClick={() => {
                const url = URL.createObjectURL(uploadedFile);
                const link = document.createElement('a');
                link.href = url;
                link.download = uploadedFile.name;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
              }}
            >
              <i className="fas fa-download p-0"></i>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default FileUploadDropzone;