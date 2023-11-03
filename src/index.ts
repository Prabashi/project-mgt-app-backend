import express from "express";
import authRouter from "./routes/authRouter";
import connectUserDB from "./connections/userDB";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter";
import { authenticate } from "./middleware/authMiddleware";
import { errorHandler } from "./middleware/errorMiddleware";
import taskRouter from "./routes/taskRouter";
import projectRouter from "./routes/projectRouter";
import dashboardRouter from "./routes/dashboardRouter";
import connection from "./connections/connection";

dotenv.config();

interface UserBasicInfo {
  _id: string;
  email: string;
  roles: string[];
}

declare global {
  namespace Express {
    interface Request {
      user?: UserBasicInfo | null;
    }
  }
}

const app = express();
const port = process.env.PORT || 8000;
app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());

app.use(bodyParser.json()); // To recognize the req obj as a json obj
app.use(bodyParser.urlencoded({ extended: true })); // To recognize the req obj as strings or arrays. extended true to handle nested objects also

app.use(authRouter);
app.use("/users", authenticate, userRouter);
app.use("/tasks", authenticate, taskRouter);
app.use("/projects", authenticate, projectRouter);
app.use("/dashboards", authenticate, dashboardRouter);

app.use(errorHandler);

const start = async (): Promise<void> => {
  try {
    console.log(`⚡️[server]: Server is trying to initiate db connection`);
    await connection.sync();
    await connectUserDB();
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
