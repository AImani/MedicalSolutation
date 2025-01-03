import { useFormContext } from 'react-hook-form'
import { FloatLabel } from './'

export const TextAreaField: React.FC<any> = ({ ltr = false, ...props }: any, rules = {}, errors = []) => {
  const { register, setValue, formState, getFieldState } = useFormContext()

  return (
    <>
      {props.floatingLabel ? (
        <FloatLabel
          controlId={props.name}
          label={props.label}
          className="mb-3"
        >
          <>
            {(!props.floatingLabel && props.label) && <label htmlFor={props.name}>{props.label}</label>}
            <textarea
              {...props}
              type={props.type}
              id={props.name}
              rows={props.rows}
              autoComplete='off'
              {...register(props.name)}
              className={['form-control', props.className, getFieldState(props.name).invalid && 'is-invalid', ltr && "dir-ltr",].join(' ')}
              onChange={(val) => {
                setValue(props.name, val.target.value)
                props.onChange && props.onChange(val.target.value)
              }}
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
          <textarea
            {...props}
            type={props.type}
            id={props.name}
            rows={props.rows}
            autoComplete='off'
            {...register(props.name)}
            className={['form-control', props.className, getFieldState(props.name).invalid && 'is-invalid', ltr && "dir-ltr",].join(' ')}
            onChange={(val) => {
              setValue(props.name, val.target.value)
              props.onChange && props.onChange(val.target.value)
            }}
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
}
