import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
                private router: Router) {

    }

    ngOnInit() {

    }
}
