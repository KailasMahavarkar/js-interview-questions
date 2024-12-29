import { FC, ButtonHTMLAttributes } from 'react';

type ButtonPropTypes = ButtonHTMLAttributes<HTMLButtonElement> & {
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
}

const Button: FC<ButtonPropTypes> = ({
    onClick,
    children,
    className,
    ...rest
}) => {
    return (
        <button
            onClick={onClick}
            className={`p-2 rounded bg-blue-500 text-white ${className}`}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;
