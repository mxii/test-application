## The Issue

The issue is this:

If you login with facebook after you have navigated to the site for the first time it'll work and auth.facebook.uid will be available, if then you immediatly logout and log back in with facebook auth.facebook.uid is no longer available, Inside login.service I have the following if statement

 if (auth.facebook.uid == null) return;
 
 This is a hack from my end to make sure the graph doesn't get called if the particular variable is not null.
 
 I need to get this working not just for facebook login, but also Google login and email and password
 
So having the auth subscribe in both locations I don't think is a clean approach.

# TestApplication

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.21.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.



