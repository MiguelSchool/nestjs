import {IsNotEmpty} from "class-validator";

export class CreateTaskDto {

    @IsNotEmpty() private title: string
    @IsNotEmpty() private description: string

    constructor(title: string, description: string) {
        this.title = title;
        this.description = description
    }
}

// validation: class-validator:
// npm i class-validator
// npm i class-transformer