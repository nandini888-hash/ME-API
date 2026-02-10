import {Router } from "express";
import { 
    getProjectsBySkill,
    getTopSkills,
    searchProfile,
    healthCheck
     
    } from "../controllers/query.controller.js";

const router = Router();

router.route("/projects").get(getProjectsBySkill)
router.route("/skills/top").get(getTopSkills)
router.route("/search").get(searchProfile)
router.route("/health").get(healthCheck)
export default router