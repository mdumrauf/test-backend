'use strict';
const {ceil, map} = require('lodash');

const {DEFAULT_PAGE_SIZE} = require('../constants');

module.exports = class Common {
    constructor(model) {
        /**
         * @var {mongoose.model}
         */
        this._model = model;
    }

    /**
     * Filters to find the wanted results
     * it will return an array of objects
     * @param {Object} filters
     * @returns {Array<Object>}
     */
    fetch(filters, skip) {
        if (skip !== undefined) {
            return this._model.find(filters).skip(skip * DEFAULT_PAGE_SIZE || 0).limit(DEFAULT_PAGE_SIZE).lean().exec();
        }
        return this._model.find(filters).lean().exec();
    }

    async getPagination() {
        /**
         * @type {mongoose.model}
         */
        const total = await this._model.countDocuments({}).exec();
        const size = ceil(total / DEFAULT_PAGE_SIZE);
        return {total, size};
    }

    /**
     * Filters to find the wanted result
     * it will return only one result
     * @param {Object} filters
     * @returns {Object}
     */
    fetchOne(filters) {
        return this._model.findOne(filters).lean().exec();
    }

    /**
     * params to find the object to be updated
     * object the values of the objects to update
     * will create by default if object its undefined
     * return false if fail, object that where update on success
     * @param {Object} params
     * @param {Object} object
     * @returns {Bool|Object}
     */
    saveOne(params, object) {
        return this._model.updateOne(params || {_id: object._id}, object, {upsert: true}).lean().exec();
    }

    /**
     * object the values of the objects to update
     * will create by default if object its undefined
     * return false if fail, array of object that where updated on success
     * @param {Array<Object>} objects
     * @returns {Bool|Object}
     */
    saveMany(objects) {
        return Promise.all(
            map(objects, obj => this._model.updateOne({_id: obj._id}, obj, {upsert: true}).lean().exec())
        );
    }

    /**
     * params to find the object to be deleted
     * return boolean
     * @param {Object} params
     * @returns {Bool}
     */
    deleteOne(params) {
        return this._model.deleteOne({_id: params._id}).lean().exec();
    }

    /**
     * objects to be deleted
     * return array of boolean
     * @param {Array<Object>} objects
     * @returns {Array<Bool>}
     */
    deleteMany(objects) {
        return Promise.all(
            map(objects, obj => this._model.deleteOne({_id: obj._id}).lean().exec())
        );
    }
};
