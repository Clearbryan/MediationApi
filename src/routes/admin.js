//160119252189
import mongoose from 'mongoose'
import passport from 'passport'
import _ from 'lodash'
import { Helper } from '../helpers/helper'
import { AdminValidator } from '../validators/admin_validator'
import { AdminModel } from '../models/Admin'
import { CreditorModel } from '../models/CreditorModel'
import { CompanyModel } from '../models/CompanyModel'
import { Admin } from '../Admin/Admin'
import { adminAuth } from '../auth/admin_auth'

const adminValidator = new AdminValidator()
const adminModel = new AdminModel(mongoose).mongoose.models.Admin
const companyModel = new CompanyModel(mongoose).mongoose.models.Company
const creditorModel = new CreditorModel(mongoose).mongoose.models.Creditor
const helper = new Helper()
const { isSuperUser } = adminAuth

export class AdminRoutes {
    constructor(express) {
        this.router = express.Router()
    }

    addSuperAdminUser() {
        return this.router.post('/add', isSuperUser, async (req, res) => {
            const validationResult = await adminValidator.validateAdminDetails(req.body)
            const { error, value } = validationResult
            if(error) {
                return res.status(400).json({success: false, errorMessage: error.message})
            }else {
                // encrypt password
                const hash = await helper.runEncryption(value.password)
                const newAdminUser = {...value, password: hash}
                // attempt to save to database
                const admin = new Admin(newAdminUser)
                const result = await admin.create()

                if(!result.success) {
                    const errorMessage =  await helper.checkDuplicate(result.error)
                    return res.status(400).json({success: false, errorMessage})
                }else {
                    return res.status(200).json({success: true, message: 'Adin user added successfully'})
                }
            }
        })
    }

    // super admin login
    superAdminLogin() {
        return this.router.post('/login', async (req, res) => {
            const { loginId, password } = req.body
            try {
                const user = await adminModel.findOne({loginId: loginId})
                if(!user) {
                    return res.status(404).json({success: false, errorMessage: 'Login Id not found'})
                }else {
                    const isMatch = await helper.compareEncryption(password, user.password)
                    if(!isMatch) {
                        return res.status(404).json({success: false, errorMessage: 'Incorrect password'})
                    }else {
                        const token = await helper.generateToken(_.pick(user, ['loginId', 'email', 'accessLevel']))
                        res.status(200).json({success: true, token})
                    }
                }
            } catch (error) {
                return res.json({success: false, errorMessage: error.message})
            }
        })
    }

    // get all creditors
    getCreditors() {
        return this.router.get('/creditors', isSuperUser, async (req, res) => {
            try {
                const creditors = await creditorModel.find()
                res.status(200).json({success: true, creditors})
            } catch (error) {
                return res.json({success: false, errorMessage: error.message})
            }
        })
    }

    // get all companies
    getCompanies() {
        return this.router.get('/companies', isSuperUser, async (req, res) => {
            try {
                const companies = await companyModel.find()
                res.status(200).json({success: true, companies})
            } catch (error) {
                return res.json({success: false, errorMessage: error.message})
            }
        })
    }
}