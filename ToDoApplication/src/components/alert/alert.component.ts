import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../service/alert.service';

@Component({
    moduleId: module.id,
    // tslint:disable-next-line:component-selector
    selector: 'alert-component',
    templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit{
    message: any;

    constructor (private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }
}
