
const crudService = require('./crud');
const {ObjectId} = require('mongoose').Types;
const {isEmpty} = require('lodash');

const Article = require('../models/article');

class ArticleService extends crudService{
    constructor() {
        super(Article);
    }

    static async create(article) {
        return this._model.create(article);
    }

    static async deleteById(id) {
        return this._model.findOneAndDelete({_id: ObjectId(id)});
    }

    static async modifyById(id, article) {
        return this._model.findOneAndUpdate({_id: ObjectId(id)}, article, {new: true, lean: true});
    }

    static async findAll(tags) {
        const query = this._model.find();
        if (!isEmpty(tags)) {
            query.in('tags', tags);
        }
        return query.lean().exec();
    }

    static async findById(id) {
        return this._model.findOne({_id: ObjectId(id)});
    }

}

module.exports = ArticleService;
