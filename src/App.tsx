import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from "./theme/theme";
import { AuthProvider } from './contexts/AuthContext';
import Routes from './routes/index';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;