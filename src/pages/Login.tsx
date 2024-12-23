import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Box,
  InputAdornment,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import { Person as PersonIcon, Lock as LockIcon, Visibility, VisibilityOff } from '@material-ui/icons';
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
  registerLink: {
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

const Login: React.FC = () => {
  const classes = useStyles();
  const { login } = useAuth();
  const history = useHistory();
  const mounted = useRef(true);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (name === 'rememberMe') {
      setRememberMe(checked);
    } else {
      setCredentials((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials.username.trim() || !credentials.password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      await login(credentials, rememberMe);
      if (mounted.current) {
        history.replace('/');
      }
    } catch (err: any) {
      if (mounted.current) {
        setError(err.message || 'Login failed. Please check your credentials.');
      }
    } finally {
      if (mounted.current) {
        setLoading(false);
      }
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
            Welcome back
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center" gutterBottom>
            Please sign in to continue
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

            <FormControlLabel
              control={
                <Checkbox 
                  checked={rememberMe} 
                  onChange={handleChange} 
                  name="rememberMe"
                  disabled={loading}
                  color="primary"
                />
              }
              label={
                <Typography variant="body2" color="textSecondary">
                  Remember me
                </Typography>
              }
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
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
          </form>

          <Typography variant="body2" className={classes.registerLink}>
            Don't have an account? <Link to="/register">Sign up</Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
