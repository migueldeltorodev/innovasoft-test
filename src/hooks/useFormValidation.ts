import { useState, useCallback } from 'react';
import { validationUtils } from '../utils/validation.utils';

interface ValidationRules {
  [key: string]: (value: any) => boolean;
}

interface ValidationErrors {
  [key: string]: string;
}

export const useFormValidation = <T extends object>(initialState: T, rules: ValidationRules) => {
  const [formData, setFormData] = useState<T>(initialState);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateField = useCallback((name: string, value: any) => {
    if (rules[name]) {
      const isValid = rules[name](value);
      setErrors(prev => ({
        ...prev,
        [name]: isValid ? '' : `Invalid ${name}`
      }));
      return isValid;
    }
    return true;
  }, [rules]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  }, [validateField]);

  const validateForm = useCallback(() => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    Object.keys(rules).forEach(fieldName => {
      const value = (formData as any)[fieldName];
      if (!rules[fieldName](value)) {
        newErrors[fieldName] = `Invalid ${fieldName}`;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [formData, rules]);

  const resetForm = useCallback(() => {
    setFormData(initialState);
    setErrors({});
  }, [initialState]);

  return {
    formData,
    errors,
    handleChange,
    validateForm,
    resetForm,
    setFormData
  };
};
