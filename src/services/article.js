
const {ObjectId} = require('mongoose').Types;

const Article = require('../models/article');

class ArticleService {

    static async create(article) {
        return Article.create(article);
    }

    static async deleteById(id) {
        return Article.deleteOne({_id: ObjectId(id)});
    }

    static async modifyById(id, article) {
        return Article.findOneAndUpdate({_id: ObjectId(id)}, article, {new: true, lean: true});
    }

    static async findAll() {
        return Article.find().lean().exec();
    }

    static async findById(id) {
        return Article.findOne({_id: ObjectId(id)});
    }

}

module.exports = ArticleService;
