import React from 'react';

interface FormSelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

const FormSelect: React.FC<FormSelectProps> = ({ label, options, value, onChange, error }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className={`mt-1 block w-full border rounded-md p-2 ${error ? 'border-red-500' : 'border-gray-300'}`}
      >
        <option value="">Select...</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default FormSelect;