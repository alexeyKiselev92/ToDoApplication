import { Component, OnInit } from '@angular/core';
import { IToDoList } from '../../interfaces/todoList.interface';
import { ToDo } from '../../types/todo';

@Component({
    moduleId: module.id,
    templateUrl: './todoList.component.html'
})
export class ToDoListComponent implements OnInit {

    tasks: ToDo[];
    // tslint:disable-next-line:no-inferrable-types
    isEditing: boolean = false;

    constructor(private crud: IToDoList) {

    }

    addTask(task: ToDo) {
        this.isEditing = true;
        this.crud.addToDo(task).subscribe(data => this.tasks = data);
        this.isEditing = false;
    }

    editTask(task: ToDo) {
        this.isEditing = true;
        this.crud.editToDo(task).subscribe(data => this.tasks = data);
        this.isEditing = false;
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
