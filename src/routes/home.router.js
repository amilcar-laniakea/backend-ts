import express from "express";
import StaticActions from "../controllers/static.controller.js";

const router = express.Router();
const Render = new StaticActions();

router.get("/", async (req, res) => Render.renderHome(req, res));

export default router;
