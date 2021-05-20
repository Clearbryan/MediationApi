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
            description: Joi.string().max(250).error(new Error(`250 characters allowed`)),

            contact: Joi.object({
                phone: Joi.array().items(
                    Joi.object({
                        type: Joi.string(),
                        number: Joi.number()
                    })
                ),
                email: Joi.array().items(
                    Joi.object({
                        type: Joi.string(),
                        address: Joi.string().email({minDomainSegments: 2}).required().max(50).error(new Error(`Invalid or missing email address`))
                    })
                )
            }),
            banking: Joi.object({
                bankName: Joi.string().required().min(3).max(30).error(new Error(`Bank name is required`)),
                accountNumber:Joi.string().max(15).error(new Error(`Invalid account number`)),
                accountType: Joi.string().valid('cheque', 'savings'),
                branchName: Joi.string().max(25).required().error(new Error(`Branch name is required`)),
                branchCode: Joi.string().required().min(4).max(10).error(new Error(`Branch code is required`))
            }),
            address: Joi.object({
                street: Joi.string().required().max(500).error(new Error(`Street address is required`)),
                city: Joi.string().required().max(25).error(new Error(`City is required`)),
                province: Joi.string().required().valid('Western Cape', 'Gauteng', 'KwaZulu Natal', 'North West').error(new Error(`Province is required`)),
                postalCode: Joi.string().min(4).max(4).required().error(new Error(`Postal code is required`)),
                country: Joi.string().required().valid('South Africa').error(new Error(`Invalid or unsupported country`))
            })
        })
        return schema.validate(creditor)
    }
}