const addressService = require("../service/address-service.js")

const create = async (req, res, next) => {
    try {
        const contactId = req.user.contacts.id;
        const result = await addressService.createAddress(contactId, req.body);
        res.json({
            status: 200,
            message: "OK",
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        const id = req.params.id;
        const contactId = req.user.contacts.id;
        const result = await addressService.updateAddress(contactId, id, req.body);
        res.json({
            status: 200,
            message: "OK",
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const get = async (req, res, next) => {
    try {
        const id = req.params.id;
        const contactId = req.user.contacts.id;
        const result = await addressService.getAddressByIdUsername(contactId, id);
        res.json({
            status: 200,
            message: "OK",
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const getAll = async (req, res, next) => {
    try {
        const contactId = req.query.contactId;
        const result = await addressService.getAllAddressByUsername(contactId);
        res.json({
            status: 200,
            message: "OK",
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const addressDelete = async (req, res, next) => {
    try {
        const contactId = req.user.contacts.id
        const id = req.params.id;
        await addressService.deleteAddress(contactId, id);
        res.json({
            status: 200,
            message: "OK"
        });
    } catch (e) {
        next(e)
    }
}

module.exports = {
    create,
    update,
    get,
    getAll,
    addressDelete
}