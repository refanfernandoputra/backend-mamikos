const model = require('../models')
const image = model.images
const rentlists= model.rentlists

exports.index = (req, res) => {
    image.findAll({
        include : [{
            model : rentlists,
            as : 'rentlists'
        }],
        group: ["rentlists.id"]
    }).then(data => res.send(data))
}

exports.show = (req, res) => {
    image.findAll(
        {
            include : [{
                model : rentlists,
                as : 'rentlists',
                where : { town : req.params.town}
            }],
            group: ["rentlists.id"]
            // where: { id: req.params.id }
        }).then(data => res.send(data))
}


exports.viewDetail = (req, res) => {
    image.findAll(
        {
            include : [{
                model : rentlists,
                as : 'rentlists',
                where : { id : req.params.id}
            }],
            // where: { id: req.params.id }
        }).then(data => res.send(data))
}


exports.store = (req, res) => {

    const {image,rent_id} = req.body
    image.create({
        image:image,
        rent_id:rent_id
    }).then(image => {
        res.send({
            messages: "success",
            image
        })
    })
}

exports.update = (req, res) => {
    // const {name, email, password} = req.body
    image.update(req.body, { where: { id: req.params.id } }).then(image => {
        res.send({
            Pesan: 'Sukses',
        })
    })
}

exports.delete = (req, res) => {
    image.destroy(
        {
            where: { id: req.params.id }
        }).then(image => {
            res.send({
                messages: 'Berhasil Dihapus',
                image
            })
        })
}
