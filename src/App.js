import { Amplify } from 'aws-amplify';
import awsConfig from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function App({ signOut, user }) {
  return (
    <div>
      <h1>Hello, {user.username}</h1>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
}

export default withAuthenticator(App, {
  loginMechanisms: ['email'],
  signUpAttributes: ['email'],
  socialProviders: [], // leave empty if you're not using Google/Facebook/etc
});
