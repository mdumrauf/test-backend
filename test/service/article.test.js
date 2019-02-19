
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
            'title': 'A wonderful title',
            'text': 'A very short text.',
            'user': '5c5de02dd2c29712d4aa2fdd',
            'tags': ['test', 'foo', 'bar', 'baz']
        };
        const article2 = {
            'title': 'Another title',
            'text': 'Some text.',
            'user': '5c5de02dd2c29712d4aa2fdd',
            'tags': ['bar', 'baz']
        };

        it('should return empty array when there are no articles', async() => {
            const all = await ArticleService.findAll([]);
            all.should.be.empty();
        });

        it('should return all articles when not tags specified', async() => {
            await ArticleService.create(article1);
            await ArticleService.create(article2);
            const all = await ArticleService.findAll([]);
            all.should.have.lengthOf(2);
        });

        it('should return a single article when filter tag specified', async() => {
            const newArt1 = await ArticleService.create(article1);
            await ArticleService.create(article2);

            const all = await ArticleService.findAll(['test']);
            all.should.have.lengthOf(1);
            all[0]._id.should.be.eql(newArt1._id);
        });

    });

});
