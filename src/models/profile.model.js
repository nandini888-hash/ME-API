import mongoose, {Schema} from "mongoose";
// import jwt from "jsonwebtoken"
// import bcrypt from "bcrypt"

const profileSchema = new Schema(
    {
        username: {
            type: String,
            required : true,
            unique: true,
            lowercase: true,
            trim : true,
            index: true
        },
         email: {
            type: String,
            required : true,
            unique: true,
            lowercase: true,
            trim : true,
            
        },
        education:{
            type: String,
            required: true,
            trim : true,

        },
        skills: {
            type: [String],
            required: true,
            index: true

        },
        projects: [
            {
            title: {
                type: String,
               required: true,
               trim: true
            },
            description: {
                type: String,
                required: true,
                trim: true
            },

            links: {
               type: [String],
               default: []

            
            }
        }
    ],

        work:{
            type: [String],
            default: []
        },
        links: {
            github: {
                type: String,
                trim: true
            },
            linkedin: {
                type: String,
                trim: true
            },
            portfolio: {
                type: String,
                trim: true
            }
        }
    },
    {
        timestamps: true
    }

);



export const Profile = mongoose.model("Profile", profileSchema);