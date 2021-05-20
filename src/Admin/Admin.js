import mongoose from 'mongoose'
import { AdminModel } from '../models/Admin'

const adminModel = new AdminModel(mongoose).createAdminSchema()
export class Admin {
    constructor(details) {
        this.loginId = details.loginId
        this.email = details.email
        this.password = details.password
        this.accessLevel = details.accessLevel
    }

    async create() {
        try {
            const admin = adminModel(this)
            const result = await admin.save()
            return { success: true, result }
        } catch (error) {
            return { success: false, error }
        }

    }
}