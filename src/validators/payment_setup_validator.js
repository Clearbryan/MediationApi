import Joi from 'joi'

export class PaymentSetupValidator {

    validatePaymentSetup(payment) {
        const schema = Joi.object({
            frequency: Joi.string().required().min(6).max(15).error(new Error('Frequency is required')),
            commission: Joi.number().required().error(new Error('Commission value is required')),
            proposedEscallationValue: Joi.number().required().error(new Error('Proposed escalation required')),
            type: Joi.string().required().max(15).error(new Error('Payment type is required')),
            firstPaymentDueDate:Joi.date().required().error(new Error('Payment due date is required')),
            firstPaymentDistributionDate: Joi.date().required().error(new Error('Payment distribution date is required')),
            bankingDetails: Joi.object({
                name: Joi.string().required().max(100).error(new Error('Bank name is required')),
                branch:Joi.string().required().max(50).error(new Error('Branch name is required')),
                branchCode: Joi.string().required().max(15).error(new Error('Branch code is required')),
                accountNumber: Joi.string().required().max(15).error(new Error('Account number is required')),
                accountType: Joi.string().required().max(15).error(new Error('Account type is required')),
                installment: Joi.number().required().max(10000).error(new Error('Installment amount is required'))
            })
        })
        return schema.validate(payment)
    }
}