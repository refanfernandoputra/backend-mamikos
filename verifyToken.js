// THIS IS MIDDLEWARE
// FORMAT OF TOKEN
// Authorization: Bearer <access_token>


// cara 1
// const jwt = require('jsonwebtoken')
// // Verify Token
// exports.verifyToken = (req,res,next) => {
//     // ambil data value header
//     const bearerHeader = req.headers['authorization']

//     if(typeof bearerHeader !== 'undefined'){
//         // ambil data token setelah spasi bearer
//         const bearer = bearerHeader.split(' ')
//         // GET token from array
//         const bearerToken = bearer[1]
//         // SET token
//         req.token = bearerToken
//         // NEXT middleware
//         next()
//     }else{
//         res.sendStatus(403)
//     }
// }

// cara 2

const jwt = require('jsonwebtoken')
// Verify Token
exports.verifyToken = (req,res,next) => {
    // ambil data value header
    const bearerHeader = req.headers['authorization']

    if(typeof bearerHeader !== 'undefined'){
        // ambil data token setelah spasi bearer
        const bearer = bearerHeader.split(' ')
        // GET token from array
        const bearerToken = bearer[1]
        // SET token
        if (!bearerToken) return res.status(401).send('Access Denied')

        try{
            const verified = jwt.verify(bearerToken, 'enskripsi', {expiresIn : '2 days'})
            req.user= verified
        }catch (err){
            res.status(400).send('Invalid Token')
        }

        // NEXT middleware
        next()
    }else{
        res.sendStatus(403)
    }
}

