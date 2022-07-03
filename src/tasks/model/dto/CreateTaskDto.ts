import {IsNotEmpty} from "class-validator";

export class CreateTaskDto {

    @IsNotEmpty() private title: string
    @IsNotEmpty() private description: string

    constructor(private _title: string, private _description: string) {
        this.title = _title;
        this.description = _description
    }
}

// validation: class-validator:
// npm i class-validator
// npm i class-transformer