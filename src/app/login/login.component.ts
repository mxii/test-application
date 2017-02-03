import { LoginService } from './service/login.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { AngularFire } from 'angularfire2';

@Component({
   selector: 'login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   constructor(private af: AngularFire, private service: LoginService) { }

   ngOnInit() { }

   ngOnDestroy() {
      console.log("destroy");
   }

   loginFacebook() {
      this.service.loginWithFacebook();
   }

   loginGoogle() {

   }

}