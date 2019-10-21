const model = require('../models')
const rentlist = model.rentlists
const Users = model.users

exports.index = (req, res) => {
    rentlist.findAll().then(data => res.send(data))
}

exports.show = (req, res) => {
    rentlist.findOne(
        {
            include : [{
                model : Users,
                as : 'users'
            }],   
            where: { id: req.params.id }
        }).then(data => res.send(data))
}

exports.store = (req, res) => {

    const {user_id,rentname,rentaddress,town,latitude,longtitude,roomsleft,price} = req.body
    rentlist.create({
        user_id:user_id,
        rentname:rentname,
        rentaddress:rentaddress,
        town:town,
        latitude:latitude,
        longtitude:longtitude,
        roomsleft:roomsleft,
        price:price
    }).then(rentlist => {
        res.send({
            messages: "success",
            rentlist
        })
    })
}

exports.update = (req, res) => {
    // const {name, email, password} = req.body
    rentlist.update(req.body, { where: { id: req.params.id } }).then(rentlist => {
        res.send({
            Pesan: 'Sukses',
        })
    })
}

exports.delete = (req, res) => {
    rentlist.destroy(
        {
            where: { id: req.params.id }
        }).then(rentlist => {
            res.send({
                messages: 'Berhasil Dihapus',
                rentlist
            })
        })
}
