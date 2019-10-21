const model = require('../models')
const user = model.users
const jwt = require('jsonwebtoken')
const bycrpte = require('bcryptjs')
const { registerValidation,loginValidation } = require('../validation')

exports.index = (req, res) => {
    user.findAll().then(data => res.send(data))
}

exports.show = (req, res) => {
    user.findOne(
        {
            where: { id: req.params.id }
        }).then(data => res.send(data))
}

exports.store = async (req, res) => {
    //validasi data 
    // 1. show all error
    // const validation = Joi.validate(req.body, schema)
    // res.send(validation)

    // 2. show spesifik error
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    // cek email if already in databases
    const emailExist = await user.findOne({where :{email: req.body.email}})
    if(emailExist) return res.status(400).send('Email sudah terdaftar')

    const salt = await bycrpte.genSalt(10)//merandom kata
    const hashedPassword = await bycrpte.hash(req.body.password, salt) // mengacak password
    
    const { name, email, password, gender, phonenumber, job, status } = req.body
    user.create({
        name: name,
        email: email,
        password: hashedPassword,
        gender: gender,
        phonenumber: phonenumber,
        job: job,
        status: status
    }).then(user => {
        res.send({
            messages: "success",
            user
        })
    })
}

exports.update = (req, res) => {
    // const {name, email, password} = req.body
    user.update(req.body, { where: { id: req.params.id } }).then(user => {
        res.send({
            Pesan: 'Sukses',
        })
    })
}

exports.delete = (req, res) => {

    jwt.verify(req.token, 'enskripsi', {expiresIn : '2 days'}, (err, autdata)=>{
        if(err){
            // 403 is forbiden
            res.sendStatus(403)
        }else{
            user.destroy(
                {
                    where: { id: req.params.id }
                }).then(user => {
                    res.send({
                        messages: 'Berhasil Dihapus'
                    })
                })
        }
    })
}

exports.testToken= (req,res) =>{
    //  menggunakan cara 1 verifytoken
    // jwt.verify(req.token, 'enskripsi', {expiresIn : '2 days'}, (err, autdata)=>{
    //     if(err){
    //         // 403 is forbiden
    //         res.sendStatus(403)
    //     }else{
    //         res.json({
    //             message: 'Token ada',
    //             autdata
    //         })
    //     }
    // })
    // res.send(req.token)
    
    // menggunakan cara 2 verifytoken
    res.json(req.user)
}

exports.login = async (req, res) => {
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    // cek email if already in databases
    const userValid = await user.findOne({where :{email: req.body.email}})
    if(!userValid) return res.status(400).send('Email tidak terdaftar')

    // cek pass if already in databases
    const validPass = await bycrpte.compare(req.body.password, userValid.password)
    if(!validPass) return res.status(400).send('password yang anda masukkan salah!')

    const token = jwt.sign({
        userId:userValid.id
    },'enskripsi')
    res.header('authorization', token).send(token)

    // const { email, password } = req.body
    // await user.findOne(
    //     {
    //         where: {
    //             email: req.body.email
    //         }
    //     }).then(result => {
    //         jwt.sign({
    //             userId:result.id
    //         },'enskripsi', (err, token) =>{
    //             if(err){
    //                 console.log(err)
    //             }
    //             res.send({
    //                 result,
    //                 token:token
    //             })

    //         })
        
    //     })
}