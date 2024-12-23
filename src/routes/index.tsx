import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import MainLayout from '../layouts/MainLayout';
import ErrorPage from '../pages/ErrorPage';
import ProtectedRoute from '../components/ProtectedRoutes';
import Home from '../pages/Home';
import ClientManagement from '../pages/ClientManagement';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <MainLayout>
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute path="/clients" component={ClientManagement} />
          <Route component={ErrorPage} />
        </Switch>
      </MainLayout>
    </Switch>
  );
};

export default Routes;
