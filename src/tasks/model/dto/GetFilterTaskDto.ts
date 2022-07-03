import {TaskStatus} from "../entity/TaskEntity";
import {IsEnum, IsOptional, IsString} from "class-validator";

export class GetFilterTaskDto {
    @IsOptional() @IsEnum(TaskStatus) status?: TaskStatus
    @IsOptional() @IsString() search?: string

    constructor(status?: TaskStatus,search? : string) {
        this.status = status;
        this.search = search
    }
}