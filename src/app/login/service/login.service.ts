import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, } from 'angularfire2';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';


@Injectable()
export class LoginService {

    private success: boolean = true;
    private _authSubscription: any;

    constructor(private af: AngularFire, private http: Http) {}

    loginWithFacebook(): FirebaseListObservable<string> {

        return FirebaseListObservable.create(obs => {
            this.af.auth.login({
                provider: AuthProviders.Facebook,
                method: AuthMethods.Popup,
                scope: ['public_profile']
            }).then((authState: any) => {

                   let authSubscription = this.af.auth.subscribe(auth => {

                       console.log('before check');

                       // below line is a hack, if the user logs in for the first time after navigating to the website it works
                       // If the user then logs out then logs straight back in this auth.facebook.uid is null which causes the Graph to fail
                        if (auth.facebook.uid == null) return;

                        console.log('Passed check');
                       
                        let url = `https://graph.facebook.com/v2.8/${auth.facebook.uid}?fields=first_name,last_name,gender,email&access_token=${authState.facebook.accessToken}`;

                        this.http.get(url).subscribe(response => {
                            let user = response.json()

                            this.af.database.object('/users/' + authState.uid).update({
                                first_name: user.first_name,
                                last_name: user.last_name,
                                display_name: auth.facebook.displayName,
                                gender: user.gender,
                                email_address: auth.facebook.email,
                                accessToken: authState.facebook.accessToken,
                                facebook_Id: auth.facebook.uid,
                            })
                        },
                            err => {
                                obs.next(false);
                            });

                    });

                authSubscription.unsubscribe();

                obs.next(true);

            }).catch(err => {
                obs.next(false);
            });
        });

    }

    logout() {
        this.af.auth.logout();
    }



}