import {TaskStatus} from "../entity/TaskEntity";
import {isEnum, IsEnum, IsNotEmpty} from "class-validator";

export class TaskDto {

    @IsNotEmpty() private title: string;
    @IsNotEmpty() private description: string;
    @IsEnum(TaskStatus)
    @IsNotEmpty() private status: TaskStatus = TaskStatus.OPEN

    constructor(title: string,description: string,status?: TaskStatus) {
        this.title = title;
        this.description = description;
        this.status = status;
    }
}