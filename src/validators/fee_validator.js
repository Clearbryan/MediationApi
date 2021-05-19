import Joi from 'joi'
export class FeeValidator {
    validateFee(fee) {
        const schema = Joi.object({
            type: Joi.string().required().max(50).error(new Error('Fee type is required')),
            amount: Joi.number().required().error(new Error('Amount is required')),
            balance: Joi.number(),
        })
        return schema.validate(fee)
    }

}