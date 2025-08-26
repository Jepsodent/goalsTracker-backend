import express from "express";
import { createGoals, deleteGoal, getDetailGoals, getGoals, updateGoal } from "../controllers/goalController.js";
import { userAuth } from "../middleware/userAuth.js";

const goalRoute = express.Router();

// /api/goal/create
goalRoute.post("/create", userAuth ,createGoals);
// /api/goal/
goalRoute.get("/", userAuth, getGoals);
// /api/goal/:id
goalRoute.get("/:id", userAuth, getDetailGoals);
// /api/goal/:id
goalRoute.put("/:id", userAuth, updateGoal);
// /api/goal/:id
goalRoute.delete("/:id", userAuth, deleteGoal);


export default goalRoute;
