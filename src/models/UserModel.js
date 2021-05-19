export class UserModel {
    constructor(mongoose){
        this.mongoose = mongoose
    }

    // create user schema
    createUserSchema() {
        const { Schema } = this.mongoose
        const UserShema = new Schema({
            firstName: { type: String },
            lastName: { type: String },
            phone: { type: String },
            email: { type: String },
            role: { type: String, default: 'user' },
            active: { type: Boolean },
            loginId: { type: String }, 
            password: { type: String },
            company: { type: this.mongoose.Schema.Types.ObjectId, ref: 'Company' }
        })
        const User = this.mongoose.model('User', UserShema)
        return User
    }
} 