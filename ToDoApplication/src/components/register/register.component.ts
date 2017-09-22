import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../service/alert.service';
import { UserService } from '../../service/users.service';

@Component({
    moduleId: module.id,
    templateUrl: './register.component.html',
    // tslint:disable-next-line:component-selector
    selector: 'register-component'
})
export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(private router: Router,
                private alertService: AlertService,
                private userService: UserService) {

    }

    register() {
        this.loading = true;
        this.userService.create(this.model).subscribe(data => {
            this.alertService.success('Registration successful', true);
            this.router.navigate(['/login']);
        },
        error => {
            this.alertService.error(error);
            this.loading = false;
        });
    }
}
