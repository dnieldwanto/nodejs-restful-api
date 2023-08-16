const contactService = require("../service/contact-service.js")

const create = async (req, res, next) => {
    try {
        const username = req.user.username;
        const result = await contactService.createContact(username, req.body);
        req.data = result;
        next();
    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        const username = req.user.username;
        const id = req.params.id;
        const result = await contactService.updateContact(username, id, req.body);
        req.data = result;
        next();
    } catch (e) {
        next(e);
    }
}

const getById = async(req, res, next) => {
    try {
        const username = req.user.username
        const result = await contactService.getContactById(username);
        req.data = result;
        next();
    } catch (e) {
        next(e);
    }
}

const deleteContact = async(req, res, next) => {
    try {
        const username = req.user.username;
        await contactService.deleteContact(username);
        req.message = "Successfully delete your contact";
        next();
    } catch (e) {
        next(e);
    }
}

module.exports= {
    create,
    update,
    getById,
    deleteContact
}