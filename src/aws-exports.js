const awsConfig = {
    Auth: {
      region: 'us-west-2',
      userPoolId: 'us-west-2_5PeQoSiZR',
      userPoolWebClientId: '7qrh4c75pbbkg2ghths1i15v1i',
      oauth: {
        domain: 'us-west-25peqosizr.auth.us-west-2.amazoncognito.com', // no https://
        scope: ['email', 'profile', 'openid'],
        redirectSignIn: 'http://localhost:3000/',
        redirectSignOut: 'http://localhost:3000/',
        responseType: 'code' // REQUIRED for Authorization Code Grant
      }
    }
  };
  
  export default awsConfig;
  