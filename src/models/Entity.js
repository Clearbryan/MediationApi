/**
 * Company Model
 */

export class Entity {
    constructor(entityName, number, description, address, contact, banking) {
        this.entityName = entityName
        this.number = number
        this.description = description
        this.address = address
        this.contact = contact
        this.banking = banking
    }
}
