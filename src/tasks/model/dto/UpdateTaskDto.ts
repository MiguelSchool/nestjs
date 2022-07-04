import {TaskDto} from "./TaskDto";
import {TaskStatus} from "../Task";
import {IsEnum} from "class-validator";

export class UpdateTaskDto{
    @IsEnum(TaskStatus)
    status: TaskStatus
}