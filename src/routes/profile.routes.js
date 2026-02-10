//console.log(" profile.routes.js loaded");
import {Router } from "express";
import { 
     createProfile,
     getProfile,
     updateProfile
     
    } from "../controllers/profile.controller.js";

const router = Router();

// router.route("/").post(createProfile)
// router.route("/").get(getProfile)

// router.route("/").put(updateProfile)
router.post("/", (req, res) => {
  return res.status(200).json({
    message: "POST PROFILE WORKS",
    body: req.body
  });
});


export default router