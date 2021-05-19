/**
 * Creditor class
 */
import { Entity } from '../models/Entity'
import { CreditorModel } from '../models/CreditorModel'
import mongoose from 'mongoose'
const creditorModel = new CreditorModel(mongoose).createCreditorSchema()

export class Creditor extends Entity {
    constructor(details) {
        super(details)
        this.type = details.type
        this.ncrNumber = details.ncrNumber
    }

    // create new creditor
    async create() {
        try {
            const { entityName } = this
            const creditor = creditorModel(entityName)
            const result = await creditor.save()
            return { success: true, result }
        } catch (error) {
            return { success: false, error }
        }
    }
}