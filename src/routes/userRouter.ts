import express from "express";
import { getUser, getUsers } from "../controllers/userController";
import { authorize } from "../middleware/authMiddleware";
import { Roles } from "../constants";

const router = express.Router();

router.get(
  "/:id",
  authorize([Roles.User, Roles.ProjectManager, Roles.Lead, Roles.Admin]),
  getUser
);

router.get("/", authorize([Roles.User]), getUsers);

export default router;
