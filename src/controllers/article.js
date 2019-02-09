
const ArticleService = require('../services/article');

class ArticleController {

    static async create(req, res, next) {
        try {
            const article = await ArticleService.create(req.body);
            res.status(201).send(article);
        } catch (e) {
            next(e);
        }
    }

    static async delete(req, res, next) {
        try {
            await ArticleService.deleteById(req.params.id);
            res.status(204).send();
        } catch (e) {
            next(e);
        }
    }

    static async patch(req, res, next) {
        try {
            const newArticle = await ArticleService.modifyById(req.params.id, req.body);
            res.send(newArticle);
        } catch (e) {
            next(e);
        }
    }

    static async findAll(req, res, next) {
        try {
            const articles = await ArticleService.findAll();
            res.send(articles);
        } catch (e) {
            next(e);
        }
    }

    static async findById(req, res, next) {
        try {
            const article = await ArticleService.findById(req.params.id);
            res.send(article);
        } catch (e) {
            next(e);
        }

    }
}

module.exports = ArticleController;
