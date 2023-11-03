import {
  Table,
  Model,
  Column,
  BelongsTo,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import { Dashboard } from "./Dashboard";
import { Project } from "./Project";
// import { SalesOpportunity } from "./SalesOpportunity";

export enum Status {
  TODO = "TODO",
  IN_PROGRESS = "IN PROGRESS",
  IN_QA = "IN QA",
  DONE = "DONE",
}

export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  HIGHEST = "HIGHEST",
}

@Table({
  tableName: "tasks",
})

// TODO: Add createdBy, createdAt, lastUpdatedBy, lastUpdatedAt
export class Task extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status!: Status;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  priority!: Priority;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  assigneeId!: number;

  @ForeignKey(() => Project)
  @Column({
    type: DataType.INTEGER,
    allowNull: false, // TODO: false
  })
  projectId!: number;

  @BelongsTo(() => Project)
  project!: Project;

  @ForeignKey(() => Dashboard)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  dashboardId!: number;

  @BelongsTo(() => Dashboard)
  dashboard!: Dashboard;
}
