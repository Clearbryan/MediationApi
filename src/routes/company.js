import _ from 'lodash'
import passport from 'passport'
import { CompanyValidator } from '../validators/company_validation'
import { Helper } from '../helpers/helper'
import { companyAuth } from '../auth/company_auth'
import { User } from '../Users/User'

const helper = new Helper()
const companyValidator = new CompanyValidator()
const { isUser, isAdmin } = companyAuth

export class CompanyRoutes {
    constructor(express){
        this.router = express.Router()
    }
    // add company user
    // @ ROUTE - POST (Protected route - Company Admin Only)
    addCompanyUser() {
        return this.router.post('/add/users', passport.authenticate('jwt', { session: false }), isAdmin, async (req, res) => {
            try {
                // validate user details
                const validationResult = await companyValidator.validateCompanyUserDetails(req.body.users)
                const { error, value } = validationResult
                // if validation fails
                if(error) {
                    return res.status(400).json({success: false, message: error.message})
                }else {
                    // validation succeeds ? encrypt user password
                    const hash = await helper.runEncryption(value.password)
                    const user = {...value, password: hash, company: req.user.company}

                    // create new user
                    const newUser = new User(user)
                    const createdUser = await newUser.create(req.user.company)
                    if(!createdUser.success) {
                        const errorMessage = helper.checkDuplicate(createdUser.error)
                        return res.status(400).json({success: false, errorMessage})
                    }else {
                        res.status(200).json({success: true, message: 'User added successfully'})
                    }
                }
            } catch (error) {
                return res.status(500).json({ success: false, errorMessage: error.message })
            }
        })
    }
}