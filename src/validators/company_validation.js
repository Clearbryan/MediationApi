import Joi from 'joi'

export class CompanyValidator {
    validateCompanyGeneralDetails(company) {
        const schema = Joi.object({
            details: Joi.object({
                name: Joi.string().required().min(3).max(25).error(new Error(`Company name is required`)),
                tradingName: Joi.string().min(3).max(25).error(new Error(`Invalid trading name`)),
                registeredName: Joi.string().min(3).max(25).error(new Error(`Invalid registered name`)),
                entityType:Joi.string().min(3).max(25).error(new Error(`Invalid entity type`)),
                registrationNumber: Joi.string().required().min(3).max(25).error(new Error(`Invalid registration number`)),
                vat: Joi.object({
                    registered:Joi.boolean().error(new Error(`Invalid vat registration type`)),
                    number:Joi.string().min(3).max(25).error(new Error(`Invalid vat number`)), 
                })
            })
        })
        return schema.validate(company)
    }

    validateCompanyContactDetail(details) {
        const schema = Joi.object({
            name: Joi.string().required().min(3).max(30).error(new Error(`Name is required`)),
            cell: Joi.string().required().min(10).max(10).error(new Error(`Cell number is required`)),
            tel: Joi.string().min(10).max(10).error(new Error(`Invalid telephone number`)),
            fax: Joi.string().min(10).max(10).error(new Error(`Invalid fax number`)),
            email: Joi.string().email({minDomainSegments: 2}).error(new Error(`Invalid email address`))
        })
        return schema.validate(details)
    }

    validateCompanyUserDetails(user) {
        const schema = Joi.object({
            firstName: Joi.string().required().min(3).max(25).error(new Error(`Firstname is required`)),
            lastName: Joi.string().required().min(3).max(25).error(new Error(`Lastname is required`)),
            phone:Joi.string().required().min(10).max(10).error(new Error(`Phone number is required`)),
            email: Joi.string().required().email({minDomainSegments: 2}).error(new Error(`Invalid email address`)),
            role: Joi.string().required().allow('user', 'admin', 'supervisor').error(new Error(`Invalid user role option`)),
            loginId: Joi.string().required().min(7).max(7).error(new Error(`Invalid login ID`)),
            password: Joi.string().required().min(4).max(15).error(new Error(`Password either too short or too long`))
        })
        return schema.validate(user)
    }

    validateCompanyBranchDetails(branch) {
        const schema = Joi.object({
            name: Joi.string().required().min(3).max(30).error(new Error(`Invalid branch name`)),
            ncrNumber: Joi.string().required().min(3).max(10).error(new Error(`Invalid ncr number`))      
        })
        return schema.validate(branch)
    }

}

