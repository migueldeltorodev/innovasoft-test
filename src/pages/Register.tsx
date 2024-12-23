import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Box,
  InputAdornment,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import {
  Person as PersonIcon,
  Lock as LockIcon,
  Email as EmailIcon,
  Visibility,
  VisibilityOff,
} from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
    background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
  },
  card: {
    maxWidth: 400,
    width: '100%',
    padding: theme.spacing(3),
  },
  logo: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
  },
  logoText: {
    color: theme.palette.primary.main,
    fontWeight: 600,
    fontSize: '1.75rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2.5),
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#ffffff',
    },
  },
  submitButton: {
    marginTop: theme.spacing(1),
    height: 42,
  },
  loginLink: {
    textAlign: 'center',
    marginTop: theme.spacing(2),
    '& a': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      fontWeight: 500,
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
}));

const Register: React.FC = () => {
  const classes = useStyles();
  const { register } = useAuth();
  const history = useHistory();
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!credentials.username.trim()) {
      setError('Username is required');
      return false;
    }
    if (!credentials.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!credentials.password.trim()) {
      setError('Password is required');
      return false;
    }
    if (credentials.password !== credentials.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      await register({
        username: credentials.username,
        email: credentials.email,
        password: credentials.password,
      });
      history.push('/login');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Box className={classes.logo}>
            <Typography className={classes.logoText}>
              InnovaSoft
            </Typography>
          </Box>

          <Typography variant="h4" gutterBottom align="center">
            Create Account
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center" gutterBottom>
            Sign up to get started
          </Typography>

          <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
              className={classes.textField}
              label="Username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              error={!!error}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              className={classes.textField}
              label="Email"
              name="email"
              type="email"
              value={credentials.email}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              error={!!error}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              className={classes.textField}
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={credentials.password}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              error={!!error}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              className={classes.textField}
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={credentials.confirmPassword}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              error={!!error}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {error && (
              <Typography 
                color="error" 
                variant="body2" 
                align="center"
              >
                {error}
              </Typography>
            )}

            <Button 
              className={classes.submitButton}
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth 
              disabled={loading}
              size="large"
            >
              {loading ? <CircularProgress size={24} /> : 'Sign Up'}
            </Button>
          </form>

          <Typography variant="body2" className={classes.loginLink}>
            Already have an account? <Link to="/login">Sign in</Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
