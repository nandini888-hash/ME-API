import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {Profile} from "../models/profile.model.js"

//Create
const createProfile = asyncHandler(async (req, res) => {
    const {
        username,
        email,
        skills,
        education,
        projects,
        work,
        links
        
    } = req.body;
    
        
    if(!username || !email){
        throw new ApiError(400, "Required fields are missing");
    } 
    
    const existingProfile = await Profile.findOne({
        $or : [{username}, {email}]

    })

    if(existingProfile){
        throw new ApiError(409,"Profile already exists" )
    }

    const profile = await Profile.create({
        username: username.toLowerCase(),
        email,
        education,
        skills,
        projects,
        work,
        links
    });
    return res.status(201).json(
        new ApiResponse(201, profile, "Profile created successfully")
    );
});

 //Read        
        
const getProfile = asyncHandler(async (req, res) => {
    const profile = await Profile.findOne();


    if(!profile){
        throw new ApiError(404, "Profile not found");
        
    }
    return res.status(200).json(
        new ApiResponse(200, profile, "Profile fetched successfully")
    );
});     
       
//Update 

const updateProfile = asyncHandler(async (req, res) => {
    const updatedProfile = await Profile.findOneAndUpdate(
        {},
        req.body,
        {
            new : true,
            runValidators: true
        }
    );
    
    if(!updatedProfile){
        throw new ApiError(404,"Profile not found");
        
    }

    return res.status(200).json(
        new ApiResponse(200, updatedProfile, "Profile updated successfully")
    );
});    



export {
    createProfile,
    getProfile,
    updateProfile
};