// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    "apiKey": "AIzaSyAy4xhX5TcvLvPCNkmXKwCF6CqbCcN0p0M",
    "databaseURL": "https://hello-hoshymo.firebaseio.com",
    "storageBucket": "hello-hoshymo.appspot.com",
    "authDomain": "hello-hoshymo.firebaseapp.com",
    "messagingSenderId": "346579032531",
    "projectId": "hello-hoshymo"
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
