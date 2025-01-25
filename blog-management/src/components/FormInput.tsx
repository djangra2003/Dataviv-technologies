import React from 'react';

interface FormInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({ label, type, value, onChange, required }) => {
  return (
    <div className="mb-4">
      <label className="block mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="border p-2 w-full"
      />
    </div>
  );
};

export default FormInput;