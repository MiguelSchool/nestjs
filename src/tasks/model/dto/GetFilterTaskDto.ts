import {TaskStatus} from "../entity/TaskEntity";

export class GetFilterTaskDto {
    constructor(public status?: TaskStatus, public search? : string) { }
}