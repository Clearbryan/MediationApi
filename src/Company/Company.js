/**
 * Company Model extends from entity
 */

import { Entity } from '../models/Entity';
import { CompanyModel } from '../models/CompanyModel'
import mongoose from 'mongoose'
const companyModel = new CompanyModel(mongoose).createCompanySchema()

export class Company extends Entity {
    constructor(details) {
        super(details)
        this.users = details.users
        this.documents = details.documents
        this.branches = details.branches
        this.registrationNumber = details.registrationNumber
    }

    // create new company
    async create() {
        try {
            const { entityName } = this
            const company = companyModel(entityName)
            const result = await company.save()
            return { success: true, result }
        } catch (error) {
            return { success: false, error }
        }
    }


}