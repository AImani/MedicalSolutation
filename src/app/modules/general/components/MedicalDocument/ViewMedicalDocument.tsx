export const ViewMedicalDocument = () => {
    return (
        <div className="card card-dashed h-xl-100 flex-row flex-stack flex-wrap p-6 bg-light-secondary">
            <div className="d-flex flex-column py-2">
                <div className="d-flex align-items-center fs-4 fw-bold mb-5">
                    آزمایش دندان
                    <span className="badge badge-light-primary fs-7 ms-2">اسکن</span>
                </div>
                <div className="d-flex align-items-center">
                    <img src="/media/svg/card-logos/visa.svg" alt="" className="me-4" />
                        <div>
                            <div className="fs-5 fw-bold text-gray-800">تاریخ ثبت: سه شنبه <span className="dir-ltr d-inline-block">1403/11/12 - 15:35</span></div>
                            <div className="fs-6 fw-semibold text-gray-500">حجم فایل: 0.5 مگابایت</div>
                        </div>
                </div>
            </div>
            <div className="d-flex align-items-center py-2 flex-column flex-sm-row">
                <button title="ویرایش" type="button" className="btn btn-sm btn-light btn-active-light-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_new_card"><i className="fas fa-edit p-0"></i></button>
                <button title="حذف" type="button" className="btn btn-sm btn-light btn-active-light-danger" data-kt-billing-action="card-delete">
                    <span className="indicator-label"><i className="fas fa-trash-alt p-0"></i></span>
                    <span className="indicator-progress">
                        Please wait...    <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                </button>
                <button title="دانلود" type="button" className="btn btn-sm btn-light btn-active-light-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_new_card"><i className="fas fa-download p-0"></i></button>
            </div>
        </div>
    )
}