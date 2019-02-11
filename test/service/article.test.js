
require('should');

const MongooseHelper = require('../helpers/mongoose');
const ArticleService = require('../../src/services/article');


describe('Article service', () => {
    let mongoose;

    beforeEach(async() => {
        mongoose = await MongooseHelper.configure();
    });
    afterEach(() => {
        mongoose.connection.close();
    });


    context('#findAll()', () => {
        const article1 = {
            "title": "A wonderful title",
            "text": "A very short text.",
            "user": "5c5de02dd2c29712d4aa2fdd",
            "tags": ["test", "foo", "bar", "baz"]
        };
        const article2 = {
            "title": "Another title",
            "text": "Some text.",
            "user": "5c5de02dd2c29712d4aa2fdd",
            "tags": ["bar", "baz"]
        };

        it('should return empty array when there are no articles', function(done) {
            ArticleService.findAll([])
                .then(all => all.should.be.empty())
                .then(() => done());
        });

        it('should return all articles when not tags specified', function(done) {
            Promise.all([ArticleService.create(article1), ArticleService.create(article2)])
                .then(() => ArticleService.findAll([]))
                .then(all => {
                    all.should.have.lengthOf(2);
                })
                .then(done, done);
        });

        it('should return a single article when filter tag specified', function(done) {
            let newArt1;
            Promise.all([ArticleService.create(article1), ArticleService.create(article2)])
                .then(([art1, __]) => {
                    newArt1 = art1;
                    return ArticleService.findAll(['test'])
                })
                .then(all => {
                    all.should.have.lengthOf(1);
                    all[0]._id.should.be.eql(newArt1._id);
                })
                .then(done, done);
        });

    });

});
