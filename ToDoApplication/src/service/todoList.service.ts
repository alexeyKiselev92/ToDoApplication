import { ToDo } from '../types/todo';
import { IToDoList } from '../interfaces/todoList.interface';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

class CRUDToDoList implements IToDoList {

    constructor(private http: Http) {}

    getToDoList(): Observable<ToDo[]> {
        return this.http.get('assets/data/todos.json').map((res: Response) => res.json());
    }
    addToDo(task: ToDo): Observable<ToDo[]> {
        // tslint:disable-next-line:prefer-const
        let headers = new Headers({'Content-Type': 'application/json'});
        // tslint:disable-next-line:prefer-const
        let options = new RequestOptions({headers: headers});
        return this.http.post('assets/data/todos.json', task, options).map((res: Response) => res.json());
    }
    editToDo(task: ToDo): Observable<ToDo[]> {
        // tslint:disable-next-line:prefer-const
        let headers = new Headers({'Content-Type': 'application/json'});
        // tslint:disable-next-line:prefer-const
        let options = new RequestOptions({headers: headers});
        return this.http.put('assets/data/todos.json', task, options).map((res: Response) => res.json());
    }
    deleteToDo(task: ToDo): Observable<ToDo[]> {
        // tslint:disable-next-line:prefer-const
        let headers = new Headers({'Content-Type': 'application/json'});
        // tslint:disable-next-line:prefer-const
        let options = new RequestOptions({headers: headers, body: task});
        return this.http.delete('assets/data/todos.json', options).map((res: Response) => res.json());
    }

}