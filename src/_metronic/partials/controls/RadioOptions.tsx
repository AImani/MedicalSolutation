import React, { useState } from 'react';

export interface UsageOption {
  value: string;
  title: string;
  description: string;
  defaultChecked?: boolean;
}

export interface UsageSelectorProps {
  options: UsageOption[];
  initialValue?: string;
  onChange: (value: string) => void;
}

export const UsageSelector: React.FC<UsageSelectorProps> = ({ 
  options, 
  initialValue,
  onChange
}) => {
  const [selectedUsage, setSelectedUsage] = useState<string>(
    initialValue || options.find(opt => opt.defaultChecked)?.value || options[0]?.value || ''
  );

  const handleUsageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedUsage(event.target.value);
    onChange(event.target.value);
  };

  return (
      <div 
        className="row g-3" 
        data-kt-buttons="true" 
        data-kt-buttons-target="[data-kt-button]" 
        data-kt-initialized="1"
      >
        {options.map((option) => (
          <div 
            key={option.value} 
            className="col"
          >
            <label 
              className={`btn btn-outline btn-outline-dashed btn-active-light-primary d-flex text-start p-6 ${
                selectedUsage === option.value ? 'active' : ''
              }`}
              data-kt-button="true"
            >
              <span className="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1">
                <input
                  className="form-check-input"
                  type="radio"
                  name="usage"
                  value={option.value}
                  checked={selectedUsage === option.value}
                  onChange={handleUsageChange}
                  data-gtm-form-interact-field-id={option.value}
                />
              </span>
              <span className="ms-5">
                <span className="fs-4 fw-bold mb-1 d-block">
                  {option.title}
                </span>
              </span>
            </label>
          </div>
        ))}
      </div>
  );
};
