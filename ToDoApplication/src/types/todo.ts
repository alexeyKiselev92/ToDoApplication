export class ToDo {
    id: number;
    // tslint:disable-next-line:no-inferrable-types
    title: string = '';
    // tslint:disable-next-line:no-inferrable-types
    isCompleted: boolean = false;
    userId: number;
    description: string;

    constructor(values: Object = {}){
        Object.assign(this, values);
    }
}