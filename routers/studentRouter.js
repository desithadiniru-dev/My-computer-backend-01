import express from "express";
import { createStudent, getStudents } from "../controllers/studentController.js";

const studentRouter = express.Router();

studentRouter.post("/", createStudent);
studentRouter.get("/", getStudents);

export default studentRouter;