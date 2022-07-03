import {TaskStatus} from "../entity/TaskEntity";

export class TaskDto {
    constructor(public title: string, public description: string, public status: TaskStatus) {}
}