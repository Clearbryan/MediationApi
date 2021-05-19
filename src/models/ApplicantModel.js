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
            creditors: [String],
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