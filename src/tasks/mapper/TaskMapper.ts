import {Task} from "../model/Task";
import {CreateTaskDto} from "../model/dto/CreateTaskDto";
import {randomUUID} from "crypto";
import {TaskDto} from "../model/dto/TaskDto";


//entities to dtos
export const taskEntityToCreateDto : (TaskEntity) => CreateTaskDto = (entity) => new CreateTaskDto(entity.title, entity.description)

export const taskEntityToTaskDto : (TaskEntity) => TaskDto = (entity) =>
    new TaskDto(entity.title,entity.description, entity.status)

// dtos to entities
export const taskDtoToEntity : (TaskDto) => Task = (dto) => {
    dto.id = randomUUID()
    console.log('id: ',dto.id)
    return { title: dto.title, description: dto.description }
}