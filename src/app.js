import 'dotenv/config'
import helmet from 'helmet'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import passport from 'passport'
import { UserRoutes } from './routes/users'
import { UserModel } from './models/UserModel'
import { Database } from './database/db'
import { ApplicantRoutes } from './routes/applicants'
import { CreditorRoutes } from './routes/creditors'
import { CompanyRoutes } from './routes/company'
import { AdminRoutes } from './routes/admin'

const creditorRouter = new CreditorRoutes(express)
const adminRoutes = new AdminRoutes(express)
const applicantRouter = new ApplicantRoutes(express)
const userRouter = new UserRoutes(express)
const companyRouter = new CompanyRoutes(express)
const userModel = new UserModel(mongoose).mongoose.models.User
const PORT = process.env.PORT || 5000

new Database(mongoose).connect()
require('./auth/Passport')(passport, userModel)
const app = express()

// application middleware 
app.use(cors())
app.use(helmet())
app.use(express.json())

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// application routes
app.use('/users', userRouter.register())
app.use('/users', userRouter.login())
app.use('/admin', adminRoutes.addSuperAdminUser())
app.use('/admin', adminRoutes.getCreditors())
app.use('/admin', adminRoutes.getCompanies())
app.use('/admin', adminRoutes.superAdminLogin())
app.use('/applicants', applicantRouter.getApplicants())
app.use('/applicants', applicantRouter.addApplicant())
app.use('/applicants', applicantRouter.addBudget())
app.use('/applicants', applicantRouter.addFee())
app.use('/applicants', applicantRouter.addPaymentSetup())
app.use('/applicants', applicantRouter.addApplicantCreditor())
app.use('/creditors', creditorRouter.addCreditor())
app.use('/creditors', creditorRouter.getCreditors())
app.use('/company', companyRouter.addCompanyUser())

app.listen(PORT, console.log(`app running on port: ${PORT}`))
