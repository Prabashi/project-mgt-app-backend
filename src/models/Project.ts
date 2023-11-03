import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";

@Table({
  tableName: "projects",
})
export class Project extends Model {
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

  // @Column({
  //     type: DataType.STRING,
  //     allowNull: true,
  // })
  // userIds!: string[];
}
