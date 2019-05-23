const Model = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const Hashtag = require('../helpers/hashtag')
class Controller{
    static getFormTweet(req,res){
        res.render('tweet.ejs',{id : req.params.userId})
    }
    
    // static getTweet(req,res){
    //     Model.Tweet.findAll()
    // }

    static postFormTweet(req,res){
        let input = req.body
        Model.Tweet.create({
            Post : input.Tweets,
            UserId : req.params.userId,
            createdAt : new Date()
        })
        .then(()=>{
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