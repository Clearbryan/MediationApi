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
            description: { type: String },
            ncrNumber: { type: String },
            type: { type: String },
            active: { type: Boolean, default: true },
            deductPDAFee: { type: Boolean, default: false },
            status: { 
                verified: { type: Boolean, default: false }
             },
            contact: {
                phone: [ { type: { type: String }, number: { type: String } }],
                email: [{ type: { type:  String }, address: { type: String } }]
            },
            banking: {
                bankName: { type: String },
                accountNumber: { type: String },
                accountType: { type: String },
                branchName: { type: String },
                branchCode: { type: String }
            },
            address: {
                street: { type: String },
                city: { type: String },
                province: { type: String },
                postalCode: { type: String },
                country: { type: String }
            },
            submited: {
                by: { type: String, date: String }
            }
        })
        const Creditor = this.mongoose.model('Creditor', creditorSchema)
        return Creditor
    }

}