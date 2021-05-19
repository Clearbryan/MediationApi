export class Database {
    constructor(mongoose) {
        this.mongoose = mongoose
    }

    async connect() {
        try {
            await this.mongoose.connect(process.env.DB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            })
            console.log(`Successfully connected to MongoDB...`)
        } catch (error) {
            console.log(`Failed to connect to Database...`)
            process.exit(1)
        }
    }
}  