const express = require('express')
const router = express.Router()

const articleController = require('../controllers/articleController')

router.get('/', articleController.getArticles);

router.put('/read/:id', articleController.markRead);


module.exports = router