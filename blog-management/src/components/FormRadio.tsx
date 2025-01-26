import React from 'react';

interface FormRadioProps {
  label: string;
  options: { value: string; label: string }[];
  selectedValue: string;
  onChange: (value: string) => void; // Expect a string value
}

const FormRadio: React.FC<FormRadioProps> = ({ label, options, selectedValue, onChange }) => {
  return (
    <div className="mb-4">
      <span className="block text-sm font-medium">{label}</span>
      {options.map(option => (
        <label key={option.value} className="inline-flex items-center mr-4">
          <input
            type="radio"
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)} // Call onChange with the option value
            className="form-radio"
          />
          <span className="ml-2">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default FormRadio;