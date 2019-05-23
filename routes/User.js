const express = require('express')
const Router = express.Router()
const controllerUser = require('../controller/User')

Router.get('/:userId', controllerUser.getHome)
Router.get('/:userId/delete/:tweetId',controllerUser.getDelete)
Router.get('/:userId/edit/:tweetId',controllerUser.getEdit)
Router.post('/:userId/edit/:tweetId',controllerUser.postEdit)
// Router.post('/:userId', controllerTweet.postFormTweet)

module.exports = Router