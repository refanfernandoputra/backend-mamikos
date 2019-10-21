const express = require('express')
const bodyParser = require('body-parser')
require('express-group-routes')

const app = express()
const port = 5000

app.use(bodyParser.json())

//controllers
const Users = require('./controllers/Users')
const Images = require('./controllers/Images')
const RentList= require('./controllers/RentLists')
const VerifyToken = require('./verifyToken').verifyToken

app.group("/api/v1", (router) => {

    //todos API Users
     
    router.post('/users/login', Users.login)
    router.post('/users/testtoken', VerifyToken,Users.testToken)
    router.get('/users', Users.index)    
    router.get('/users/:id', Users.show)    
    router.post('/users', Users.store)    
    router.patch('/users/:id', Users.update)    
    router.delete('/users/:id', VerifyToken,Users.delete)   

    //todos API RentList
    router.get('/rentlists', RentList.index)    
    router.get('/rentlists/:id', RentList.show)    
    router.post('/rentlists', RentList.store)    
    router.patch('/rentlists/:id', RentList.update)    
    router.delete('/rentlists/:id', RentList.delete)

    //todos API Image
    router.get('/images', Images.index)    
    router.get('/images/:town', Images.show)
    router.get('/images/detail/:id', Images.viewDetail)    
    router.post('/images', Images.store)    
    router.patch('/images/:id', Images.update)    
    router.delete('/images/:id', Images.delete)
})


app.listen(port, () => console.log(`Listening on port ${port}!`))