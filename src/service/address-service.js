const { createUpdateAddressSchema, validIdSchema } = require("../validation/address-validation.js");
const { validate } = require("../validation/validation.js")
const { Contacts, Address } = require("../../models");
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
    }
    return await Address.create(newAddress);
}

const updateAddress = async (contactId, id, request) => {
    contactId = validate(getIdSchema, contactId);
    id = validate(validIdSchema, id);
    const addressRequest = validate(createUpdateAddressSchema, request);
    const contact = await getContactById(contactId);
    const address = await findByIdAndContactId(id, contact.id)

    address.street = addressRequest.street,
    address.city = addressRequest.city,
    address.province = addressRequest.province,
    address.country = addressRequest.country,
    address.postalCode = addressRequest.postalCode

    return await address.save();
}

const getAddressByIdUsername = async (contactId, id) => {
    contactId = validate(getIdSchema, contactId);
    id = validate(validIdSchema, id);
    const contact = await getContactById(contactId);
    const address = await findByIdAndContactId(id, contact.id)
    return address;
}

const getAllAddressByUsername = async (contactId) => {
    contactId = validate(getIdSchema, contactId);
    const contact = await getContactById(contactId);
    const address = await Address.findAll({
        where: {
            contactId: contact.id
        },
        order: [["id", "asc"]]
    });

    return address
}

const deleteAddress = async (contactId, id) => {
    contactId = validate(getIdSchema, contactId);
    id = validate(validIdSchema, id);
    const contact = await getContactById(contactId);
    const address = await findByIdAndContactId(id, contact.id)
    return await address.destroy();
}

const getContactById = async (id) => {
    const contact = await Contacts.findOne({
        where: {
            id: id
        }
    });

    if (contact === null) {
        throw new ResponseError(404, "Contact Not Found");
    }
    return contact;
}

const findByIdAndContactId = async (id, contactId) => {
    const address = await Address.findOne({
        where: {
            id: id,
            contactId: contactId
        }
    });
    if (address === null) {
        throw new ResponseError(404, "Address Not Found");
    }
    return address;
}

module.exports = {
    createAddress,
    updateAddress,
    getAddressByIdUsername,
    getAllAddressByUsername,
    deleteAddress
}