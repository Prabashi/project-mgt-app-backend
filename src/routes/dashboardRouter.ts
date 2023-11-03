import express, { Request, Response } from "express";
import { Dashboard } from "../models/Dashboard";
import DashboardController from "../controllers/dashboardController";

const dashboardRouter = express.Router();
const dashboardController = new DashboardController();

dashboardRouter
  .route("/")
  .post(async (req: Request, res: Response): Promise<Response> => {
    const dashboardObj: Dashboard = req.body;
    console.log(dashboardObj);
    const dashboard = await dashboardController
      .addDashboard(dashboardObj)
      .catch((err) => console.error(err));
    return res.status(201).json(dashboard);
  })
  .get(async (req: Request, res: Response): Promise<Response> => {
    const tasks = await dashboardController
      .getDashboards()
      .catch((err) => console.error(err));
    return res.status(200).json(tasks);
  });

dashboardRouter
  .route("/:id")
  .get(async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const dashboard = await dashboardController
      .getDashboard(id)
      .catch((err) => console.error(err));
    return res.status(200).json(dashboard);
  })
  .patch(async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const dashboardObj: Dashboard = req.body;

    const dashboard = await dashboardController
      .updateDashboard(id, dashboardObj)
      .catch((err) => console.error(err));
    return res.status(200).json(dashboard);
  });

export default dashboardRouter;
