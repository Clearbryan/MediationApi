import { PaymentSetupModel } from "../models/PaymentSetupModel"
import mongoose from 'mongoose'

const paymentSetUpModel = new PaymentSetupModel(mongoose).createPaymentSchema()
export class PaymentSetup {
    constructor(details) {
        this.frequency = details.frequency
        this.commission = details.commission
        this.commissionPercentage = details.commissionPercentage
        this.proposedEscallationValue = details.proposedEscallationValue
        this.proposedEscallationPercentage = details.proposedEscallationPercentage
        this.type = details.type
        this.firstPaymentDueDate = details.firstPaymentDueDate,
        this.firstPaymentDistributionDate = details.firstPaymentDistributionDate
        this.bankingDetails = details.bankingDetails
        this.applicant = details.applicant
    }

    // create new payment setup
    async create() {
        try {
            const paymentSetup = paymentSetUpModel(this)
            const result = await paymentSetup.save()
            return { success: true, result }
        } catch (error) {
            console.log(error)
            return { success: false, error }
        }
    }
}

