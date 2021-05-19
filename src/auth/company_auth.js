import mongoose from 'mongoose'
import { CompanyModel } from '../models/CompanyModel'
import { UserModel } from '../models/UserModel'
const userModel = new UserModel(mongoose).mongoose.models
const companyModel = new CompanyModel(mongoose).mongoose.models.Company

module.exports.companyAuth = {
    isUser: (req, res, next) => {
        if(req.user.role === 'user' || req.user.role === 'admin') {
            next()
        }else {
            return res.status(401).json({success: false, errorMessage: 'Unauthorized resource'})
        }
        
    },
    isAdmin: (req, res, next) => {
        req.user.role === 'admin' ? next() : res.status(401).json({success: false, errorMessage: 'Unauthorized resource'})
    }
}