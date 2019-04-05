'use strict';

const {forEach} = require('lodash');

class CommonController {
    constructor(service) {
        this._service = service;
    }

    /**
     * Fetch all occurrence of current service
     */
    async fetch(req, res, next) {
        try {
            const {skip} = req.query;

            const result = await this._service.fetch({}, skip || 0);
            const {total, size} = await this._service.getPagination();
            res.send({
                result, size, total
            });
        } catch (err) {
            next(err);
        }
    }

    /**
     * Search by term, termKeys are required
     * @param {Array} termKeys
     */
    async findByTerm(req, res, next, termKeys) {
        const filter = {$or: []};
        const {term} = req.query;
        const regexp = new RegExp(`${term}`, 'i');
        // eslint-disable-next-line
        forEach(termKeys, terms =>
            filter.$or.push({[terms]: regexp})
        );
        try {
            const result = await this._service.fetch(filter);
            res.send(result);
        } catch (err) {
            next(err);
        }
    }
    /**
     * Params that where passed using express
     * will send all occurrence that match the params
     */
    async fetchByParams(req, res, next) {
        try {
            const result = await this._service.fetch(req.params);
            res.send(result);
        } catch (err) {
            next(err);
        }
    }

    /**
     * Params that where passed using express
     * will send the first occurrence that match the params
     */
    async fetchOneByParams(req, res, next) {
        try {
            const result = await this._service.fetchOne(req.params);
            res.send(result);
        } catch (err) {
            next(err);
        }
    }

    /**
     * Query that where passed using express
     * will send all occurrence that match the query
     */
    async fetchByQuery(req, res, next) {
        try {
            const result = await this._service.fetch(req.query);
            res.send(result);
        } catch (err) {
            next(err);
        }
    }

    /**
     * Query that where passed using express
     * will send the first occurrence that match the query
     */
    async fetchOneByQuery(req, res, next) {
        try {
            const result = await this._service.fetchOne(req.query);
            res.send(result);
        } catch (err) {
            next(err);
        }
    }

    async saveOne(req, res, next) {
        try {
            const result = await this._service.saveOne(req.params, req.body);
            res.send(result);
        } catch (err) {
            next(err);
        }
    }

    async saveMany(req, res, next) {
        try {
            const result = await this._service.saveMany(req.body);
            res.send(result);
        } catch (err) {
            next(err);
        }
    }

    async deleteOne(req, res, next) {
        try {
            const result = await this._service.deleteOne(req.body);
            res.send(result);
        } catch (err) {
            next(err);
        }
    }

    async deleteMany(req, res, next) {
        try {
            const result = await this._service.deleteMany(req.body);
            res.send(result);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = CommonController;
