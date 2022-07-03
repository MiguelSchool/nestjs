import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {TasksService} from "../tasks-service/tasks.service";
import {TaskStatus} from "../model/entity/TaskEntity";
import {CreateTaskDto} from "../model/dto/CreateTaskDto";
import {taskDtoToEntity, taskEntityToCreateDto, taskEntityToTaskDto} from "../mapper/TaskMapper";
import {GetFilterTaskDto} from "../model/dto/GetFilterTaskDto";
import {TaskDto} from "../model/dto/TaskDto";
import {UpdateTaskDto} from "../model/dto/UpdateTaskDto";

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
                                   .map(entity =>  taskEntityToTaskDto(entity))
        }else {
            return this.taskService.getAllTasks()
                                   .map(entity => taskEntityToTaskDto(entity))
        }
    }

    @Get("/:id")
    getTaskByID(id: string): CreateTaskDto {
        return taskEntityToCreateDto(this.taskService.getTask(id))
    }

    @Delete("/:id")
    removeTaskById(id: string): void {
        this.taskService.removeTask(id)
    }

    @Patch("/:id/status")
    updateTaskStatus(id: string, @Body() updateTaskStatus: UpdateTaskDto): TaskDto {
        const { status } = updateTaskStatus
        return taskEntityToTaskDto(this.taskService.updateTaskStatus(id, status))
    }


}
