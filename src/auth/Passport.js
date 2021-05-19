import { Strategy, ExtractJwt } from 'passport-jwt'

module.exports = (passport, User) => {
    const opts = {
        jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.APP_SECRET
    }

    passport.use(new Strategy(opts, (jwt_payload, done) => {
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if(err) {
                return done(err, false)
            }
            if(user) {
                return done(null, user)
            }else {
                return done(null, false)
            }
        })
    }))
}