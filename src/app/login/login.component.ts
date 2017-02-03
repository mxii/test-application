import { LoginService } from './service/login.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Http } from '@angular/http';

@Component({
   selector: 'login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

   constructor(private af: AngularFire, private http: Http, private service: LoginService) { }

   ngOnInit() {

   }

   ngOnDestroy() {
      console.log("destroy");
   }

   loginFacebook() {
      this.service.loginWithFacebook();
   }

   loginGoogle() {

   }

}