import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './login/service/login.service';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent {
   
   constructor(private _loginService: LoginService, private _router: Router) { }

   ngOnInit() {
      this._loginService.isLoggedIn.subscribe(isLoggedIn => {
         // navigate to another page ?!

         console.log('login state changed', isLoggedIn);

         if (isLoggedIn) this._router.navigateByUrl('/');
         else this._router.navigateByUrl('/login');
      });
   }
}
