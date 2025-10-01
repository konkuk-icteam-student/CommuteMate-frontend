import React from 'react';
import classNames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className, ...props }) => {
  const baseClass = 'h-12 text-[15px] rounded-lg font-medium cursor-pointer transition-colors';

  const variantClass = {
    primary: 'bg-[#111] text-white hover:bg-[#333]',
    secondary: 'bg-[#f5f5f5] text-[#999] cursor-not-allowed',
    tertiary: 'bg-white text-[#111] border border-[#e0e0e0] hover:bg-[#fafafa]',
  }[variant];

  return (
    <button
      className={classNames(baseClass, variantClass, className)}
      disabled={variant === 'secondary'}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
