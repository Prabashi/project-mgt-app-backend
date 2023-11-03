import express, { Request, Response } from 'express';
import { Project } from '../models/Project';
import ProjectController from '../controllers/projectController';

const projectRouter = express.Router();
const projectController = new ProjectController();

projectRouter.route("/")
.post( async (req: Request, res: Response): Promise<Response> => {
    const projectObj: Project = req.body;
    console.log(projectObj);
    const project = await projectController.addProject(projectObj).catch(err => console.error(err));
    return res.status(201).json(project);
})
.get(async (req: Request, res: Response): Promise<Response> => {
    const projects = await projectController.getProjects().catch(err => console.error(err));
    return res.status(200).json(projects);
})

projectRouter.route("/:id")
.get(async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const project = await projectController.getProject(id).catch(err => console.error(err));
    return res.status(200).json(project);
})
.patch(async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const projectObj: Project = req.body;

    const project = await projectController.updateProject(id, projectObj).catch(err => console.error(err));
    return res.status(200).json(project);
})


export default projectRouter;