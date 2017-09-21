import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

    constructor(private http: Http) {

    }

    login(username: string, password: string) {
        return this.http.post('api/authenticate-fake', JSON.stringify({username: username, password: password}))
        .map((res: Response) => {
            // tslint:disable-next-line:prefer-const
            let user = res.json();
            if (user && user.token) {
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
        });
    }


    logout() {
        localStorage.removeItem('currentUser');
    }
}
