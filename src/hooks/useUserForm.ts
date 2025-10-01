import { useState } from 'react';

export const useUserForm = () => {
  const [ID, setID] = useState('');
  const [password, setPassword] = useState('');

  const isFormFilled = !!(ID && password);

  return {
    ID,
    setID,
    password,
    setPassword,
    isFormFilled,
  };
};
