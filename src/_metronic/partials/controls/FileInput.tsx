import {isArray} from 'lodash';
import {Col, Row} from 'react-bootstrap';
import {Controller, useFormContext} from 'react-hook-form';
import {KTSVG, toAbsoluteUrl} from '@/_metronic/helpers';
import './styles/FileInput.css';

export type FileUploaderCategory = {
  title: string;
  name: string;
  isRequired?: boolean;
};
export type FileInputProps = {
  isMulti?: boolean;
  isFlat?: boolean;
  category?: FileUploaderCategory[] | string;
  name: string;
  title?: string;
  types?: string[];
};

export const FileInputField = ({isMulti = false, ...props}: FileInputProps) => {
  const {register, setValue, formState, getValues, clearErrors} = useFormContext();

  const hasError = () => {
    if (!!props && isArray(props.category) && props?.category?.length > 0)
      return props.category.some((x: any) => !!formState.errors[x.name]);
    else return !!formState.errors[props.name];
  };

  return (
    <>
      {!isMulti && !isArray(props.category) && (
        <Controller
          name={props.name}
          render={({field}) => {
            return (
              <input
                type='file'
                accept={props?.types?.map((x) => '.' + x).join(',')}
                className='d-none'
                {...(field.name ? register(field.name) : {})}
                id={field.name}
                onChange={(e) => {
                  clearErrors(field.name);
                  setValue(field.name, e.target.files?.length ? e.target.files[0] : null);
                }}
              />
            );
          }}
        />
      )}
      <label
        className={`${!props.isFlat && hasError() ? 'border-danger' : 'border-gray'} ${
          !props.isFlat && 'border-1 border-dashed rounded'
        } p-5 w-100 ${!isMulti && !isArray(props.category) ? 'cursor-pointer' : ''}`}
        {...(!isMulti && !isArray(props.category) ? {htmlFor: `${props.name}`} : {htmlFor: ``})}
      >
        {!!getValues(props.name)?.name ? (
          <>
            {!props.isFlat ? (
              <div
                className='border border-1 border-gray p-2 w-200px rounded d-flex flex-row'
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <img
                  className='h-50px w-50px rounded flex-1'
                  title='تصویر'
                  src={window.URL.createObjectURL(getValues(props.name))}
                />
                <div className='overflow-hidden px-3 d-flex align-content-center flex-wrap w-115px'>
                  {getValues(props.name)?.name}
                </div>
                <div className='flex-1'>
                  <button
                    type='button'
                    className='btn btn-link me-1'
                    title='حذف'
                    onClick={(e) => {
                      setValue(props.name, undefined);
                      e.preventDefault();
                    }}
                  >
                    <KTSVG path='/media/icons/delete.svg' viewBox='-1 -1 16 17' />
                  </button>
                </div>
              </div>
            ) : (
              <div
                className='border border-1 border-gray p-2 w-200px rounded d-flex flex-row'
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <img
                  className='h-30px w-30px rounded flex-1'
                  title='تصویر'
                  src={window.URL.createObjectURL(getValues(props.name))}
                />
                <div className='overflow-hidden px-3 d-flex align-content-center flex-wrap w-115px'>
                  {getValues(props.name)?.name}
                </div>
                <div className='flex-1'>
                  <button
                    type='button'
                    className='btn btn-link me-1'
                    title='حذف'
                    onClick={(e) => {
                      setValue(props.name, undefined);
                      e.preventDefault();
                    }}
                  >
                    <KTSVG path='/media/icons/delete.svg' viewBox='-1 -1 16 17' />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <Row className='d-flex align-items-center'>
            <Col
              {...(!props.isFlat
                ? isArray(props.category)
                  ? {xxl: 4, xl: 4, lg: 6, md: 6, xs: 12}
                  : {xs: 12}
                : {xs: 3})}
              className={`${props.isFlat ? '' : 'pt-2'}`}
            >
              <Row>
                {!props.isFlat && (
                  <Col xs='auto' className='w-60px w-md-85px text-left'>
                    <img
                      className='w-100'
                      src={toAbsoluteUrl('/media/svg/operation/sample-icon-uploader.svg')}
                      alt=''
                    />
                  </Col>
                )}
                <Col className='p-0 pt-md-1'>
                  <Row className={`${props.isFlat ? '' : 'mt-md-2'}`}>
                    <Col xs>
                      <span
                        className={`${
                          props.isFlat ? 'Title text-black fs-5' : 'Title color-base fs-5'
                        }`}
                      >
                        {props.title}
                      </span>
                    </Col>
                    {!props.isFlat && (
                      <Col lg={12} xs={12}>
                        <span className='Description'>
                          فایل های قابل قبول<span className='text-style-1'>：</span>.pdf .jpg
                        </span>
                        {formState.errors && (
                          <div>
                            <span style={{color: 'Red', paddingRight: '10px'}}>
                              {formState.errors.root?.message}
                            </span>
                          </div>
                        )}
                      </Col>
                    )}
                  </Row>
                </Col>
              </Row>
            </Col>
            {!props.isFlat && isArray(props.category) && (
              <div className='line-2 p-0 m-0 mt-n2 ms-3 d-none d-md-block'></div>
            )}
            <Col className='ps-md-6 border-start-md-1'>
              <Row>
                <Col lg={12} xs={12} className={props.isFlat? 'd-flex align-items-center gap-10': ''}>
                  {isArray(props.category) &&
                    props.category.map((x) => (
                      <>
                        <Controller
                          name={x.name}
                          render={({field}) => {
                            return (
                              <>
                                {(typeof getValues(field.name) === 'object' &&
                                  !!getValues(field.name)?.length) ||
                                (typeof getValues(field.name) === 'object' &&
                                  !!getValues(field.name)?.name) ? (
                                  <>
                                    {!props.isFlat ? (
                                      <div
                                        className={`border border-1  ${
                                          !!formState.errors[field.name]
                                            ? 'border-danger'
                                            : 'border-gray'
                                        } p-2 w-md-200px w-100 rounded d-flex flex-row my-md-2 my-5`}
                                        onClick={(e) => {
                                          e.preventDefault();
                                        }}
                                      >
                                        <div
                                          className='d-block d-md-none'
                                          style={{
                                            position: 'absolute',
                                            backgroundColor: '#fff',
                                            padding: '0 5px',
                                            marginTop: '-18px',
                                            marginRight: '10px',
                                          }}
                                        >
                                          {x.title} {x.isRequired && '(اجباری)'}
                                        </div>
                                        <img
                                          className='h-50px w-50px rounded flex-1'
                                          title='تصویر'
                                          src={window.URL.createObjectURL(getValues(x.name))}
                                        />
                                        <div className='overflow-hidden px-3 d-flex align-content-center flex-wrap w-md-115px flex-grow-1'>
                                          {getValues(x.name)?.name}
                                        </div>
                                        <div className='flex-1'>
                                          <button
                                            type='button'
                                            className='btn btn-link me-1'
                                            title='حذف'
                                            onClick={(e) => {
                                              setValue(x.name, undefined);
                                              e.preventDefault();
                                            }}
                                          >
                                            <KTSVG
                                              path='/media/icons/delete.svg'
                                              viewBox='-1 -1 16 17'
                                            />
                                          </button>
                                        </div>
                                      </div>
                                    ) : (
                                      <div
                                        className={`border border-1  ${
                                          !!formState.errors[field.name]
                                            ? 'border-danger'
                                            : 'border-gray'
                                        } p-2 w-md-200px w-100 h-50px rounded d-flex flex-row my-md-2 my-5`}
                                        onClick={(e) => {
                                          e.preventDefault();
                                        }}
                                      >
                                        <div
                                          className='d-block d-md-none'
                                          style={{
                                            position: 'absolute',
                                            backgroundColor: '#fff',
                                            padding: '0 5px',
                                            marginTop: '-18px',
                                            marginRight: '10px',
                                          }}
                                        >
                                          {x.title} {x.isRequired && '(اجباری)'}
                                        </div>
                                        <img
                                          className='h-40px w-40px rounded flex-1'
                                          title='تصویر'
                                          src={window.URL.createObjectURL(getValues(x.name))}
                                        />
                                        <div className='overflow-hidden px-3 d-flex align-content-center flex-wrap h-50px w-md-115px flex-grow-1'>
                                          {getValues(x.name)?.name}
                                        </div>
                                        <div className='flex-1'>
                                          <button
                                            type='button'
                                            className='btn btn-link me-1'
                                            title='حذف'
                                            onClick={(e) => {
                                              setValue(x.name, undefined);
                                              e.preventDefault();
                                            }}
                                          >
                                            <KTSVG
                                              path='/media/icons/delete.svg'
                                              viewBox='-1 -1 16 17'
                                            />
                                          </button>
                                        </div>
                                      </div>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    {!props.isFlat ? (
                                      <>
                                        <label
                                          className={`d-block d-md-none border border-1 ${
                                            !!formState.errors[field.name]
                                              ? 'border-danger'
                                              : 'border-gray'
                                          } p-2 w-md-200px w-100 rounded d-flex flex-row my-md-2 mt-5 h-65px`}
                                          htmlFor={field.name}
                                        >
                                          <div
                                            className={`d-block d-md-none ${
                                              !!formState.errors[field.name]
                                                ? 'text-danger'
                                                : 'text-primary'
                                            }`}
                                            style={{
                                              position: 'absolute',
                                              backgroundColor: '#fff',
                                              padding: '0 5px',
                                              marginTop: '-18px',
                                              marginRight: '10px',
                                            }}
                                          >
                                            {x.title} {x.isRequired && '(اجباری)'}
                                          </div>
                                          <div
                                            className={`py-2 px-5 text-center flex-grow-1 ${
                                              !!formState.errors[field.name]
                                                ? 'text-danger'
                                                : 'text-primary'
                                            } align-self-center`}
                                          >
                                            <i className='fas fa-upload me-2 fs-1'></i>
                                            <span className='fs-4'>بارگذاری</span>
                                          </div>
                                        </label>
                                        <label
                                          className={`d-none d-md-block cursor-pointer ${
                                            !!formState.errors[field.name]
                                              ? 'text-danger'
                                              : 'text-primary'
                                          } fs-4 h-45px`}
                                          htmlFor={field.name}
                                          style={{lineHeight: '3rem'}}
                                        >
                                          بارگذاری {x.title} {x.isRequired && '(اجباری)'}
                                          <div className='fs-8 lh-1 mt-n2'>
                                            {formState.errors[field.name]?.message?.toString()}
                                          </div>
                                        </label>
                                      </>
                                    ) : (
                                      <>
                                        <label
                                          className={`d-block d-md-none ${
                                            !!formState.errors[field.name]
                                              ? 'text-danger'
                                              : 'text-gray'
                                          } p-2 w-md-200px w-100 rounded d-flex flex-row my-md-2 mt-5 h-65px align-items-center me-10`}
                                          htmlFor={field.name}
                                        >
                                          <div
                                            className={`d-block d-md-none ${
                                              !!formState.errors[field.name]
                                                ? 'text-danger'
                                                : 'text-primary'
                                            }`}
                                            style={{
                                              position: 'absolute',
                                              backgroundColor: '#fff',
                                              padding: '0 5px',
                                              marginTop: '-18px',
                                              marginRight: '10px',
                                            }}
                                          >
                                            {x.title} {x.isRequired && '(اجباری)'}
                                          </div>
                                          <div
                                            className={`py-2 px-5 text-center flex-grow-1 ${
                                              !!formState.errors[field.name]
                                                ? 'text-danger'
                                                : 'text-primary'
                                            } align-self-center`}
                                          >
                                            <i className='fas fa-upload me-2 fs-1'></i>
                                            <span className='fs-4'>بارگذاری</span>
                                          </div>
                                        </label>
                                        <label
                                          className={`d-none d-md-inline-block cursor-pointer w-md-200px ${
                                            !!formState.errors[field.name]
                                              ? 'text-danger'
                                              : 'text-primary'
                                          } ${props.isFlat ? 'fs-6' : 'fs-4'} h-45px`}
                                          htmlFor={field.name}
                                          style={{lineHeight: '3rem'}}
                                        >
                                          بارگذاری {x.title}
                                          <div className='fs-8 lh-1 mt-n2'>
                                            {formState.errors[field.name]?.message?.toString()}
                                          </div>
                                        </label>
                                      </>
                                    )}
                                  </>
                                )}
                                <input
                                  type='file'
                                  accept={props?.types?.map((x) => '.' + x).join(',')}
                                  className='d-none'
                                  {...(field.name ? register(field.name) : {})}
                                  id={field.name}
                                  onChange={(e) => {
                                    clearErrors(field.name);
                                    setValue(
                                      field.name,
                                      e.target.files?.length ? e.target.files[0] : null
                                    );
                                  }}
                                />
                              </>
                            );
                          }}
                        />
                      </>
                    ))}
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </label>
    </>
  );
};
