import { Project } from "../models/Project";

export default class ProjectController {
  addProject = async (reqObj: Project): Promise<Project> => {
    const project: Project = await Project.create({ ...reqObj });
    return project;
  };

  getProject = async (id: string): Promise<Project | null> => {
    const project: Project | null = await Project.findOne({ where: { id } }); // findByPk
    return project;
  };

  getProjects = async (): Promise<Project[]> => {
    const projects: Project[] = await Project.findAll();
    return projects;
  };

  updateProject = async (
    id: string,
    reqObj: Project
  ): Promise<Project | null> => {
    await Project.update({ ...reqObj }, { where: { id } });
    const updatedProject: Project | null = await Project.findByPk(id);
    return updatedProject;
  };
}
