
import { ToDo } from '../types/todo';
import { Observable } from 'rxjs/Observable';

export interface IToDoList {
    getToDoList(): Observable<ToDo[]>;
    addToDo(task: ToDo): Observable<ToDo[]>;
    editToDo(task: ToDo): Observable<ToDo[]>;
    deleteToDo(task: ToDo): Observable<ToDo[]>;
}
