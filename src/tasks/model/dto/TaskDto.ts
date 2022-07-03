import {TaskStatus} from "../entity/TaskEntity";
import {IsNotEmpty} from "class-validator";

export class TaskDto {

    @IsNotEmpty() private title: string;
    @IsNotEmpty() private description: string;
    @IsNotEmpty() private status: TaskStatus = TaskStatus.OPEN

    constructor(public _title: string, public _description: string, public _status?: TaskStatus) {
        this.title = _title;
        this.description = _description;
        this._status = _status
    }
}