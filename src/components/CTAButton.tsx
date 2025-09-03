import React from 'react';
import classNames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, ...props }) => {
  const variantClass = {
    primary: 'krds-btn krds-btn--primary',
    secondary: 'krds-btn krds-btn--secondary',
    tertiary: 'krds-btn krds-btn--tertiary',
  }[variant];

  return (
    <button className={classNames(variantClass)} disabled={variant === 'secondary'} {...props}>
      {children}
    </button>
  );
};

export default Button;
