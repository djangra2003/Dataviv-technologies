import { ChangeEvent } from 'react';

interface FormSelectProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    options: string[];
    error?: string;
    required?: boolean;
}

const FormSelect: React.FC<FormSelectProps> = ({ label, name, value, onChange, options, error, required }) => (
    <div className="mb-4">
        <label htmlFor={name} className="block text-gray-700 font-bold mb-2">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <select id={name} name={name} value={value} onChange={onChange} required={required} className={`border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${error ? 'border-red-500' : ''}`}>
            <option value="">Select a category</option>
            {options.map((option) => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
);

export default FormSelect;