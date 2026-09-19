import { useEffect, useState } from 'react';

export const useToast = () => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState('success');

  useEffect(() => {
    if (!message) return;
    const timeout = window.setTimeout(() => setMessage(''), 2600);
    return () => window.clearTimeout(timeout);
  }, [message]);

  const showToast = (nextMessage, nextType = 'success') => {
    setType(nextType);
    setMessage(nextMessage);
  };

  return { message, type, showToast };
};
