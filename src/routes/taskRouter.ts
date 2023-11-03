import express, { Request, Response } from "express";
import { Task } from "../models/Task";
import TaskController from "../controllers/taskController";

const taskRouter = express.Router();
const taskController = new TaskController();

taskRouter
  .route("/")
  .post(async (req: Request, res: Response): Promise<Response> => {
    const taskObj: Task = req.body;
    console.log(taskObj);
    const task = await taskController
      .addTask(taskObj)
      .catch((err) => console.error(err));
    return res.status(201).json(task);
  })
  .get(async (req: Request, res: Response): Promise<Response> => {
    const tasks = await taskController
      .getTasks()
      .catch((err) => console.error(err));
    return res.status(200).json(tasks);
  });

taskRouter
  .route("/:id")
  .get(async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const task = await taskController
      .getTask(id)
      .catch((err) => console.error(err));
    return res.status(200).json(task);
  })
  .patch(async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const taskObj: Task = req.body;

    const task = await taskController
      .updateTask(id, taskObj)
      .catch((err) => console.error(err));
    return res.status(200).json(task);
  });

export default taskRouter;
