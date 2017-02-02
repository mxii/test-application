import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login.component';

export const LOGIN_ROUTES: Routes = [
    {
        path: '', component: LoginComponent, children: []
    }
];

export const loginRouting = RouterModule.forChild(LOGIN_ROUTES);