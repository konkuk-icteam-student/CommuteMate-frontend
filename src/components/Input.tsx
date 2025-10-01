import React from 'react';
import classNames from 'classnames';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({ fullWidth = true, className, ...props }) => {
  return (
    <input
      className={classNames(
        'h-12 px-4 border border-[#e0e0e0] rounded-lg outline-none transition-all bg-white',
        'text-[15px] text-[#111] placeholder:text-[#999]',
        'focus:border-[#111]',
        { 'w-full': fullWidth },
        className
      )}
      {...props}
    />
  );
};


export default Input;
