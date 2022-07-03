import {TaskStatus} from "../entity/TaskEntity";

export class UpdateTaskDto {
    constructor(private title: string, private description: string, private status: TaskStatus) {
    }
}