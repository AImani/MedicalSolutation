import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { FloatLabel } from './FloatLabel'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

export interface MultiSelectSearchOption {
  value: string | number
  label: string
}

interface MultiSelectSearchProps {
  name: string
  label?: string
  placeholder?: string
  options: MultiSelectSearchOption[] | ((searchTerm: string) => Promise<MultiSelectSearchOption[]>)
  onChange?: (selectedValues: any[]) => void
  maxSelections?: number
  floatingLabel?: boolean
  noMessage?: boolean
  isRtl?: boolean
  className?: string
  searchPlaceholder?: string
  noOptionsMessage?: string
  size?: 'sm' | 'lg' | ''
  debounceTime?: number
  loadingMessage?: string
}

export const MultiSelectSearch: React.FC<MultiSelectSearchProps> = (props) => {
  const { t } = useTranslation()

  const {
    name,
    label,
    placeholder = t('Actions.Search'),
    options = [],
    onChange,
    maxSelections,
    floatingLabel = false,
    noMessage = false,
    isRtl = true,
    className = '',
    searchPlaceholder = t('Actions.Search'),
    noOptionsMessage = t('Messages.NoRecords'),
    size = '',
    debounceTime = 500,
    loadingMessage = t('Actions.Searching'),
    ...otherProps
  } = props

  const { control, getValues, setValue, getFieldState } = useFormContext()
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [localOptions, setLocalOptions] = useState<MultiSelectSearchOption[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchTimerRef = useRef<NodeJS.Timeout | null>(null)

  const isOptionsFunction = typeof options === 'function'

  useEffect(() => {
    if (!isOptionsFunction) {
      setLocalOptions(options as MultiSelectSearchOption[])
    }
  }, [options, isOptionsFunction])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    return () => {
      if (searchTimerRef.current) {
        clearTimeout(searchTimerRef.current)
      }
    }
  }, [])

  const fetchOptions = useCallback(
    async (term: string) => {
      if (!isOptionsFunction) return

      try {
        setIsLoading(true)
        setError(null)
        const fetchFn = options as (searchTerm: string) => Promise<MultiSelectSearchOption[]>
        const results = await fetchFn(term)
        setLocalOptions(results || [])
      } catch (err) {
        setError('خطا در دریافت اطلاعات')
        setLocalOptions([])
      } finally {
        setIsLoading(false)
      }
    },
    [options, isOptionsFunction]
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)

    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current)
    }

    if (value.trim().length === 0) {
      setValue(name, [])
      onChange && onChange([])
    }

    if (isOptionsFunction) {
      if (value.trim().length > 0) {
        setIsLoading(true)
        searchTimerRef.current = setTimeout(() => {
          fetchOptions(value)
        }, debounceTime)
      } else {
        setIsLoading(false)
        setLocalOptions([])
      }
    } else {
      if (value.trim().length === 0) {
        setLocalOptions(options as MultiSelectSearchOption[])
      }
    }
  }

  const filteredOptions = isOptionsFunction
    ? localOptions
    : (localOptions || []).filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    )

  const handleToggleDropdown = () => {
    const newIsOpen = !isOpen
    setIsOpen(newIsOpen)

    if (isOpen && !newIsOpen) {
      setSearchTerm('')

      // if (localOptions.length === 0 && isOptionsFunction) {
      // }
    }
  }

  const isMaxSelectionsReached = (currentValues: any[] = []) => {
    return maxSelections !== undefined && currentValues.length >= maxSelections
  }

  const renderContent = (field: any) => {
    const selectedValues = field.value || []
    const isMaxReached = isMaxSelectionsReached(selectedValues)
    const controlSizeClass = size ? `form-control-${size}` : ''

    const safeLocalOptions = localOptions || []
    const safeStaticOptions = isOptionsFunction ? [] : (options as MultiSelectSearchOption[]) || []

    return (
      <div className={clsx('position-relative w-100', isRtl && 'text-end')} ref={dropdownRef}>
        <div
          className={clsx(
            'form-control d-flex align-items-center justify-content-between',
            controlSizeClass,
            getFieldState(name).invalid && 'is-invalid pe-4',
            isOpen && 'border-primary shadow-sm',
            className
          )}
          onClick={handleToggleDropdown}
          style={{ minHeight: 'calc(1.5em + 1.5rem + 2px)', cursor: 'pointer' }}
        >
          <div className='d-flex flex-grow-1 flex-wrap overflow-hidden'>
            {selectedValues.length > 0 ? (
              <div className='d-flex flex-wrap gap-1 flex-grow-1 overflow-hidden'>
                {selectedValues.map((val: any) => {
                  const option = [...safeLocalOptions, ...safeStaticOptions].find(
                    (o) => o.value === val
                  )
                  return option ? (
                    <div
                      key={val}
                      className='d-inline-flex align-items-center bg-light bg-opacity-75 rounded px-2 py-1 me-1 mb-1'
                    >
                      <span className='me-1 fs-7'>{option.label}</span>
                      <button
                        type='button'
                        className='btn btn-sm btn-icon btn-active-light p-0'
                        style={{ width: '16px', height: '16px' }}
                        onClick={(e) => {
                          e.stopPropagation()
                          const newValues = selectedValues.filter((v: any) => v !== val)
                          field.onChange(newValues)
                          setValue(name, newValues)
                          onChange && onChange(newValues)
                        }}
                      >
                        <i className='fas fa-times fs-7'></i>
                      </button>
                    </div>
                  ) : null
                })}
              </div>
            ) : (
              <div className='text-muted'>{placeholder}</div>
            )}
          </div>
          <div className='d-flex ms-2 text-gray-600 flex-shrink-0'>
            <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} fs-5`}></i>
          </div>
        </div>

        {isOpen && (
          <div className='position-absolute start-0 end-0 mt-1 bg-white border rounded shadow-sm z-index-3'>
            <div className='p-2 border-bottom position-relative'>
              <input
                ref={searchInputRef}
                type='text'
                className={clsx(
                  'form-control',
                  size === 'sm' ? 'form-control-sm' : '',
                  searchTerm.trim().length > 0 ? 'pe-4' : ''
                )}
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={handleSearchChange}
                onClick={(e) => e.stopPropagation()}
              />
              {searchTerm.trim().length > 0 && (
                <button
                  type='button'
                  className='btn btn-sm btn-icon position-absolute top-50 end-0 translate-middle-y me-3 p-0'
                  style={{ width: '20px', height: '20px' }}
                  onClick={(e) => {
                    e.stopPropagation()
                    const clearEvent = {
                      target: { value: '' },
                    } as React.ChangeEvent<HTMLInputElement>
                    handleSearchChange(clearEvent)
                    if (searchInputRef.current) {
                      searchInputRef.current.focus()
                    }
                  }}
                >
                  <i className='fas fa-times text-muted'></i>
                </button>
              )}
            </div>
            <div className='overflow-auto' style={{ maxHeight: '250px' }}>
              {isLoading ? (
                <div className='p-3 text-center'>
                  <div className='spinner-border spinner-border-sm text-primary me-2' role='status'>
                    <span className='visually-hidden'>Loading...</span>
                  </div>
                  <span>{loadingMessage}</span>
                </div>
              ) : error ? (
                <div className='p-3 text-center text-danger'>{error}</div>
              ) : filteredOptions && filteredOptions.length > 0 ? (
                <>
                  {filteredOptions.map((option) => {
                    const isSelected = selectedValues.includes(option.value)
                    const isDisabled = !isSelected && isMaxReached

                    return (
                      <div
                        key={option.value}
                        className={clsx(
                          'px-3 py-2',
                          isSelected && 'bg-light bg-opacity-75',
                          isDisabled
                            ? 'opacity-50 cursor-not-allowed'
                            : 'cursor-pointer hover-bg-light-primary'
                        )}
                        onClick={(e) => {
                          e.stopPropagation()
                          if (isDisabled) return

                          let newValues: any[]
                          if (isSelected) {
                            newValues = selectedValues.filter((v: any) => v !== option.value)
                          } else {
                            newValues = [...selectedValues, option.value]
                          }

                          field.onChange(newValues)
                          setValue(name, newValues)
                          onChange && onChange(newValues)

                          if (maxSelections && newValues.length >= maxSelections && !isSelected) {
                            setIsOpen(false)
                          }

                          if (!isSelected && newValues.length === filteredOptions.length) {
                            setIsOpen(false)
                          }
                        }}
                      >
                        <div className='d-flex justify-content-between align-items-center'>
                          <span>{option.label}</span>
                          {isSelected && (
                            <span className='text-primary'>
                              <i className='fas fa-check fs-6'></i>
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </>
              ) : searchTerm.trim().length > 0 ? (
                <div className='py-3 text-center text-muted'>{noOptionsMessage}</div>
              ) : null}

              {!isLoading && !error && filteredOptions && filteredOptions.length > 0 && (
                <div className='px-3 py-2 text-muted small border-top d-flex justify-content-between align-items-center'>
                  <div className='d-flex align-items-center gap-2'>
                    {!maxSelections &&
                      filteredOptions.length > 0 &&
                      (selectedValues.length < filteredOptions.length ? (
                        <button
                          type='button'
                          className='btn btn-sm btn-light-primary'
                          onClick={(e) => {
                            e.stopPropagation()
                            const allValues = filteredOptions.map((option) => option.value)

                            field.onChange(allValues)
                            setValue(name, allValues)
                            onChange && onChange(allValues)

                            setIsOpen(false)
                          }}
                        >
                          <i className='fas fa-check-double me-1'></i>
                          {t('Actions.AddAll')}
                        </button>
                      ) : null)}
                    {selectedValues.length > 0 && (
                      <button
                        type='button'
                        className='btn btn-sm btn-light-danger'
                        onClick={(e) => {
                          e.stopPropagation()

                          field.onChange([])
                          setValue(name, [])
                          onChange && onChange([])

                          if (searchInputRef.current) {
                            searchInputRef.current.focus()
                          }
                        }}
                      >
                        <i className='fas fa-trash me-1'></i>
                        {t('Actions.RemoveAll')}
                      </button>
                    )}
                  </div>
                  <span>تعداد کل: {filteredOptions.length}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {!noMessage && getFieldState(name).invalid && (
          <div className='invalid-feedback'>{getFieldState(name)?.error?.message?.toString()}</div>
        )}
      </div>
    )
  }

  return (
    <>
      {floatingLabel ? (
        <FloatLabel controlId={name} label={label || ''} className='mb-3'>
          <Controller name={name} control={control} render={({ field }) => renderContent(field)} />
        </FloatLabel>
      ) : (
        <>
          {label && (
            <label className='form-label' htmlFor={name}>
              <span className='text-gray-600'>{label}</span>
            </label>
          )}
          <Controller name={name} control={control} render={({ field }) => renderContent(field)} />
        </>
      )}
    </>
  )
}
