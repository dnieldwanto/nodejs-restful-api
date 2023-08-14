const { createUpdateContactSchema, getIdSchema } = require("../validation/contact-validation.js")
const { getByUsernameSchema } = require("../validation/users-validation.js")
const { validate } = require("../validation/validation.js")
const { Users, Contacts } = require("../models")
const { ResponseError } = require("../error/response-error.js")

const createContact = async (username, request) => {
    username = validate(getByUsernameSchema, username);
    const contact = validate(createUpdateContactSchema, request);
    const user = await getUserByUsername(username);
    
    const contactCreate = {
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phone: contact.phone,
        username: user.username
    }
    const create = await Contacts.create(contactCreate);
    return create;
}

const updateContact = async (username, id, request) => {
    username = validate(getByUsernameSchema, username);
    id = validate(getIdSchema, id);
    const contactRequest = validate(createUpdateContactSchema, request);
    const user = await getUserByUsername(username);
    const contactUser = await findByIdAndUsername(id, user.username)

    contactUser.firstName = contactRequest.firstName;
    contactUser.lastName = contactRequest.lastName;
    contactUser.email = contactRequest.email;
    contactUser.phone = contactRequest.phone;
    return await contactUser.save();
}

const getContactById = async (username) => {
    username = validate(getByUsernameSchema, username);
    const contact = await Contacts.findOne({
        where: {
            username: username
        },
        include: ["address"]
    })
    return contact;
}

const deleteContact = async (username) => {
    username = validate(getByUsernameSchema, username);
    const contact = await Contacts.findOne({
        where: {
            username: username
        }
    });

    if (contact === null) {
        throw new ResponseError(404, "Contacts Not Found");
    };

    return await contact.destroy();
}

const getUserByUsername = async (username) => {
    const user = await Users.findOne({
        where: {
            username: username
        }
    });

    if (user === null) {
        throw new ResponseError(404, "User Not Found");
    }
    return user;
}

const findByIdAndUsername = async (id, username) => {
    const contact = await Contacts.findOne({
        where: {
            id: id,
            username: username
        },
        include: ["address"]
    });

    if (contact === null) {
        throw new ResponseError(404, "Contacts Not Found");
    };
    return contact;
}

module.exports = {
    createContact,
    updateContact,
    getContactById,
    deleteContact
}