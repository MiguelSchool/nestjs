import {TaskEntity} from "../model/entity/TaskEntity";
import {CreateTaskDto} from "../model/dto/CreateTaskDto";
import {randomUUID} from "crypto";
import {UpdateTaskDto} from "../model/dto/UpdateTaskDto";
import {TaskDto} from "../model/dto/TaskDto";


//entities to dtos
export const taskEntityToCreateDto : (TaskEntity) => CreateTaskDto = (entity) => new CreateTaskDto(entity.title, entity.description)

export const taskEntityToUpdateDto : (TaskEntity) => UpdateTaskDto = (entity) =>
    new UpdateTaskDto(entity.title,entity.description, entity.status)

export const taskEntityToTaskDto : (TaskEntity) => TaskDto = (entity) =>
    new TaskDto(entity.title,entity.description, entity.status)

// dtos to entities
export const taskDtoToEntity : (TaskDto) => TaskEntity = (dto) => {
    dto.id = randomUUID()
    console.log('id: ',dto.id)
    return { title: dto.title, description: dto.description }
}