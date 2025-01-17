import React, { SelectHTMLAttributes } from 'react';

type SelectPropTypes = SelectHTMLAttributes<HTMLSelectElement> & {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
    className?: string;
};

const Select: React.FC<SelectPropTypes> = ({
    value,
    onChange,
    options,
    className
}) => {
    return (
        <div className={className}>
            <select
                value={value}
                onChange={onChange}
                className="p-2 border rounded"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
