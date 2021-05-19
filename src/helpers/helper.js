/**
 * Varoius utility functions
 */
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
export class Helper {

    // generate random number
    generateRefNumber() {
        return Math.floor(Math.random() * 9000000000) + 1000000000
    }

    // calculate total expense
    calculateTotalExpense(expense) {
        let total = 0
        expense.forEach((el) => {
            total+=el.amount
        })
        return total
    }

    // calculate total deductions
    calculateTotalDeductions(deductions) {
        let total = 0
        deductions.forEach((el) => {
            total+=el.amount
        })
        return total
    }

    // calculate net Income
    calculateNetIncome(gross, deductions) {
        return Number(gross - deductions)
    }

    // calculate recurring fee
    calculateRecuringFee(amount) {
        return (Number(5/100*amount)).toFixed(0)
    }

    // calculate total available for distribution
    calculateTotalAvailForDist(net, expenses) {
        return Number(net - expenses)
    }

    // calculate net available for distribution
    calculateNetAvailForDist(totalAvailForDis, recrringFee) {
        return Number(totalAvailForDis - recrringFee)
    }

    // calculate gross income
    calculateGrossIncome(income) {
        let total = 0
        income.forEach((el) => {
            total+= el.amount
        })
        return total
    }

    // validate object id
    validateObjectId(id) {
        const ObjectId = mongoose.Types.ObjectId
        return ObjectId.isValid(id)
    }

    // check duplicate entries
    checkDuplicate = (error) => {
        let message
        if(error.code === 11000) {
            const entries = Object.entries(error.keyValue)
            message = `Duplicate entry! ${entries[0][0]}: ${entries[0][1]} already exists.`
        }else {
            message = `Something went wrong, please try again or contact admin.`
        }
        return message
    }

    // encrypt data
    runEncryption = async (data) => {
        try {
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(data, salt)
            return hash
        } catch (error) {
            return error
        }
    }

    // compare encryption
    compareEncryption = async (data, hash) => {
        try {
            const isMatch = await bcrypt.compare(data, hash)
            return isMatch
        } catch (error) {
            return error
        }
    }

    // generate json web token
    generateToken = async (data) => {
        try {
            const token = await jwt.sign(data, process.env.APP_SECRET)
            return token
        } catch (error) {
            return error
        }
    }
}