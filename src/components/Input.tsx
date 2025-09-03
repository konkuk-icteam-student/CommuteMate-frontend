import React from 'react';
import classNames from 'classnames';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({ fullWidth = true, className, ...props }) => {
  return (
    <input className={classNames('krds-input', { 'w-full': fullWidth }, className)} {...props} />
  );
};

export default Input;
