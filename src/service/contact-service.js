const { createUpdateContactSchema, getIdSchema } = require("../validation/contact-validation.js")
const { getByUsernameSchema } = require("../validation/users-validation.js")
const { validate } = require("../validation/validation.js")
const db = require("../utilities/database")
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
    const create = await db.saveData(contactCreate, "Contacts");
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

    const payload = {
        firstName: contactUser.firstName,
        lastName: contactUser.lastName,
        email: contactUser.email,
        phone: contactUser.phone
    }
    await db.updateData({id: id}, payload, "Contacts")
    return contactUser;
}

const getContactById = async (username) => {
    username = validate(getByUsernameSchema, username);
    const contact = await db.findOneByCondition({username: username}, "Contacts", ["firstName", "lastName", "email", "phone", "username"], ["address"]);
    return contact;
}

const deleteContact = async (username) => {
    username = validate(getByUsernameSchema, username);
    return await db.deleteData({username: username}, "Contacts");
}

const getUserByUsername = async (username) => {
    const user = await db.findOneByCondition({username: username}, "Users", ["username"])
    if (user === null) {
        throw new ResponseError(404, "User Not Found");
    }
    return user;
}

const findByIdAndUsername = async (id, username) => {
    const contact = await db.findOneByCondition({id: id, username: username}, "Contacts", ["firstName", "lastName", "email", "phone", "username"]);
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