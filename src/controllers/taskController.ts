import { Task } from "../models/Task";
// import { SalesOpportunity } from '../models/SalesOpportunity';

export default class TaskController {
  addTask = async (reqObj: Task): Promise<Task> => {
    const task: Task = await Task.create({ ...reqObj });
    return task;
  };

  getTask = async (id: string): Promise<Task | null> => {
    const task: Task | null = await Task.findOne({ where: { id } }); // findByPk
    return task;
  };

  getTasks = async (): Promise<Task[]> => {
    const tasks: Task[] = await Task.findAll();
    return tasks;
  };

  updateTask = async (id: string, reqObj: Task): Promise<Task | null> => {
    await Task.update({ ...reqObj }, { where: { id } });
    const updatedTask: Task | null = await Task.findByPk(id);
    return updatedTask;
  };
}
