import {Task, TaskStatus} from "../Task";
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class TaskEntity extends BaseEntity implements Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;
}