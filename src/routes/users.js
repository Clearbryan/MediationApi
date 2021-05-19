/**
 * User routing logic
 */
import mongoose from 'mongoose'
import _ from 'lodash'
import { UserModel } from '../models/UserModel'
import { Company } from '../Company/Company'
import { User } from '../Users/User'
import { Helper } from '../helpers/helper'
import { CompanyModel } from '../models/CompanyModel'
import { CompanyValidator } from '../validators/company_validation'

const companyModel = new CompanyModel(mongoose).mongoose.models.Company
const userModel = new UserModel(mongoose).mongoose.models.User
const companyValidator = new CompanyValidator()
const helper = new Helper()


export class UserRoutes {
    constructor(express){
        this.router = express.Router()
    }

    // signup new user
    register() {
        return this.router.post('/register', async (req, res) => {
            try {
                // validate user personal details
                const userValidationResult = await companyValidator.validateCompanyUserDetails(req.body.userDetails)
                const { value, error } = userValidationResult
                if(error) {
                    return res.status(400).json({ success: false, errorMessage: error.message })
                }else {
                    // validate user company details
                    const companyValidationResult = await companyValidator.validateCompanyGeneralDetails(req.body.companyDetails)
                    if(companyValidationResult.error) {
                        return res.status(400).json({ success: false, errorMessage: error.message })
                    }else {
                        // create new company
                        const company = new Company(companyValidationResult.value)
                        const newCompany =await company.create()
                        const { success } = newCompany
                        if(success) {
                            // company created ? save user
                            const { _id } = newCompany.result
                            const hash = await helper.runEncryption(value.password)
                            const user = {...value, password: hash, company: _id}
                            const newUser = new User(user)
                            const createdUser = await newUser.create(_id)
                            if(createdUser.success) {
                                return res.status(200).json({success: true, message: 'Account created successfully'})
                            }else {
                                // remove created company
                                await companyModel.findByIdAndRemove(_id)
                                const errorMessage = helper.checkDuplicate(createdUser.error)
                                return res.status(400).json({success, errorMessage})
                            }
                            
                        }else {
                            const errorMessage = helper.checkDuplicate(newCompany.error)
                            return res.status(400).json({success, errorMessage})
                        }   

                    }
                }
            } catch (error) {
                return res.status(500).json({ success: false, errorMessage: error.message })
            }
        })
    }

    // user login
    login() {
        return this.router.post('/login', async (req, res, next) => {
            const { loginId, password } = req.body
            try {
                const currentUser = await userModel.findOne({'loginId': loginId})
                if(!currentUser) {
                    return res.status(404).json({success: false, errorMessage: 'Login Id not found'})
                }else {
                    // compare passwords
                    const isMatch = await helper.compareEncryption(password, currentUser.password)
                    if(!isMatch) {
                      return res.status(400).json({success: false, errorMessage: 'Incorrect password'})  
                    }else {
                        // generate token
                        const logedInUser = _.pick(currentUser, ['_id', 'loginId', 'company', 'role'])
                        const token = await helper.generateToken(logedInUser)
                        return res.status(200).json({ success: true, token })
                    }
                }
            } catch (error) {
                return res.status(500).json({success: false, errorMessage: `Something went wrong on, please contact admin!`})
            }
        })
    } 

}