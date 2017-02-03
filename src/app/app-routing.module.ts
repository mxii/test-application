import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
//import { LoginComponent } from './login/login.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', component: HomeComponent},
            { path: 'login', loadChildren: "app/login/module/login.module#LoginModule"},
            //{ path: 'login', component: LoginComponent},

            
        ])
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }