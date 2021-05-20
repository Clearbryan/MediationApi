 export class AdminModel {
    constructor(mongoose) {
        this.mongoose = mongoose
    }

    createAdminSchema() {
        const { Schema } = this.mongoose
        const adminSchema = new Schema({
            loginId: { type: String, required: true },
            email: { type: String, required: true },
            password: { type: String, required: true },
            accessLevel: { type: Number, default: 4 }
        })
        const Admin = this.mongoose.model('Admin', adminSchema)
        return Admin
    }
}