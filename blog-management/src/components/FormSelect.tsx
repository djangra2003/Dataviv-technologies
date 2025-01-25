import React from 'react';

interface FormSelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FormSelect: React.FC<FormSelectProps> = ({ label, options, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block mb-1">{label}</label>
      <select value={value} onChange={onChange} className="border p-2 w-full">
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;