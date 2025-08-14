const { createUpdateAddressSchema, validIdSchema } = require("../validation/address-validation.js");
const { validate } = require("../validation/validation.js");
const db = require("../utilities/database");
const { ResponseError } = require("../error/response-error.js");
const { getIdSchema } = require("../validation/contact-validation.js");

const createAddress = async (contactId, request) => {
    contactId = validate(getIdSchema, contactId);
    const address = validate(createUpdateAddressSchema, request);
    const contact = await getContactById(contactId);
    
    const newAddress = {
        street: address.street,
        city: address.city,
        province: address.province,
        country: address.country,
        postalCode: address.postalCode,
        contactId: contact.id
    };

    await db.saveData(newAddress, "Address");
    return newAddress;
};

const updateAddress = async (contactId, id, request) => {
    contactId = validate(getIdSchema, contactId);
    id = validate(validIdSchema, id);
    const addressRequest = validate(createUpdateAddressSchema, request);
    const contact = await getContactById(contactId);

    const payload = {
        street: addressRequest.street,
        city: addressRequest.city,
        province: addressRequest.province,
        country: addressRequest.country,
        postalCode: addressRequest.postalCode
    };
    await db.updateData({id: id, contactId: contact.id}, payload, "Address");
    return payload;
};

const getAddressByIdUsername = async (contactId, id) => {
    contactId = validate(getIdSchema, contactId);
    id = validate(validIdSchema, id);
    const contact = await getContactById(contactId);
    const address = await findByIdAndContactId(id, contact.id);
    return address;
};

const getAllAddressByUsername = async (contactId) => {
    contactId = validate(getIdSchema, contactId);
    const contact = await getContactById(contactId);
    const address = await db.findAllData({contactId: contact.id}, "Address", [["id", "asc"]]);
    return address;
};

const deleteAddress = async (contactId, id) => {
    contactId = validate(getIdSchema, contactId);
    id = validate(validIdSchema, id);
    const contact = await getContactById(contactId);
    return await db.deleteData({id: id, contactId: contact.id}, "Address");
};

const getContactById = async (id) => {
    const contact = await db.findOneByCondition({id: id}, "Contacts", ["id", "firstName", "lastName", "email", "phone"]);
    if (contact === null) {
        throw new ResponseError(404, "Contact Not Found");
    }
    return contact;
};

const findByIdAndContactId = async (id, contactId) => {
    const address = await db.findOneByCondition({id: id, contactId: contactId}, "Address", ["street", "city", "province", "country", "postalCode", "contactId"]);
    if (address === null) {
        throw new ResponseError(404, "Address Not Found");
    }
    return address;
};

module.exports = {
    createAddress,
    updateAddress,
    getAddressByIdUsername,
    getAllAddressByUsername,
    deleteAddress
};