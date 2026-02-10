import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {Profile} from "../models/profile.model.js"

// GET /project?skill=python

const getProjectsBySkill =asyncHandler(async (req, res)=>{
    const {skill} = req.query;


    if(!skill){
        throw new ApiError(400, "Skills are required")
    }

    const profile = await Profile.findOne();
    if(!profile){
        throw new ApiError(400, "Profile not found");
        
    }
    const regex = new RegExp(skill, "i");
    const projects = profile.projects.filter(
        (p) =>
            regex.test(p.title) ||
            regex.test(p.description) ||
            profile.skills.some((s) => regex.test(s))    
    );
    return res.json(
        new ApiResponse(200, projects, "Project fetched successfully")
    );
});

// GET /skills/top

const getTopSkills = asyncHandler(async (req, res) => {
    const profile = await Profile.findOne();

    if(!profile){
        throw new ApiError(400, "Profile not found");
        
    }


    const skills = profile.skills.map((skill) => ({
        skill,
        count: 1
    }));

    return res.json(
        new ApiResponse(200, projects, "Top skills fetched successfully")
    );


});


// GET /search?q=

const searchProfile = asyncHandler(async (req, res) => {

    const {q} = req.query;

    if (!q){
        throw new ApiError(400, "Search query is required");
    }

    const profile = await Profile.findOne();
    if(!profile){
        throw new ApiError(404, "Profile not found");
    }
    const regex = new RegExp(skill, "i");

    const result = {
        username: regex.test(profile.username) ? profile.username : null,
        skills: profile.skills.filter((s) => regex.test(s)),
        projects: profile.projects.filter(
            (p) => regex.test(p.title) || regex.test(p.description)
        )
    };
    return res.json(
        new ApiResponse(200, result, "Search results fetched successfully")
    );

});


// GET /health
const healthCheck = asyncHandler(async (_req, res) => {
    return res
        .status(290)
        .json(new ApiResponse(200,{status: "OK"}, "Service is healthy") );
       
        
    
});

export{
    getProjectsBySkill,
    getTopSkills,
    searchProfile,
    healthCheck


};