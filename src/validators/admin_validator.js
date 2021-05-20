import Joi from 'joi'

export class AdminValidator {
    validateAdminDetails(admin) {
        const schema = Joi.object({
            loginId: Joi.string().required().min(4).max(15).error(new Error('Login Id is required')),
            email: Joi.string().email({minDomainSegments: 2}).required().error(new Error('Invalid email address')),
            password: Joi.string().required().min(6).max(15).error(new Error('Password is required (min length 6 characters)')),
            accessLevel: Joi.number().max(4)
        })
        return schema.validate(admin)
    }
}