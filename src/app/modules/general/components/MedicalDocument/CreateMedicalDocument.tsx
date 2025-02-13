export const CreateMedicalDocument = () => {
    return (
        <div className="card card-dashed notice d-flex bg-light-primary border-primary h-md-150px p-6">
            <div className="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap">
                <div className="mb-3 mb-md-0 fw-semibold">
                    <h4 className="text-gray-900 fw-bold">نکته مهم!</h4>
                    <h6 className="text-gray-700 fw-bold mb-5">اطلاعات خواسته شده در فرم را با دقت وارد کنید.</h6>

                    <div className="fs-6 text-gray-700 pe-7">مدارک پزشکی را با دقت اسکن و بعد از کاهش حجم در این بخش آپلود کنید.</div>
                </div>
                <a href="#" className="btn btn-primary px-6 align-self-center text-nowrap" data-bs-toggle="modal" data-bs-target="#kt_modal_new_card">
                    افزودن مدرک پزشکی            </a>
            </div>
        </div>
    )
}