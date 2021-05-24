/**
 * Applicant routing logic
 */
import mongoose from 'mongoose'
import _ from 'lodash'
import Validator from '../validators/validator_functions'
import passport from 'passport'
import { PaymentSetupValidator } from '../validators/payment_setup_validator'
import { Budget } from '../Budget/ApplicanBudget'
import { BudgetValidator } from '../validators/budget_validator'
import { FeeValidator } from '../validators/fee_validator'
import { BudgetModel } from '../models/BudgetModel'
import { CreditorValidator } from '../validators/creditor_validation'
import { PaymentSetup } from '../Payments/ApplicantPaymentSetup'
import { companyAuth } from '../auth/company_auth'
import { ApplicantModel } from '../models/ApplicantModel'
import { Applicant } from '../Applicants/Aplicant'
import { CreditorModel } from '../models/CreditorModel'
import { Helper } from '../helpers/helper'

const { isUser, isAdmin } = companyAuth
const helper = new Helper()
const budgetValidator = new BudgetValidator()
const creditorValidator = new CreditorValidator()
const setupValidator = new PaymentSetupValidator()
const feeValidator = new FeeValidator()
const applicantModel = new ApplicantModel(mongoose).mongoose.models.Applicant
const budgetModel = new BudgetModel(mongoose).mongoose.models.Budget
const creditorModel = new CreditorModel(mongoose).mongoose.models

export class ApplicantRoutes {
    constructor(express) {
        this.router = express.Router()
    }
    // add a new applicant
    addApplicant() {
        // @ POST - ROUTE (Add new applicant -requires user login)
        return this.router.post('/add', passport.authenticate('jwt', {session: false}), isUser, async (req, res) => {
            try {
               const validationResult = await new Validator().validateApplicantDetails(req.body)
               const { error, value } = validationResult
               if(error) {
                   // return error message to client
                   return res.status(400).json({success: false, errorMessage: error.message})
               }
               else {
                   const newApplicant = {...value, assignedTo: req.user.company}
                   const applicant = new Applicant(newApplicant)
                   const response = await applicant.create(req.user.company)
                   const { success, error } = response
                   if(success) {
                       res.status(200).json({success: true, message: 'Applicant successfully added'})
                   }else {
                       const errorMessage = helper.checkDuplicate(error)
                       return res.status(400).json({success, errorMessage})
                   }   
               }
            } catch (error) {
                return res.json({success: false, errorMessage: `Something went wrong on, please contact admin!`})
            }   
            
        })
    }

    // add applicant payment setup
    addPaymentSetup() {
        return this.router.post('/add/payment-setup',  passport.authenticate('jwt', {session: false}), isUser, async (req, res) => {
           try {
               const {applicantId} = req.query
               const isIdValid = mongoose.isValidObjectId(applicantId)
               // if ivalid id
               if(!isIdValid) {
                   return res.status(403).json({success: false, errorMessage: 'Malinformed applicant Id'})
                // id is valid
               }else {
                    const validationResult = await setupValidator.validatePaymentSetup(req.body)
                    const { error, value } = validationResult
               // if validation error
               if(error) {
                    return res.status(400).json(({ success: false, errorMessage: error.message }))
               }else {
                    // validation successfull, proceed
                    const setUp = {...value, applicant: applicantId}
                    const paymentSetup = new PaymentSetup(setUp)
                    const response = await paymentSetup.create()
                    // handle data persistant error
                    if(response.error) {
                        if(response.error.code === 11000) {
                            return res.status(400).json({success: false, errorMessage: 'Multiple payment setups not allowed'})
                        }else {
                            return res.status(500).json({success: false, errorMessage: response.error.message})
                        }
                    }else {
                       // no error persisting data
                       // assign payment setup to applicant
                       await applicantModel.findByIdAndUpdate(applicantId, { paymentSetup: response.result._id})
                       res.status(200).json({success: true, message: 'Payment setup successfully added'})
                    }
    
                 }
                }
           } catch (error) {
               return res.status(500).json({success: false, errorMessage: error.message})
           }
        })
    }

    // add applicant budget
    addBudget() {
        return this.router.post('/add/budget', passport.authenticate('jwt', { session: false }), isUser, async (req, res) => {
            // validate budget input
            try {
                const {applicantId} = req.query
                const isIdValid = mongoose.isValidObjectId(applicantId)
                // if ivalid id
                if(!isIdValid) {
                    return res.status(403).json({success: false, errorMessage: 'Malinformed applicant Id'})
                   // id is valid
                }else {
                    const validationResult = await budgetValidator.validateBudget(req.body)
                const { error, value } = validationResult
                // if validation fails
                if(error) {
                    return res.status(400).json({ success:false, errorMessage: error.message })
                }else {
                    // validation passed
                    // perform calculation for the budget
                    const { income, deductions, expenses } = value
                    // calculate budget
                    const grossIncome = helper.calculateGrossIncome(income)
                    const totalDeductions = helper.calculateTotalDeductions(deductions)
                    const totalExpense = helper.calculateTotalExpense(expenses)
                    const netIncome = helper.calculateNetIncome(grossIncome, totalDeductions)
                    const totalAvaillableForDistribution = helper.calculateTotalAvailForDist(netIncome, totalExpense)
                    const recurringFee = helper.calculateRecuringFee(totalAvaillableForDistribution)
                    const netAvaillableForDistribution = helper.calculateNetAvailForDist(totalAvaillableForDistribution, recurringFee)
                    
                    let fees = [{ type: 'Once Off', amount: totalAvaillableForDistribution, balance: 0 }]
                    // attempt ot save
                    const newBudget = {...value, applicant: applicantId, grossIncome, totalDeductions, totalExpense, recurringFee, netAvaillableForDistribution, totalAvaillableForDistribution, netIncome, fees }

                    const budget = new Budget(newBudget)
                    const result = await budget.create()
                    // no error persisting data
                    // assign budget to applicant
                    if(result.error) {
                        if(result.error.code === 11000) {
                            return res.status(400).json({success: false, errorMessage: 'Multiple budgets not allowed'})
                        }else {
                            return res.status(500).json({success: false, errorMessage: result.error.message})
                        }
                    }else {
                        await applicantModel.findByIdAndUpdate(applicantId, { budget: result.result._id})
                        res.status(200).json({success: true, message: 'Budget successfully added'})
                    }  
                    }
                }
            } catch (error) {
                return res.status(500).json({ success:false, errorMessage: error.message })
            }
        })
    }

    // add fee
    addFee() {
        return this.router.post('/add/fee', passport.authenticate('jwt', {session: false}), isUser, async(req, res) => {
            try {
                const {applicantId} = req.query
                const isIdValid = mongoose.isValidObjectId(applicantId)
                // if ivalid id
                if(!isIdValid) {
                    return res.status(403).json({success: false, errorMessage: 'Malinformed applicant Id'})
                   // id is valid
                }
                else {
                    // validate incoming request data
                    const validationResult = await feeValidator.validateFee(req.body)
                    const { error, value } = validationResult
                    if(error) {
                        return res.status(400).json({success: false, errorMessage: error.message})
                    }else {
                        const budget = await budgetModel.findOne({applicant: applicantId})
                        if(!budget) {
                            return res.status(404).json({success: false, errorMessage: 'Applicant not found'})
                        }else {
                            // check duplicate types
                            const isDuplicate = budget.fees.filter((el) => {
                                return el.type === value.type
                            })
                            if(isDuplicate.length > 0) {
                                return res.status(400).json({success: false, errorMessage: 'Duplicate fee title found'})
                            }else {
                                budget.fees.push(value)
                                await budget.save()
                                res.status(200).json({success: true, message: 'Fee successfully added'})
                            }
                        }
                        
                    }
                }
            } catch (error) {
                return res.status(500).json({success: false, errorMessage: error.message})
            }
        })
    }

    // add creditors
    addApplicantCreditor() {
        return this.router.post('/creditors/add', passport.authenticate('jwt', {session: false}), isUser, async (req, res) => {
            const {applicantId} = req.query
            if(!applicantId) {
                 return res.status(403).json({success: false, errorMessage: 'Forbidden'})
            }else {
                const isIdValid = mongoose.isValidObjectId(applicantId)
                // if ivalid id
                if(!isIdValid) {
                    return res.status(403).json({success: false, errorMessage: 'Malinformed applicant Id'})
                    // id is valid
                }else {
                    // simulate selecting creditor
                try {
                    const {applicantId} = req.query
                    const isIdValid = mongoose.isValidObjectId(applicantId)
                    // if ivalid id
                    if(!isIdValid) {
                        return res.status(403).json({success: false, errorMessage: 'Malinformed applicant Id'})
                    // id is valid
                    }else {
                            const creditors = await creditorModel.Creditor.find()
                            let applicantCreditorOptions = creditors.map((el) => {
                                return _.pick(el, ['banking', 'name', 'status', 'ncrNumber', 'type'])
                            })
                            // add creditor details to applicant
                            const applicant = await applicantModel.findByIdAndUpdate(applicantId)
                            let prePopulate
                            applicantCreditorOptions.forEach((el) => {
                                prePopulate = _.pick(el, ['name', 'ncrNumber', 'status'])
                                prePopulate['accountNumber'] = el.banking.accountNumber
                                prePopulate['feedback'] = 'awaiting'
                                applicant.creditors.push(prePopulate)
                            })
                            await applicant.save()
                            res.status(200).json({success: true, message: 'Creditor assigned successfully'})
                        }
                    } catch (error) {
                        return res.status(400).json({ success:false, errorMessage: error.message })
                    }
                }
            }
        })
    }

    // update applicant creditor information 
    updateApplicantCreditor() {
        return this.router.post('/creditors/edit', passport.authenticate('jwt', {session: false}), isUser, async(req, res) => {
            const {applicantId, creditorId} = req.query
            if(!applicantId || !creditorId) {
                 return res.status(403).json({success: false, errorMessage: 'Forbidden'})
            }else {
                const isIdValid = mongoose.isValidObjectId(applicantId)
                const isValidCreditorId = mongoose.isValidObjectId(creditorId)
                // if ivalid id
                if(!isIdValid || !isValidCreditorId) {
                    return res.status(403).json({success: false, errorMessage: 'Applicant or Creditor Id malinformed'})
                    // id is valid
                }else {
                    try {
                        const applicant = await applicantModel.findByIdAndUpdate(applicantId)
                        if(!applicant) {
                            return res.status(404).json({success: false, errorMessage: 'Applicant not found'})
                        }
                        else {
                           // applicant is found
                           // validate incoming request
                            const validationResult = await creditorValidator.validateApplicantCreditorInput(req.body)
                            const { error, value } = validationResult
                            if(error) {
                                return res.status(400).json({ success: false, errorMessage: error.message })
                            }else {
                                 const { cob, originalInterest, originalInstallment, curentPdaBalance, monthlyCharge, annualCharge, linkedInsurance, feedback, source, accountOpened, active, term } = value
                            applicant.creditors.forEach((creditor) => {
                                if(creditor._id == creditorId) {
                                    creditor.originalInstallment = originalInstallment
                                    creditor.cob = cob,
                                    creditor.active = active,
                                    creditor.originalInterest = originalInterest
                                    creditor.curentPdaBalance = curentPdaBalance
                                    creditor.monthlyCharge = monthlyCharge,
                                    creditor.annualCharge = annualCharge,
                                    creditor.linkedInsurance = linkedInsurance,
                                    creditor.balance = cob
                                    creditor.source = source
                                    creditor.accountOpened = accountOpened,
                                    creditor.feedback = feedback
                                    creditor.term.original = term.original
                                }
                            })
                            await applicant.save()
                            res.status(200).json({success: true, message: 'Applicant creditor details updated'})
                            }
                        }
                                
                    } catch (error) {
                        console.log(error);
                        res.json({success: false, errorMessage: error.message})
                    }
                }
            }
        })
    }

    // get single applicant
    getApplicants() {
        return this.router.get('/', async (req, res, next) => {
            const applicantModel = new ApplicantModel(mongoose)
            try {
                let result = await applicantModel.retrieveApplicants()
                return res.status(200).json({ success: true, result })
            } catch (error) {
                return res.status(500).json({ success: false, errorMessage: `Something went wrong on, please contact admin!` })
            }
        })
    }


}