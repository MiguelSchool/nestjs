import {Injectable} from '@nestjs/common';
import {TaskEntity, TaskStatus} from "../model/entity/TaskEntity";
import {CreateTaskDto} from "../model/dto/CreateTaskDto";
import {taskDtoToEntity, taskEntityToCreateDto, taskEntityToTaskDto, taskEntityToUpdateDto} from "../mapper/TaskMapper";
import {GetFilterTaskDto} from "../model/dto/GetFilterTaskDto";
import {UpdateTaskDto} from "../model/dto/UpdateTaskDto";
import {TaskDto} from "../model/dto/TaskDto";
@Injectable()
export class TasksService {

    // AUTO GENERATION ID : install uuid package npm install uuid
    private tasks : TaskEntity[] = []

    saveTask( task : TaskEntity ) : TaskEntity {

        this.tasks.push(task)
        return task
    }

    saveAllTasks( tasks: CreateTaskDto[] ) : CreateTaskDto[] {
        tasks.forEach(dto => this.tasks.push(taskDtoToEntity(dto)))
        return this.tasks.map(entity => taskEntityToCreateDto(entity))
    }

    getTask( id : string ) : CreateTaskDto {
        const entity = this.tasks.find(task => task.id === id)
        return taskEntityToCreateDto(entity)
    }

    getAllTasks() : TaskDto[] {
       const temp = this.tasks.map(entity => taskEntityToTaskDto(entity))
        console.log('getTasks',temp)
        return temp
    }

    removeTask(id: string) : void {
        this.tasks = this.tasks.filter(entity => entity.id !== id)
    }

    updateTaskStatus(id: string, status : TaskStatus) : UpdateTaskDto {
        const entity: TaskEntity = this.tasks.find(task => task.id === id)
        const index = this.tasks.indexOf(entity)
        console.log('entity update',entity)
        const upgradedEntity: TaskEntity = {
            id: entity.id,
            title: entity.title,
            description: entity.description,
            status: status
        }
        console.log('look',upgradedEntity)
        this.tasks[index] = upgradedEntity
        console.log('look2',this.tasks)
        console.log(taskEntityToUpdateDto(upgradedEntity))
        return taskEntityToUpdateDto(upgradedEntity)
    }

    getFilteredTask(filterTask: GetFilterTaskDto) : TaskDto[] {
        const {status, search } = filterTask;

        if(status) {
            return this.tasks.filter(entity => entity.status === status)
                             .map(entity => taskEntityToTaskDto(entity))
        }
        if(search) {
            return this.tasks.filter(entity => entity.title.trim().toLocaleLowerCase() === search.trim().toLocaleLowerCase()
                                    || entity.description.trim().toLocaleLowerCase() === search.trim().toLocaleLowerCase())
                             .map(entity => taskEntityToTaskDto(entity))
        }
        return [];
    }
}
