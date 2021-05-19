export class CompanyModel {
    constructor(mongoose) {
        this.mongoose = mongoose
    }

    // create company Schema
    createCompanySchema() {
        const { Schema } = this.mongoose
        const companySchema = new Schema({
            details: {
                name: { type: String, required: true },
                tradingName: { type: String },
                registeredName: { type: String },
                entityType: { type: String },
                registrationNumber: { type: String, required: true },
                vat: { 
                    registered: { type: Boolean, default: false }, number: { type: String } 
                }
            },
            contact: [String],
            branches: [String],
            users: [String],
            clients: [String],
            documents: [{
                id: { type: String }, // auto generated
                description: { type: String },
                date: { type: String },
                createdBy: { type: String }
            }]
        })
        const Company = this.mongoose.model('Company', companySchema)
        return Company
    }

    // find single company
    async lookUpCompany(registrationNumber) {
        const companyModel = new CompanyModel(this.mongoose)
        let company = companyModel.mongoose.models.Company
        try {
            return await company.findOne({'details.registrationNumber':registrationNumber })
        } catch (error) {
            return error
        }
    }

    async companySingleLookup(_key, value) {
        const companyModel = new CompanyModel(this.mongoose)
        let company = companyModel.mongoose.models.Company
        try {
            let one = await company.findOne({_key: value})
            return one
        } catch (error) {
            
            return error
        }
        
    }
}