/**
 * Creditor class
 */
import { Entity } from '../models/Entity'
import { CreditorModel } from '../models/CreditorModel'
import mongoose from 'mongoose'
const creditorModel = new CreditorModel(mongoose).createCreditorSchema()

export class Creditor {
    constructor(details) {
        this.name = details.name
        this.description = details.description
        this.ncrNumber = details.ncrNumber
        this.type = details.type // single / group
        this.address = details.address
        this.contact = details.contact
        this.banking = details.banking
        this.submited = details.submited
    }

    // create new creditor
    async create() {
        try {
            const creditor = creditorModel(this)
            const result = await creditor.save()
            return { success: true, result }
        } catch (error) {
            return { success: false, error }
        }
    }
}