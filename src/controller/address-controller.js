const addressService = require("../service/address-service.js");

const create = async (req, res, next) => {
    try {
        const contactId = req.user.contacts.id;
        const result = await addressService.createAddress(contactId, req.body);
        req.data = result;
        next();
    } catch (e) {
        next(e);
    }
};

const update = async (req, res, next) => {
    try {
        const id = req.params.id;
        const contactId = req.user.contacts.id;
        const result = await addressService.updateAddress(contactId, id, req.body);
        req.data = result;
        next();
    } catch (e) {
        next(e);
    }
};

const get = async (req, res, next) => {
    try {
        const id = req.params.id;
        const contactId = req.user.contacts.id;
        const result = await addressService.getAddressByIdUsername(contactId, id);
        req.data = result;
        next();
    } catch (e) {
        next(e);
    }
};

const getAll = async (req, res, next) => {
    try {
        const contactId = req.query.contactId;
        const result = await addressService.getAllAddressByUsername(contactId);
        req.data = result;
        next();
    } catch (e) {
        next(e);
    }
};

const addressDelete = async (req, res, next) => {
    try {
        const contactId = req.user.contacts.id;
        const id = req.params.id;
        await addressService.deleteAddress(contactId, id);
        req.message = "Successfully delete your address";
        next();
    } catch (e) {
        next(e);
    }
};

module.exports = {
    create,
    update,
    get,
    getAll,
    addressDelete
};