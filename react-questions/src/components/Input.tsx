import { FC, InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    placeholder?: string;
    className?: string;
};

const Input: FC<InputProps> = ({ placeholder, className, ...rest }) => {
    return (
        <input
            {...rest}
            type="text"
            placeholder={placeholder}
            className={`p-2 border rounded ${className}`}
        />
    );
};

export default Input;
