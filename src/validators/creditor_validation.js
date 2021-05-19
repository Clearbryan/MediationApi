/**
 * Creditor input validator
 */

import Joi from 'joi'

export class CreditorValidator {

    validateCreditorInput(creditor) {
        const schema = Joi.object({
            name: Joi.string().required().min(3).max(30).error(new Error(`Creditor name is required`)), 
            type: Joi.string().required().min(3).max(25).error(new Error(`Type is required`)),
            ncrNumber: Joi.string().required().min(4).max(15).error(new Error(`Ncr Number is required`)),
            creditorNumber: Joi.string().min(3).max(15).error(new Error(`Invalid creditor number`)),
            contact: Joi.object({
                phone: Joi.string().min(10).max(10).required().error(new Error(`Creditor phone number is required`)),
                alternatePhone: Joi.string().min(10).max(10).error(new Error(`Invalid or incorrect phone number`)),
                email: Joi.string().email({minDomainSegments: 2}).required().max(50).error(new Error(`Invalid or missing email address`)),
            }),
            banking: Joi.object({
                bankName: Joi.string().required().min(3).max(30).error(new Error(`Bank name is required`)),
                accountNumber: Joi.string().max(15).error(new Error(`Invalid account number`)),
                branchName: Joi.string().max(25).required().error(new Error(`Branch name is required`)),
                branchCode: Joi.string().required().min(4).max(10).error(new Error(`Branch code is required`))
            }),
            address: Joi.object({
                street: Joi.string().required().max(25).error(new Error(`Street address is required`)),
                city: Joi.string().required().max(25).error(new Error(`City is required`)),
                province: Joi.string().required().valid('Western Cape', 'Gauteng', 'KwaZulu Natal', 'North West').error(new Error(`Province is required`)),
                postalCode: Joi.string().min(4).max(4).required().error(new Error(`Postal code is required`)),
                country: Joi.string().required().valid('South Africa').error(new Error(`Invalid or unsupported country`))
            })
        })
        return schema.validate(creditor)
    }
}