export class PaymentSetupModel {
    constructor(mongoose) {
        this.mongoose = mongoose
    }

    // create payment setup schema
    createPaymentSchema() {
        const { Schema } = this.mongoose
        const paymentSetUpSchema = new Schema({
            frequency: { type: String },
            commission: { type: Number },
            commissionPercentage: { type: Number },
            proposedEscallationValue: { type: Number },
            proposedEscallationPercentage:{ type: Number },
            type: { type: String },
            firstPaymentDueDate: { type: String },
            firstPaymentDistributionDate: { type: String },
            applicant: { type: this.mongoose.Schema.Types.ObjectId, ref: 'Applicant' },
            bankingDetails: {
                name: { type: String },
                branch: { type: String },
                branchCode: { type: String },
                accountNumber: { type: String },
                accountType: { type: String },
                installment: { type: Number }
            }
        })
        const PaymentSetup = this.mongoose.model('PaymentSetup', paymentSetUpSchema)
        return PaymentSetup

    }
}