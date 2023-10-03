const { validate } = require("../validation/validation")
const { createVoucherSchema } = require("../validation/voucher-validation")
const db = require("../utilities/database");
const { ResponseError } = require("../error/response-error");

const createVoucher = async (request) => {
    const payload = validate(createVoucherSchema, request);

    const voucher = await db.findOneByCondition({voucherCode: payload.voucherCode}, "Vouchers");
    if (voucher) {
        throw new ResponseError(400, "Voucher already exists")
    }

    const createVoucher = await db.saveData(payload, "Vouchers");
    return createVoucher;
}

module.exports = {
    createVoucher
}