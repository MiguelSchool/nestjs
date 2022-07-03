import {TaskDto} from "./TaskDto";
import {TaskStatus} from "../entity/TaskEntity";
import {IsEnum} from "class-validator";

export class UpdateTaskDto{
    @IsEnum(TaskStatus)
    status: TaskStatus
}