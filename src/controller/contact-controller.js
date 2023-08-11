const contactService = require("../service/contact-service.js")

const create = async (req, res, next) => {
    try {
        const username = req.user.username;
        const result = await contactService.createContact(username, req.body);
        res.json({
            status: 200,
            message: "Successfully create contact",
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        const username = req.user.username;
        const id = req.params.id;
        const result = await contactService.updateContact(username, id, req.body);
        res.json({
            status: 200,
            message: "OK",
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const getById = async(req, res, next) => {
    try {
        const id = req.query.id;
        const username = req.user.username
        const result = await contactService.getContactById(username, id);
        res.json({
            status: 200,
            message: "OK",
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const deleteContact = async(req, res, next) => {
    try {
        const id = req.params.id;
        await contactService.deleteContact(id);
        res.json({
            status: 200,
            message: "OK"
        })
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