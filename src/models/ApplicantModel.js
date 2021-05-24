export class ApplicantModel {
    constructor(mongoose) {
        this.mongoose = mongoose
    }

    applicantSchema() {
        const { Schema } = this.mongoose
        const applicantSchema = new Schema({
            title: { type: String, required: true },
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
            idNumber: { type: String, required: true },
            applicationDate: { type: String, required: true },
            status: { type: String, default: 'in processing' },
            internalRefNumber: { type: String, required: true }, // auto generate a 10 digit string / number
            branch: { type: String, required: true }, // come from setting-company
            dateOfBirth: { type: String, required: true },
            maritalStatus: { type: String,required: true },
            marriageType: { type: String },
            gender: { type: String, required: true },
            race: { type: String, required: true },
            contact: { type: String, required: true },
            email: { type: String, required: true },
            address: {
                street: { type: String, required: true },
                city: { type: String, required: true },
                province: { type: String, required: true },
                postalCode: { type: String, required: true },
                country: { type: String, required: true },
            },
            paymentSetup: { type: this.mongoose.Schema.Types.ObjectId, ref: 'PaymentSetup' },
            budget: { type: this.mongoose.Schema.Types.ObjectId, ref: 'Budget' },
            assignedTo: { type: this.mongoose.Schema.Types.ObjectId, ref: 'Company' }, 
            creditors: [{
                accountNumber: { type: String },
                ncrNumber: { type: String },
                name: { type: String },
                feedback: { type: String, default: 'Awaiting' },
                active: { type: Boolean },
                cob: { type: Number, default: 0 },
                installment: { type: Number, default: 0 },
                source: { type: String },
                originalInterest: { type: Number, default: 0 },
                originalInstallment: { type: Number, default: 0 },
                newInterestRate: { type: Number, default: 0 },
                interestType: { type: String },
                locked: { type: Boolean, default: false },
                pdaFee: { type: Number, default: 0 },
                currentPdaBalance: { type: Number, default: 0 },
                monthlyCharge: { type: Number, default: 0 },        
                annualCharge: { type: Number, default: 0 },
                linkedInsurance: { type: Number, default: 0 },
                accountOpened: { type: Date },
                propsedInterest: { type: Number, default: 0 },
                balance: { type: Number, default: 0 },
                term: { original: { type: Number, default: 0 }, revised: { type: Number, default: 0 } }
            }],
            documents: {
                uploads: [String],
                proposals: [String],
                debitOrders: [String],
                powerOfAttorney: [String],
                cobs: [String],
                application: [String]
            }
        })
        const Applicant = this.mongoose.model('Applicant', applicantSchema)
        return Applicant
    }

    // retrieve all appllicants
    async retrieveApplicants() {
        const applicantModel = new ApplicantModel(this.mongoose)
        let applicant = applicantModel.mongoose.models.Applicant
        try {
            return await applicant.find()
        } catch (error) {
            return error
        }
    }
}