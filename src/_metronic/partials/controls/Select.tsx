import { Controller, useFormContext } from 'react-hook-form'
import Select from 'react-select'
import './styles/Select.css'
import './styles/Select.scss'
import { FloatLabel } from './'

export const SelectField = ({ label, ...props }: any) => {
  const { control, getFieldState } = useFormContext()

  function getSelectStyles(multi: any, size = '') {
    const suffix = size ? `-${size}` : ''
    const multiplicator = multi ? 2 : 1
    return {
      'input-group': {
        container: (provided: any) => ({
          ...provided,
          control: (
            provided: any) => ({
              ...provided,
              ':not(:first-child)': {
                borderRadius: '0',
              },
            }),
        }),
      },
      control: (
        provided: any,
        { isDisabled, isFocused }: { isDisabled: boolean; isFocused: boolean },
      ) => ({
        ...provided,
        backgroundColor: `var(--bs-select${isDisabled ? '-' : ''}-bg)`,
        borderColor: `var(--bs-select${isDisabled ? '-' : isFocused ? '-focus' : ''
          }-border-color)`,
        borderWidth: 'var(--bs-select-border-width)',
        lineHeight: 'var(--bs-select-line-height)',
        fontSize: `var(--bs-select-font-size${suffix})`,
        fontWeight: 'var(--bs-select-font-weight)',
        boxShadow: 'none',
        backgroundPosition: 'left 1rem center',
        minHeight: `calc((var(--bs-select-line-height)*var(--bs-select-font-size${suffix})) + (var(--bs-select-padding-y${suffix})*2) + (var(--bs-select-border-width)*2))`,
        ':hover': {
          borderColor: `var(--bs-select${isDisabled ? '-' : isFocused ? '-focus' : ''
            }-border-color)`,
          boxShadow: 'none',
        },
      }),
      singleValue: ({ marginLeft, marginRight, ...provided }: any, { isDisabled }: any) => ({
        ...provided,
        color: `var(--bs-select${isDisabled ? '-' : ''}-color)`,
      }),
      valueContainer: (provided: any) => ({
        ...provided,
        padding: `calc(var(--bs-select-padding-y${suffix})/${multiplicator}) calc(var(--bs-select-padding-x${suffix})/${multiplicator})`,
      }),
      dropdownIndicator: () => ({
        height: '100%',
        width: 'var(--bs-select-indicator-padding)',
        backgroundImage: 'var(--bs-select-indicator)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `right var(--bs-select-padding-x) center`,
        backgroundSize: 'var(--bs-select-bg-size)',
        padding: '0.539rem 0',
        transition: 'color 150ms',
        boxSizing: 'border-box',
      }),
      input: ({ margin, paddingTop, paddingBottom, ...provided }: any) => ({
        ...provided,
      }),
      option: (provided: any) => ({
        ...provided,
        // margin: `calc(var(--bs-select-padding-y${suffix})/2) calc(var(--bs-select-padding-x${suffix})/2)`,
      }),
      menu: ({ marginTop, ...provided }: any) => ({
        ...provided,
      }),
      menuPortal: ({ marginTop, ...provided }: any) => ({
        ...provided,
        zIndex: 1200,
      }),
      multiValue: (provided: any) => ({
        ...provided,
        margin: `calc(var(--bs-select-padding-y${suffix})/2) calc(var(--bs-select-padding-x${suffix})/2)`,
      }),
      clearIndicator: ({ padding, ...provided }: any) => ({
        ...provided,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: 'var(--bs-select-indicator-padding)',
      }),
      multiValueLabel: ({ padding, paddingLeft, fontSize, ...provided }: any) => ({
        ...provided,
        padding: `0 var(--bs-select-padding-y${suffix})`,
        whiteSpace: 'normal',
        zIndex: 1000,
      }),
    }
  }

  return (
    <>
      {props.floatingLabel ? (
        <>
          {(!props.floatingLabel && label) && <label htmlFor={props.name}>{label}</label>}
          <Controller
            name={props.name}
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <FloatLabel
                  controlId={props.name}
                  label={label}
                  className="mb-3"
                >
                  <Select
                    // components={{ DropdownIndicator, IndicatorSeparator, ...components }}
                    // theme={getSelectTheme}
                    styles={getSelectStyles('isMulti' in props, props.size)}
                    {...props}
                    isRtl={true}
                    value={props.options?.find((c: any) => c.value === value || c.value === value?.value)}
                    loadingMessage={() => 'درحال دریافت اطلاعات...'}
                    noOptionsMessage={() => 'هیچ گزینه ای برای نمایش وجود ندارد'}
                    placeholder={'انتخاب کنید'}
                    menuPortalTarget={document.body}
                    // styles={SelectStyles}
                    onChange={(item: any) => {
                      onChange(item.value)
                      !!props.onChange && props.onChange(item.value)
                    }}
                    classNamePrefix='react-select'
                    className={[
                      'react-select-styled select-container form-control p-0',
                      getFieldState(props.name).invalid ? 'is-invalid' : '',
                      props.size ? `${props.size}` : '',
                    ].join(' ')}
                  />
                  {getFieldState(props.name).invalid && (
                    <div className='invalid-feedback'>
                      {getFieldState(props.name)?.error?.message?.toString()}
                    </div>
                  )}
                </FloatLabel>
              )
            }}
          />
        </>
      ) : (
        <>
          {(!props.floatingLabel && label) && <label htmlFor={props.name}>{label}</label>}
          <Controller
            name={props.name}
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <Select
                  // components={{ DropdownIndicator, IndicatorSeparator, ...components }}
                  // theme={getSelectTheme}
                  styles={getSelectStyles('isMulti' in props, props.size)}
                  {...props}
                  isRtl={true}
                  value={props.options?.find((c: any) => c.value === value || c.value === value?.value)}
                  loadingMessage={() => 'درحال دریافت اطلاعات...'}
                  noOptionsMessage={() => 'هیچ گزینه ای برای نمایش وجود ندارد'}
                  placeholder={'انتخاب کنید'}
                  menuPortalTarget={document.body}
                  // styles={SelectStyles}
                  onChange={(item: any) => {
                    onChange(item.value)
                    !!props.onChange && props.onChange(item.value)
                  }}
                  classNamePrefix='react-select'
                  className={[
                    'react-select-styled select-container form-control p-0',
                    getFieldState(props.name).invalid ? 'is-invalid' : '',
                    props.size ? `${props.size}` : '',
                  ].join(' ')}
                />
              )
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
