const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    user:{ type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    text: String,
    tags: [String]
}, {timestamps: true});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
