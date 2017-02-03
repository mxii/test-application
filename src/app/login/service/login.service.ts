import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, } from 'angularfire2';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscription, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';


@Injectable()
export class LoginService {

   public isLoggedIn = new BehaviorSubject<boolean>(false);
   private _authSubscription: Subscription;
   private _fbAccessToken = '';

   constructor(private af: AngularFire, private http: Http) {

      if (!this._fbAccessToken) {
         this._fbAccessToken = localStorage.getItem('fat');
      }

      this._authSubscription = this.af.auth.subscribe(auth => {
         if (!auth) {
            this.isLoggedIn.next(false);
            return;
         }

         this.isLoggedIn.next(true);

         if (auth.facebook) {
            // WE ARE LOGGED IN VIA FACEBOOK .. !!

            let timeout = this._fbAccessToken ? 0 : 1000;
            setTimeout(() => {
               let url = `https://graph.facebook.com/v2.8/${auth.facebook.uid}?fields=first_name,last_name,gender,email&access_token=${this._fbAccessToken}`;

               this.http.get(url).subscribe(response => {
                  let user = response.json()
                  console.log(user);

                  // update infos everytime.. maybe something changed.. !
                  this.af.database.object('/users/' + auth.uid).update({
                     first_name: user.first_name,
                     last_name: user.last_name,
                     display_name: auth.facebook.displayName,
                     gender: user.gender,
                     email_address: auth.facebook.email,
                     accessToken: this._fbAccessToken,
                     facebook_Id: auth.facebook.uid,
                  })
               },
                  err => console.log(err)
               );
            }, timeout);
         }
         else if (auth.google) {
            // TODO: implement google infos !!
            // ...
         }
      });
   }

   loginWithFacebook() {
      this.af.auth.login({
         provider: AuthProviders.Facebook,
         method: AuthMethods.Popup,
         scope: ['public_profile']
      }).then(auth => {
         this._fbAccessToken = auth.facebook.accessToken;
         console.log('fat', this._fbAccessToken);
         localStorage.setItem('fat', this._fbAccessToken);
      });
   }

   loginWithGoogle() {

   }

   logout() {
      this.af.auth.logout();
   }

   ngOnDestroy() {
      if (this._authSubscription) {
         this._authSubscription.unsubscribe();
      }
   }
}
