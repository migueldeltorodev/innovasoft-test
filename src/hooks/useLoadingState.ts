import { useState } from 'react';

export const useLoadingState = (initialState: boolean = false) => {
  const [isLoading, setIsLoading] = useState(initialState);

  const withLoading = async <T>(fn: () => Promise<T>): Promise<T> => {
    setIsLoading(true);
    try {
      const result = await fn();
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, withLoading };
};
