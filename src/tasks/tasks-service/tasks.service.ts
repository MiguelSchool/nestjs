import {Injectable, NotFoundException} from '@nestjs/common';
import {Task, TaskStatus} from "../model/Task";
import {CreateTaskDto} from "../model/dto/CreateTaskDto";
import {taskDtoToEntity, taskEntityToCreateDto} from "../mapper/TaskMapper";
import {GetFilterTaskDto} from "../model/dto/GetFilterTaskDto";
import {IsEnum} from "class-validator";

@Injectable()
export class TasksService {

    // AUTO GENERATION ID : install uuid package npm install uuid
    private tasks : Task[] = []

    saveTask( task : Task ) : Task {

        this.tasks.push(task)
        return task
    }

    saveAllTasks( tasks: CreateTaskDto[] ) : Task[] {
        tasks.forEach(dto => this.tasks.push(taskDtoToEntity(dto)))
        return this.tasks
    }

    getTask( id : string ) : Task {
        const temp = this.tasks.find(task => task.id === id)
        if(!temp) throw new NotFoundException()
        else return temp
    }

    getAllTasks() : Task[] {
        return this.tasks
    }

    removeTask(id: string) : void {
        this.getTask(id)
        this.tasks = this.tasks.filter(entity => entity.id !== id)
    }


    updateTaskStatus(id: string, status : TaskStatus) : Task {
        const entity: Task = this.getTask(id)
        const index = this.tasks.indexOf(entity)
        const upgradedEntity: Task = {
            ...entity,
            status: status
        }
        this.tasks[index] = upgradedEntity
        return upgradedEntity
    }

    getFilteredTask(filterTask: GetFilterTaskDto) : Task[] {
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
