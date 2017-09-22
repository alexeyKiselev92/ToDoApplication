import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend, RequestOptions } from '@angular/http';
import { MockConnection, MockBackend } from '@angular/http/testing';


export function mockBackEndSimultation(backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) {
    // tslint:disable-next-line:prefer-const
    let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
    backend.connections.subscribe((connection: MockConnection) => {
        setTimeout(() => {

            // authenticate
            if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === RequestMethod.Post) {
                // tslint:disable-next-line:prefer-const
                let params = JSON.parse(connection.request.getBody());
                // tslint:disable-next-line:prefer-const
                let currentUser = users.filter(user => {
                    return user.username === params.username && user.password === params.password;
                });

                if (currentUser.length) {
                    // tslint:disable-next-line:prefer-const
                    let user = currentUser[0];
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body: {
                            id: user.id,
                            username: user.username,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            token: 'fk-tkn-auth'
                        }
                    })));
                } else {
                    connection.mockError(new Error('Username or password is incorrect'));
                }
            }

            // get users
            if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Get) {
                if (connection.request.headers.get('Athorization') === 'fk-tkn-auth') {
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body: users
                    })));
                } else {
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 401
                    })));
                }
            }


            // get user by id
            if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Get) {
                if (connection.request.headers.get('Athorization') === 'fk-tkn-auth') {
                    // tslint:disable-next-line:prefer-const
                    let urlParts = connection.request.url.split('/');
                    // tslint:disable-next-line:prefer-const
                    // tslint:disable-next-line:radix
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    // tslint:disable-next-line:prefer-const
                    let matchedUsers = users.filter(user => user.id === id);
                    // tslint:disable-next-line:prefer-const
                    let user = matchedUsers.length ? matchedUsers[0] : null;
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body: user
                    })));
                } else {
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 401
                    })));
                }
            }


            // create user
            if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Post) {
                // tslint:disable-next-line:prefer-const
                let newUser = JSON.parse(connection.request.getBody());
                // tslint:disable-next-line:prefer-const
                let duplicateUser = users.filter(user => user.username === newUser.username).length;
                if (duplicateUser) {
                    connection.mockError(new Error('User with username "' + newUser.username + '" is already exist'));
                }
                newUser.id = users.length + 1;
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                connection.mockRespond(new Response(new ResponseOptions({
                    status: 200
                })));
            }


            // delete user
            if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Delete) {
                if (connection.request.headers.get('Athorization') === 'fk-tkn-auth') {
                    // tslint:disable-next-line:prefer-const
                    let urlParts = connection.request.url.split('/');
                    // tslint:disable-next-line:radix
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < users.length; i++) {
                        // tslint:disable-next-line:prefer-const
                        let user = users[i];
                        if (user.id === id) {
                            users.splice(i, 1);
                            localStorage.setItem('users', JSON.stringify(users));
                            break;
                        }
                    }

                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200
                    })));
                } else {
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 401
                    })));
                }
            }
        }, 500);
    });

    return new Http(backend, options);
}


export let backendSimulationProvider = {
    provide: Http,
    useFactory: mockBackEndSimultation,
    deps: [MockBackend, BaseRequestOptions, XHRBackend]
};
