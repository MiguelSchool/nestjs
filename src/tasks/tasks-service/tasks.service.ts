import {Injectable, NotFoundException} from '@nestjs/common';
import {TaskEntity, TaskStatus} from "../model/entity/TaskEntity";
import {CreateTaskDto} from "../model/dto/CreateTaskDto";
import {taskDtoToEntity, taskEntityToCreateDto} from "../mapper/TaskMapper";
import {GetFilterTaskDto} from "../model/dto/GetFilterTaskDto";
import {IsEnum} from "class-validator";

@Injectable()
export class TasksService {

    // AUTO GENERATION ID : install uuid package npm install uuid
    private tasks : TaskEntity[] = []

    saveTask( task : TaskEntity ) : TaskEntity {

        this.tasks.push(task)
        return task
    }

    saveAllTasks( tasks: CreateTaskDto[] ) : TaskEntity[] {
        tasks.forEach(dto => this.tasks.push(taskDtoToEntity(dto)))
        return this.tasks
    }

    getTask( id : string ) : TaskEntity {
        const temp = this.tasks.find(task => task.id === id)
        if(!temp) throw new NotFoundException()
        else return temp
    }

    getAllTasks() : TaskEntity[] {
        return this.tasks
    }

    removeTask(id: string) : void {
        this.getTask(id)
        this.tasks = this.tasks.filter(entity => entity.id !== id)
    }


    updateTaskStatus(id: string, status : TaskStatus) : TaskEntity {
        const entity: TaskEntity = this.getTask(id)
        const index = this.tasks.indexOf(entity)
        const upgradedEntity: TaskEntity = {
            ...entity,
            status: status
        }
        this.tasks[index] = upgradedEntity
        return upgradedEntity
    }

    getFilteredTask(filterTask: GetFilterTaskDto) : TaskEntity[] {
        const {status, search } = filterTask;

        if(status) {
            return this.tasks.filter(entity => entity.status === status)
                             .map(entity =>entity)
        }
        if(search) {
            return this.tasks.filter(entity =>
                entity.title.trim().toLocaleLowerCase() === search.trim().toLocaleLowerCase()
                || entity.description.trim().toLocaleLowerCase() === search.trim().toLocaleLowerCase())
        }
        return [];
    }
}
