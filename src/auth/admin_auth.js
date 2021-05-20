import Jwt from 'jsonwebtoken'
module.exports.adminAuth = {
    isSuperUser: (req, res, next) => {
        const { authorization } = req.headers
        const data = authorization.split(' ')
        Jwt.verify(data[1], process.env.APP_SECRET, (err, user)=> {
            if(err) {
                return res.json({success: false, errorMessage: err.message})
            }
            if(user) {
                user.accessLevel === 4 ? next() : res.status(401).json({success: false, errorMessage: 'Unauthorized Resource'})
            }else {
                return res.status(401).json({success: false, errorMessage: 'Unauthorized Resource'})
            }
        })
    }
}