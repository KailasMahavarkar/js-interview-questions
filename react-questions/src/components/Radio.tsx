import React, { InputHTMLAttributes } from 'react';

type RadioPropTypes = InputHTMLAttributes<HTMLInputElement> & {
    options: { value: string; label: string; }[];
    selectedValues: string[];
    onChange: (selected: string[]) => void;
    multiSelect?: boolean;
    className?: string;
};


const Radio: React.FC<RadioPropTypes> = ({
    options,
    selectedValues,
    onChange,
    multiSelect = false,
    className = '',
    ...rest
}) => {
    const handleChange = (value: string) => {
        if (multiSelect) {
            if (selectedValues.includes(value)) {
                onChange(selectedValues.filter((item) => item !== value));
            } else {
                onChange([...selectedValues, value]);
            }
        } else {
            onChange([value]);
        }
    };

    return (
        <div className={className}>
            {options.map((option) => (
                <label key={option.value} className="flex items-center mb-2">
                    <input
                        {...rest}
                        type="checkbox"
                        checked={selectedValues.includes(option.value)}
                        onChange={() => handleChange(option.value)}
                        className="mr-2"
                    />
                    {option.label}
                </label>
            ))}
        </div>
    );
};

export default Radio;
