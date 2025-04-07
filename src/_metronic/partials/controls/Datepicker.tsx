import { Controller, useFormContext } from 'react-hook-form';
import './styles/DatePickerField.css';
import { EnToFaObjDate } from '@/_metronic/helpers';
import DatePicker from "react-multi-date-picker";
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import persian from 'react-date-object/calendars/persian';
import fa from 'react-date-object/locales/persian_fa';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import moment from 'jalali-moment'
import { FloatLabel } from './';

export const DatePickerField: React.FC<any> = (
  { ltr = false, clean = false, hasTime = false, ref, value, size = 'md', ...props }: any,
  rules = {},
  errors = []
) => {
  const { setValue, getFieldState } = useFormContext();
  const [controlSize, setControlSize] = useState<string>('form-control');
  const [format, setFormat] = useState<string>(hasTime ? 'YYYY/MM/DD HH:mm' : 'YYYY/MM/DD');
  useEffect(() => { setFormat(hasTime ? 'YYYY/MM/DD HH:mm' : 'YYYY/MM/DD') }, [hasTime])
  useEffect(() => {
    if (!(size === 'md')) {
      const suffix = size ? `form-control-${size}` : ''
      setControlSize(clsx('form-control', suffix))
    }
  }, [size]);


  function CustomInput({ onFocus, value, onChange }: any) {
    return (
      <input
        onFocus={onFocus}
        value={value}
        onChange={onChange}
        className='border-0 p-0 m-0 fs-6 w-100 ltr'
      />
    )
  }

  return (
    <Controller
      name={props.name}
      render={({ field }: any) => {
        return (
          <>
            {props.floatingLabel ? (
              <FloatLabel
                controlId={props.name}
                label={props.label}
                className="mb-3"
              >
                <>
                  <DatePicker
                    calendar={persian}
                    locale={fa}
                    value={(field.value && moment.from(field.value?.toString(), 'en', format).locale('fa').format(format)) || ""}
                    digits={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                    onChange={(date) => {
                      field.onChange(date?.toString())
                      !!date?.toString() && setValue(props.name, moment.from(date?.toString(), 'fa', format).locale('en').format(format))
                      !!props.handleOnChange && props.handleOnChange(date?.isValid ? date : "");
                    }}
                    format={format}
                    render={<CustomInput />}
                    containerClassName={clsx('form-control', getFieldState(props.name).invalid ? 'is-invalid' : '')}
                    {...(hasTime
                      && {
                      plugins: [<TimePicker position="bottom" hideSeconds />]
                    })}
                  />
                  {getFieldState(props.name).invalid && (
                    <div className='invalid-feedback'>
                      {getFieldState(props.name)?.error?.message?.toString()}
                    </div>
                  )}
                </>
              </FloatLabel>
            ) : (
              <>
                {(!props.floatingLabel && props.label) && <label htmlFor={props.name}>{props.label}</label>}
                <DatePicker
                  calendar={persian}
                  locale={fa}
                  digits={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                  value={(field.value && moment.from(field.value?.toString(), 'en').locale('fa').format(format)) || ""}
                  onChange={(date) => {
                    !!date?.toString() && field.onChange(moment.from(date?.toString(), 'fa', format).locale('en').format(format))
                    !!date?.toString() && setValue(props.name, moment.from(date?.toString(), 'fa', format).locale('en').format(format))
                    !!props.handleOnChange && props.handleOnChange(date?.isValid ? date : "");
                  }}
                  format={"YYYY/MM/DD"}
                  render={<CustomInput />}
                  containerClassName={clsx('form-control', getFieldState(props.name).invalid ? 'is-invalid' : '')}
                  {...(hasTime
                    && {
                    plugins: [<TimePicker position="bottom" hideSeconds />]
                  })}
                />
                {getFieldState(props.name).invalid && (
                  <div className='invalid-feedback'>
                    {getFieldState(props.name)?.error?.message?.toString()}
                  </div>
                )}
              </>
            )}
          </>
        )
      }}
    />
  );
};
