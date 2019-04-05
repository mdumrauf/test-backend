const Controller = require('../../controllers/article');

const termKeys = ['title', 'text', 'tags'];

module.exports = router => {
    const controller = new Controller();

    router.get('/', (req, res, next) => controller.fetch(req, res, next));
    router.get('/:id', (req, res, next) => controller.fetchOneByParams(req, res, next));
    router.post('/', (req, res, next) => controller.saveOne(req, res, next));
    router.patch('/:id', (req, res, next) => controller.saveOne(req, res, next));
    router.delete('/:id', (req, res, next) => controller.deleteOne(req, res, next));
    router.get('/find', (req, res, next) => controller.findByTerm(req, res, next, termKeys));
    
    return router;
};
