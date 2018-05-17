// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDuDXFOqC2_x-P6QnjJlVnOXQ-TpvDwCjA',
    authDomain: 'angular-test-b0fcc.firebaseapp.com',
    databaseURL: 'https://angular-test-b0fcc.firebaseio.com',
    projectId: 'angular-test-b0fcc',
    storageBucket: 'angular-test-b0fcc.appspot.com',
    messagingSenderId: '536831083558'
  },
  stripePublishable: 'pk_test_5Z7xPgnvEmmsehTT1AYxvBrt',
  functionsURL: {
    typeAhead: 'https://us-central1-angular-test-b0fcc.cloudfunctions.net/typeAhead',
    api: 'https://us-central1-angular-test-b0fcc.cloudfunctions.net/app',
  },
};
