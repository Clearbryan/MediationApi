/**
 * Creditor model
 */

export class CreditorModel {
    constructor(mongoose) {
        this.mongoose = mongoose
    }

    // Creditor Schema
    createCreditorSchema() {
        const { Schema } = this.mongoose
        const creditorSchema = new Schema({
            name: { type: String, required: true },
            ncrNumber: { type: String },
            type: { type: String },
            creditorNumber: { type: String },
            contact: { 
                email: { type: String },
                phone: { type: String },
                alternatePhone: { type: String }
            },
            banking: {
                name: { type: String },
                accountNumber: { type: String },
                branchName: { type: String },
                branchCode: { type: String }
            },
            address: {
                street: { type: String },
                city: { type: String },
                province: { type: String },
                postalCode: { type: String },
                country: { type: String }
            }
        })
        const Creditor = this.mongoose.model('Creditor', creditorSchema)
        return Creditor

    }

    // retrieve all creditors
    async retrieveCreditors() {
        const creditorModel = new CreditorModel(this.mongoose)
        let creditor = creditorModel.mongoose.models.Creditor
        try {
            return await creditor.find()
        } catch (error) {
            console.log(error)
            return error
        }
    }
}