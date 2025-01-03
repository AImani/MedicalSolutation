import React from "react";

export const DropDownCustomToggle = React.forwardRef(({ children, name, onClick }: { name: string, children: any, onClick: Function }, ref: any) => (
    <button
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
        type="button" name={name} className="btn btn-sm btn-icon btn-color-primary btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
        <i className="fas fa-ellipsis"></i>
    </button>
));