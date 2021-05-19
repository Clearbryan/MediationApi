import Joi from 'joi'
export class BudgetValidator {

    validateBudget(budget) {
        const schema = Joi.object({
            income: Joi.array().items(
                Joi.object({
                    type: Joi.string().max(25),
                    amount: Joi.number(),
                    comment: Joi.string().max(250)
                })
            ),
            deductions: Joi.array().items(
                Joi.object({
                    type: Joi.string().max(25),
                    amount: Joi.number(),
                    comment: Joi.string().max(250)
                })
            ),
            expenses: Joi.array().items(
                Joi.object({
                    type: Joi.string().max(25),
                    amount: Joi.number(),
                    comment: Joi.string().max(250)
                })
            )
        })
        return schema.validate(budget)
    }

}