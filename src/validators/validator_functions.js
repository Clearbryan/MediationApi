/**
 * Various utility and validation functions
 * 
 */
import Joi from 'joi'

export default class Validator {
    
    validateApplicantDetails(applicant) {
        const schema = Joi.object({
            title: Joi.string().required().min(2).max(10).error(new Error(`Title is required`)),
            firstName: Joi.string().required().min(4).max(25).error(new Error(`Applicant firstname is required`)),
            lastName: Joi.string().required().min(4).max(25).error(new Error(`Applicant lastname is required`)),
            idNumber: Joi.string().required().min(13).max(13).error(new Error(`Invalid Id Number`)),
            dateOfBirth: Joi.date().required().error(new Error(`Application DOB is required`)),
            maritalStatus: Joi.string().required().valid('Married', 'Single', 'Divorced', 'Separated'),
            marriageType: Joi.string().valid('Civil Union', 'Common Law Marriage', 'Married In Community of Property', 'Married Out of Community of Property', 'Married Out of Community of Property Accrual', 'Traditional', 'Traditional - Not Registered', 'Not Applicable'),
            internalRefNumber: Joi.string().required().min(10).max(10).error(new Error(`Reference number is required`)),
            status: Joi.string().required().valid('In processing', 'submitted for fees', 'distriibution', 'canceled'),
            branch: Joi.string().required().max(25).error(new Error(`Applicant branch is required`)),
            applicationDate: Joi.date().required().error(new Error(`Application date is required`)),
            gender: Joi.string().required().valid('Male', 'Female').error(new Error(`Applicant gender is required`)),
            race: Joi.string().required().valid('Afican (Black)', 'Coloured', 'Indian', 'White', 'Chinese').error(new Error(`Applicant ethnicity is required`)),
            contact: Joi.string().min(10).max(10).required().error(new Error(`Applicant contact number is required`)),
            email: Joi.string().email({minDomainSegments: 2}).required().error(new Error(`Invalid or missing Applicant email`)),
            address: Joi.object({
                street: Joi.string().required().max(25).error(new Error(`Applicant street address is required`)),
                city: Joi.string().required().max(25).error(new Error(`Aplicant city is required`)),
                province: Joi.string().required().valid('Western Cape', 'Gauteng', 'KwaZulu Natal', 'North West').error(new Error(`Applicant province is required`)),
                postalCode: Joi.string().min(4).max(4).required().error(new Error(`Applicant postal code is required`)),
                country: Joi.string().required().valid('South Africa').error(new Error(`Invalid or unsupported country`))
            })
        })
        return schema.validate(applicant)
        
    }
}