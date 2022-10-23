import "reflect-metadata";
import "express-async-errors";
import express from "express";
import errorsMiddleware from "./middlewares/errors.middleware";
import usersRoutes from "./routers/users.routes";
import loginRoutes from "./routers/login.routes";
import categoriesRoutes from "./routers/categories.routes";
import propertiesRoutes from "./routers/properties.routes";
import scheduleRoutes from "./routers/schedule.routes";

const app = express();
app.use(express.json());
app.use("/users", usersRoutes);
app.use("/login", loginRoutes);
app.use("/categories", categoriesRoutes);
app.use("/properties", propertiesRoutes);
app.use("/schedules", scheduleRoutes);

app.use(errorsMiddleware);

export default app;
