import { Dashboard } from '../models/Dashboard';

export default class DashboardController {
    addDashboard = async (reqObj: Dashboard): Promise<Dashboard> => {
        const dashboard: Dashboard = await Dashboard.create({...reqObj})
        return dashboard
    }

    getDashboard = async (id: string): Promise<Dashboard | null> => {
        const dashboard: Dashboard | null = await Dashboard.findOne({where: {id}}) // findByPk
        return dashboard
    }

    getDashboards = async (): Promise<Dashboard[]> => {
        const dashboards: Dashboard[] = await Dashboard.findAll()
        return dashboards
    }

    updateDashboard = async (id: string, reqObj: Dashboard): Promise<Dashboard | null> => {
        await Dashboard.update({ ...reqObj }, { where: { id } });
        const updatedDashboard: Dashboard | null = await Dashboard.findByPk(id);
        return updatedDashboard;
    }
}