import { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import '../controls/styles/lbl.css';
import { numberWithCommas } from '@/app/modules/general/helpers';
import clsx from 'clsx';
import { FloatLabel } from './';

export const InputField: React.FC<any> = (
  { feedbackStyle = {}, ltr = false, formatnumber = false, size = 'md', noMessage = false, ...props }: any,
  rules = {},
  errors = []
) => {
  const { register, getValues, formState, getFieldState } = useFormContext();
  const [amountValue, setAmountValue] = useState<string>('');
  const [controlSize, setControlSize] = useState<string>('form-control');
  useEffect(() => {
    if (!(size === 'md')) {
      const suffix = size ? `form-control-${size}` : ''
      setControlSize(clsx('form-control', suffix))
    }
  }, [size]);
  function itpro(Number: any) {
    Number += '';
    Number = Number.replace(',', '');
    Number = Number.replace(',', '');
    Number = Number.replace(',', '');
    Number = Number.replace(',', '');
    Number = Number.replace(',', '');
    Number = Number.replace(',', '');
    let x = Number.split('.');
    let y = x[0];
    let z = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(y)) y = y.replace(rgx, '$1' + ',' + '$2');
    return y + z;
  }

  const getError = () => {
    let parts = props.name.split('.');

    if (parts.length == 1) {
      return formState.errors[props.name];
    } else return null;
  };



  return (
    <>
      {props.floatingLabel ? (
        <FloatLabel
          controlId={props.name}
          label={props.label}
          className="mb-3"
        >
          <>
            <Controller
              name={props.name}
              render={({ field }) => {
                return (
                  <input
                    {...props}
                    type={props.type}
                    placeholder={props.placeholder}
                    {...register(props.name)}
                    {...(formatnumber && { value: numberWithCommas(amountValue) })}
                    {...(!formatnumber && getValues(props.name)
                      ? { value: getValues(props.name) }
                      : null)}
                    autoComplete='off'
                    className={[controlSize, getFieldState(props.name).invalid && 'is-invalid', ltr && 'dir-ltr'].join(' ')}
                    onChange={(val) => {
                      if (props.type == 'file') {
                        props.onHandleChange && props.onHandleChange(val.target.files);
                      } else if (formatnumber) {
                        setAmountValue(val.target.value);
                        field.onChange(val.target.value);
                        props.onChange && props.onChange(val.target.value);
                      } else {
                        field.onChange(val.target.value);
                        props.onChange && props.onChange(val.target.value);
                      }
                    }}
                  />
                );
              }}
            />

            {getFieldState(props.name).invalid && (
              <div className='invalid-feedback' style={feedbackStyle}>
                {getFieldState(props.name)?.error?.message?.toString()}
              </div>
            )}
          </>
        </FloatLabel>
      ) : (
        <>
          {(!props.floatingLabel && props.label) && <label htmlFor={props.name}>{props.label}</label>}
          <Controller
            name={props.name}
            render={({ field }) => {
              return (
                <input
                  {...props}
                  type={props.type}
                  placeholder={props.placeholder}
                  {...register(props.name)}
                  {...(formatnumber && { value: numberWithCommas(amountValue) })}
                  {...(!formatnumber && getValues(props.name)
                    ? { value: getValues(props.name) }
                    : null)}
                  autoComplete='off'
                  className={[controlSize, getFieldState(props.name).invalid && 'is-invalid', ltr && 'dir-ltr'].join(' ')}
                  onChange={(val) => {
                    if (props.type == 'file') {
                      props.onHandleChange && props.onHandleChange(val.target.files);
                    } else if (formatnumber) {
                      setAmountValue(val.target.value);
                      field.onChange(val.target.value);
                      props.onChange && props.onChange(val.target.value);
                    } else {
                      field.onChange(val.target.value);
                      props.onChange && props.onChange(val.target.value);
                    }
                  }}
                />
              );
            }}
          />

          {!noMessage && getFieldState(props.name).invalid && (
            <div className='invalid-feedback' style={feedbackStyle}>
              {getFieldState(props.name)?.error?.message?.toString()}
            </div>
          )}
        </>
      )}
    </>
  )
};
