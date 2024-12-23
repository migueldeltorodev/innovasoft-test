import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
    },
    secondary: {
      main: '#64748b',
      light: '#94a3b8',
      dark: '#475569',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    subtitle1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '0 25px 30px -7px rgb(0 0 0 / 0.1), 0 10px 12px -8px rgb(0 0 0 / 0.1)',
    '0 30px 35px -8px rgb(0 0 0 / 0.1), 0 12px 14px -10px rgb(0 0 0 / 0.1)',
    '0 35px 40px -9px rgb(0 0 0 / 0.1), 0 14px 16px -12px rgb(0 0 0 / 0.1)',
    '0 40px 45px -10px rgb(0 0 0 / 0.1), 0 16px 18px -14px rgb(0 0 0 / 0.1)',
    '0 45px 50px -11px rgb(0 0 0 / 0.1), 0 18px 20px -16px rgb(0 0 0 / 0.1)',
    '0 50px 55px -12px rgb(0 0 0 / 0.1), 0 20px 22px -18px rgb(0 0 0 / 0.1)',
    '0 55px 60px -13px rgb(0 0 0 / 0.1), 0 22px 24px -20px rgb(0 0 0 / 0.1)',
    '0 60px 65px -14px rgb(0 0 0 / 0.1), 0 24px 26px -22px rgb(0 0 0 / 0.1)',
    '0 65px 70px -15px rgb(0 0 0 / 0.1), 0 26px 28px -24px rgb(0 0 0 / 0.1)',
    '0 70px 75px -16px rgb(0 0 0 / 0.1), 0 28px 30px -26px rgb(0 0 0 / 0.1)',
    '0 75px 80px -17px rgb(0 0 0 / 0.1), 0 30px 32px -28px rgb(0 0 0 / 0.1)',
    '0 80px 85px -18px rgb(0 0 0 / 0.1), 0 32px 34px -30px rgb(0 0 0 / 0.1)',
    '0 85px 90px -19px rgb(0 0 0 / 0.1), 0 34px 36px -32px rgb(0 0 0 / 0.1)',
    '0 90px 95px -20px rgb(0 0 0 / 0.1), 0 36px 38px -34px rgb(0 0 0 / 0.1)',
    '0 95px 100px -21px rgb(0 0 0 / 0.1), 0 38px 40px -36px rgb(0 0 0 / 0.1)',
    '0 100px 105px -22px rgb(0 0 0 / 0.1), 0 40px 42px -38px rgb(0 0 0 / 0.1)',
    '0 105px 110px -23px rgb(0 0 0 / 0.1), 0 42px 44px -40px rgb(0 0 0 / 0.1)',
    '0 110px 115px -24px rgb(0 0 0 / 0.1), 0 44px 46px -42px rgb(0 0 0 / 0.1)',
    '0 115px 120px -25px rgb(0 0 0 / 0.1), 0 46px 48px -44px rgb(0 0 0 / 0.1)',
  ],
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 8,
        padding: '8px 16px',
      },
      contained: {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        },
      },
    },
    MuiCard: {
      root: {
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        borderRadius: 12,
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: 12,
      },
    },
    MuiTextField: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 8,
        },
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: '1px solid #e2e8f0',
      },
      head: {
        fontWeight: 600,
        backgroundColor: '#f8fafc',
      },
    },
    MuiChip: {
      root: {
        borderRadius: 6,
      },
    },
  },
});

export default theme;
