import React from 'react';

interface FormInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, type, value, onChange, error }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`mt-1 block w-full border rounded-md p-2 ${error ? 'border-red-500' : 'border-gray-300'}`}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default FormInput;