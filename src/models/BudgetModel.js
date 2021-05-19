export class BudgetModel {
    constructor(mongoose) {
        this.mongoose = mongoose
    }

    // create budget schema
    createBudgetSchema() {
        const { Schema } = this.mongoose
        const budgetSchema = new Schema({
            income: [{
                type: { type: String },
                amount: { type: Number },
                comment: { type: String }
            }],
            deductions: [{
                type: { type: String },
                amount: { type: Number },
                comment: { type: String }
            }],
            expenses: [{
                type: { type: String },
                amount: { type: Number },
                comment: { type: String }
            }],
            fees: [{
                type: { type: String },
                amount: { type: Number },
                balance: { type: Number }
            }],
            grossIncome: { type: Number },
            netIncome: { type: Number },
            totalExpense: { type: Number },
            totalDeductions: { type: Number },
            recurringFee: { type: Number },
            netAvaillableForDistribution: { type: Number },
            totalAvaillableForDistribution: { type: Number },
            applicant: { type: this.mongoose.Schema.Types.ObjectId, ref: 'Applicant' }
        })
        const Budget = this.mongoose.model('Budget', budgetSchema)
        return Budget
    }
}

