import mongoose from 'mongoose'
import { BudgetModel } from '../models/BudgetModel'

const budgetModel = new BudgetModel(mongoose).createBudgetSchema()

export class Budget {
    constructor(details) {
        this.income = details.income
        this.deductions = details.deductions
        this.expenses = details.expenses
        this.netIncome = details.netIncome
        this.totalAvaillableForDistribution = details.totalAvaillableForDistribution,
        this.fees = details.fees
        this.applicant = details.applicant
        this.grossIncome = details.grossIncome
        this.totalExpense = details.totalExpense
        this.totalDeductions = details.totalDeductions
        this.recurringFee = details.recurringFee
        this.netAvaillableForDistribution = details.netAvaillableForDistribution

    }

    // create new budget setup
    async create(data) {
        try {
            const applicantBudget = budgetModel(this)
            const result = await applicantBudget.save()
            return { success: true, result }
        } catch (error) {
            console.log(error)
            return { success: false, error }
        }
    }
}