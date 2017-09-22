import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { AlertService } from '../../service/alert.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    moduleId: module.id
})
export class LoginComponent implements OnInit {

    model: any = {};
    returnedUrl: string;
    // tslint:disable-next-line:no-inferrable-types
    loading: boolean = false;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private authenticationService: AuthenticationService,
                private alertService: AlertService) {

    }

    ngOnInit() {
        this.authenticationService.logout();
        this.returnedUrl = this.route.snapshot.queryParams['returnedUrl'] || '/';
    }

    login(){
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(data => {
                this.router.navigate([this.returnedUrl]);
            },
            error =>{
                this.alertService.error(error);
                this.loading = false;
            });
             
    }
}
