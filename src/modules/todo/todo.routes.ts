import express from "express"
import { todoControllers } from "./todo.controller";

const router=express.Router();

router.post('/',todoControllers.createTodo)

router.get('/',todoControllers.getTodos)

router.get('/:id',todoControllers.getTodo)

router.get('/:id',todoControllers.updateTodo)

router.get('/:id',todoControllers.deleteTodo)

export const todoRoutes=router;