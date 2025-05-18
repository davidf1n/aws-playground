import { Amplify, Auth } from 'aws-amplify';
import awsConfig from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';

Amplify.configure({
  ...awsConfig,
  oauth: {
    ...awsConfig.oauth,
    redirectSignIn: 'http://localhost:3000/dashboard',
    redirectSignOut: 'http://localhost:3000/',
  },
});
function App({ signOut, user }) {
  return (
    <Router>
      <Routes>
        <Route
          path="/dashboard"
          element={user ? <Dashboard signOut={signOut} user={user} /> : <Navigate to="/" />}
        />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default withAuthenticator(App, {
  loginMechanisms: ['email'],
  signUpAttributes: ['email'],
  socialProviders: [],
  signUpConfig: {
    header: 'Create Account',
    hideAllDefaults: true,
    defaultCountryCode: '1',
  },
});