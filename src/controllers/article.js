
const crudController = require('./crud');
const ArticleService = require('../services/article');

class ArticleController extends crudController {

    constructor() {
        super(ArticleService);
    }

    async create(req, res, next) {
        try {
            const article = await ArticleService.create(req.body);
            res.status(201).send(article);
        } catch (e) {
            if (e.name === 'ValidationError') {
                res.status(400).send(e.message);
            }
            next(e);
        }
    }

    async delete(req, res, next) {
        try {
            const article = await ArticleService.deleteById(req.params.id);
            res.status(article !== null ? 204 : 404).send();
        } catch (e) {
            next(e);
        }
    }

    async patch(req, res, next) {
        try {
            const newArticle = await ArticleService.modifyById(req.params.id, req.body);
            if (newArticle === null) {
                res.status(404).send();
                return;
            }
            res.send(newArticle);
        } catch (e) {
            next(e);
        }
    }

    async findAll(req, res, next) {
        try {
            const tags = compact(split(req.query.tags, ","));
            const articles = await ArticleService.findAll(tags);
            res.send(articles);
        } catch (e) {
            next(e);
        }
    }

    async findById(req, res, next) {
        try {
            const article = await ArticleService.findById(req.params.id);
            if (article !== null) {
                res.send(article);
            } else {
                res.status(404).send();
            }
        } catch (e) {
            next(e);
        }

    }
}

module.exports = ArticleController;
