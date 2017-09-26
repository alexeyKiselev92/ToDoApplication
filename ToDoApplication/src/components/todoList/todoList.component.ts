import { Component, OnInit } from '@angular/core';
import { IToDoList } from '../../interfaces/todoList.interface';
import { ToDo } from '../../types/todo';

@Component({
    moduleId: module.id,
    templateUrl: './todoList.component.html'
})
export class ToDoListComponent implements OnInit {

    tasks: ToDo[];

    constructor(private crud: IToDoList) {

    }

    addTask(task: ToDo) {
        this.crud.addToDo(task).subscribe(data => this.tasks = data);
    }

    editTask(task: ToDo) {
        this.crud.editToDo(task).subscribe(data => this.tasks = data);
    }

    removeTask(task: ToDo) {
        this.crud.deleteToDo(task).subscribe(data => this.tasks = data);
    }

    getTasks() {
        this.crud.getToDoList().subscribe(data => this.tasks = data);
    }

    ngOnInit() {
        this.getTasks();
    }

    showInfo(task: ToDo) {
        
    }
}
