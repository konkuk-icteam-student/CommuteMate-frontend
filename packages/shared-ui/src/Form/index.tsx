import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="form-field">
      {label && <label className="form-label">{label}</label>}
      <input className={`form-input ${error ? 'error' : ''} ${className}`} {...props} />
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

export const Form: React.FC<FormProps> = ({ children, ...props }) => {
  return <form {...props}>{children}</form>;
};
