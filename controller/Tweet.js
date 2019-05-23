const Model = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const Hashtag = require('../helpers/hashtag')

            Model.Tweet.findAll({
                include : [Model.User],
                where : {
                    Post: {
                        [Op.like]: '%#%'}
                } ,
                order: [
                    ['createdAt', 'DESC'],
                ],
            })
            .then((data)=>{
                data.forEach(element => {
                    let hash = Hashtag(element.dataValues.Post)
                    if(hash!==null){
                    hash.forEach(element2 => {
                        console.log(element2)
                        Model.Tag.create({
                            name:element2,
                            createdAt: new Date(),
                            updatedAt: new Date()
                        })
                    })
                }
                });
            })
        })
        .then(()=>{
            res.redirect(`/user/${req.params.userId}`)
        })
        .catch((err)=>{
            res.send(err)
        })
    }


}

module.exports = Controller