import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User } from '../types/user';


@Injectable()
export class UserService {

    constructor(private http: Http) { }

    getAll() {
        return this.http.get('/api/users', this.requestHelperMethod()).map((res: Response) => res.json());
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id, this.requestHelperMethod()).map((res: Response) => res.json());
    }

    create(user: User) {
        return this.http.post('/api/users', user, this.requestHelperMethod()).map((res: Response) => res.json());
    }

    update(user: User) {
        return this.http.get('/api/users/' + user.id, this.requestHelperMethod()).map((res: Response) => res.json());
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id, this.requestHelperMethod()).map((res: Response) => res.json());
    }

    private requestHelperMethod() {
        // tslint:disable-next-line:prefer-const
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            // tslint:disable-next-line:prefer-const
            let headers = new Headers({'Authorization': currentUser.token });
            return new RequestOptions({ headers: headers});
        }
    }
}