/**
 * creditors routes
 */
import { CreditorModel } from '../models/CreditorModel'
import { Creditor } from '../Creditors/Creditor'
import { CreditorValidator } from '../validators/creditor_validation'
import { Helper } from '../helpers/helper'
import mongoose from 'mongoose'
const helper = new Helper()

export class CreditorRoutes {
    constructor(express) {
        this.router = express.Router()
    }

    // add new creditor
    addCreditor() {
        return this.router.post('/add', async (req, res, next) => {
            try {
                const validationResult = await new CreditorValidator().validateCreditorInput(req.body)
                const { error, value } = validationResult
                if(error) {
                    // return error message to client
                   return res.status(400).json({success: false, message: error.message})
                }else {
                    const creditor = new Creditor(value)
                    const response = await creditor.create()
                    const { success, error } = response
                    if(success) {
                       return res.status(200).json({success: true, message: 'Creditor successfully added'})
                    }else {
                       const errorMessage = helper.checkDuplicate(error)
                       return res.status(500).json({success, errorMessage})
                    }   
                }

            } catch (error) {
                return res.json({success: false, errorMessage: `Something went wrong on, please contact admin!`})
            } 
        })
    }

    // retrieve all creditors
    getCreditors() {
        return this.router.get('/', async (req, res, next) => {
            const creditorModel = new CreditorModel(mongoose)
            try {
                let result = await creditorModel.retrieveCreditors()
                return res.status(200).json({ success: true, result })
            } catch (error) {
                return res.status(500).json({ success: false, errorMessage: `Something went wrong on, please contact admin!` })
            }
        })
    }
}