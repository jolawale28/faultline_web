import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
}

export function Button({ children, className = '', ...props }: ButtonProps) {
    return (
        <button
            className={`px-4 py-2 rounded-2xl bg-black text-white font-bold hover:bg-gray-800 transition-colors ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
