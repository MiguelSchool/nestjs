import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {TasksService} from "../tasks-service/tasks.service";
import {TaskStatus} from "../model/entity/TaskEntity";
import {CreateTaskDto} from "../model/dto/CreateTaskDto";
import {taskDtoToEntity} from "../mapper/TaskMapper";
import {GetFilterTaskDto} from "../model/dto/GetFilterTaskDto";
import {UpdateTaskDto} from "../model/dto/UpdateTaskDto";
import {TaskDto} from "../model/dto/TaskDto";

@Controller('tasks')
export class TasksController {

    constructor(private taskService : TasksService) { }

    @Post()
    saveTask(@Body() task : CreateTaskDto) {
        console.log("body", task)
        return this.taskService.saveTask(taskDtoToEntity(task))
    }

    @Get()
    getAllTasks(@Query()filterTask : GetFilterTaskDto) : TaskDto[] {
        if(Object.keys(filterTask).length) {
            return this.taskService.getFilteredTask(filterTask)
        }else {
            return this.taskService.getAllTasks()
        }
    }

    @Get("/:id")
    getTaskByID(id: string): CreateTaskDto {
        return this.taskService.getTask(id)
    }

    @Delete("/:id")
    removeTaskById(id: string): void {
        this.taskService.removeTask(id)
    }

    @Patch("/:id/status")
    updateTaskStatus(id: string, @Body('status')status: TaskStatus): UpdateTaskDto {
        return this.taskService.updateTaskStatus(id, status)
    }


}
