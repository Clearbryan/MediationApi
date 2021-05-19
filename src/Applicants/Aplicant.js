/**
 * Applicant model
 */

// extends from Person class
import mongoose from 'mongoose'
import { Person } from '../models/Person'
import { CompanyModel } from '../models/CompanyModel'
import { ApplicantModel } from '../models/ApplicantModel'

const companyModel = new CompanyModel(mongoose).mongoose.models.Company
const applicantModel = new ApplicantModel(mongoose).applicantSchema()

export class Applicant extends Person {
    constructor(details) {
        super(details)
        this.applicationDate = details.applicationDate
        this.branch = details.branch
        this.internalRefNumber = details.internalRefNumber
        this.status = details.status
        this.assignedTo = details.assignedTo
        this.budget = details.budget
    }

    // create new applicant
    async create(companyId) {
        try {
            const applicant = applicantModel(this)

            const found = await companyModel.findByIdAndUpdate(companyId)
            const result = await applicant.save()
            found.clients.push(result._id)
            await found.save()
            return { success: true, result }
        } catch (error) {
            console.log(error)
            return { success: false, error }
        }
    }





    
   

}