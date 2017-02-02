import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';



@Component({
    selector: 'nav-bar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

    private isCollapsed: boolean = true;
    private isLoggedIn: boolean = false;
    private displayName: string = null;
    private authSubscription: any;

    constructor(private af: AngularFire) { }

    ngOnInit() {
        this.authSubscription = this.af.auth.subscribe(authState => {

            this.isLoggedIn = authState ? true : false;

            if (this.isLoggedIn) {
                this.af.database.object('/users/' + authState.uid).subscribe(user => {
                    this.displayName = user.first_name;
                });
            }

        })


    }

    logout() {
       this.af.auth.logout();
    }




}