import mongoose from 'mongoose'
import { UserModel } from '../models/UserModel'
import { CompanyModel } from '../models/CompanyModel'

const companyModel = new CompanyModel(mongoose).mongoose.models.Company
const userModel = new UserModel(mongoose).createUserSchema()

export class User {
    constructor(details) {
        this.firstName = details.firstName
        this.lastName = details.lastName
        this.phone = details.phone
        this.email = details.email
        this.role = details.role
        this.loginId = details.loginId
        this.password = details.password
        this.company = details.company
    }

    // create new user
    async create(companyId) {
        try {
            const user = await userModel(this)
            const found = await companyModel.findByIdAndUpdate(companyId)
            const result = await user.save()
            found.users.push(result._id)
            await found.save()
            return { success: true, result }
        } catch (error) {
            console.log(error)
            return { success: false, error }
        }
    }
}