import { useState, useCallback } from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@mui/material';

type Severity = 'success' | 'error' | 'warning' | 'info';

interface NotificationState {
  open: boolean;
  message: string;
  severity: Severity;
}

export const useNotification = () => {
  const [notification, setNotification] = useState<NotificationState>({
    open: false,
    message: '',
    severity: 'info'
  });

  const showNotification = useCallback((message: string, severity: Severity = 'info') => {
    setNotification({
      open: true,
      message,
      severity
    });
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(prev => ({
      ...prev,
      open: false
    }));
  }, []);

  const NotificationComponent = () => (
    <Snackbar
      open={notification.open}
      autoHideDuration={6000}
      onClose={hideNotification}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert onClose={hideNotification} severity={notification.severity}>
        {notification.message}
      </Alert>
    </Snackbar>
  );

  return {
    showNotification,
    hideNotification,
    NotificationComponent
  };
};
