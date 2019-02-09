
const express = require('express');
const router = express.Router();

const ArticleController = require('../../controllers/article');


router.get('/', ArticleController.findAll.bind(ArticleController));
router.get('/:id', ArticleController.findById.bind(ArticleController));
router.post('/', ArticleController.create.bind(ArticleController));
router.patch('/:id', ArticleController.patch.bind(ArticleController));
router.delete('/:id', ArticleController.delete.bind(ArticleController));


module.exports = router;
