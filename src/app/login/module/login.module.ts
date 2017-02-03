// Modules
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

// Components
import { LoginComponent } from '../login.component';

// Services
import { LoginService } from '../service/login.service';

//Ng2 Bootstrap
import { AlertModule } from 'ng2-bootstrap/alert';

// Routing
import { loginRouting } from './login-routing';

@NgModule({
   imports: [ // Modules
      ReactiveFormsModule,
      FormsModule,
      loginRouting,
      AlertModule.forRoot(),
   ],
   declarations: [ // Components
      LoginComponent
   ],
   providers: [ // Services
      //LoginService --> moved to app.modul !
   ]
})
export class LoginModule {
   //  static forRoot(): ModuleWithProviders {
   //      return {
   //          ngModule: LoginModule,
   //          providers: [LoginService]
   //      };
   //  }
}