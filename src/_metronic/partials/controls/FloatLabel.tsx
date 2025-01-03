import * as React from 'react';
import { Dropdown, FloatingLabel, FormGroupProps } from 'react-bootstrap';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from 'react-bootstrap/esm/helpers';

interface FloatingLabelProps extends FormGroupProps, BsPrefixProps {
    controlId?: string;
    label: React.ReactNode;
}

export const FloatLabel: BsPrefixRefForwardingComponent<'div', FloatingLabelProps> = ({ children, ...props }: any) => {

    const CustomToggle = React.forwardRef(({ children, onClick }: { children: any, onClick: Function }, ref: any) => (
        <a
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
        >
            <button type="button" className="btn btn-sm btn-icon btn-color-gray-500 btn-active-light-info p-0 h-20px" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                <i className="fas fa-ellipsis"></i>
            </button>
        </a>
    ));

    return (
        <FloatingLabel
            {...props}
            className='position-relative'
        >
            {children}
            <Dropdown style={{ position: 'absolute', top: '4px', left: '4px' }}>
                <Dropdown.Toggle as={CustomToggle} />
                <Dropdown.Menu align={'end'} className="min-w-150px">
                    <Dropdown.Item eventKey="1"><i className='fas fa-hexagon-exclamation text-danger fs-3 me-2'></i>ثبت خطا</Dropdown.Item>
                    <Dropdown.Item eventKey="2"><i className='fas fa-bell text-info fs-3 me-2'></i>ثبت یادآوری</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </FloatingLabel>
    );
}