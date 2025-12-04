import express, { NextFunction, Request, Response } from "express";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { todoRoutes } from "./modules/todo/todo.routes";



const app = express();
const port = config.port;

// parser
app.use(express.json());
// app.use(express.urlencoded());

// Initializing DataBase--------------------------------
initDB();


// "/"-> localhost:5000/
app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello World!");
});



// users CRUD ---------------------------------------------------------------------------
app.use("/users",userRoutes)


// todos CRUD operation---------------------------------------------------------------------
app.use('/todos',todoRoutes)



app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
