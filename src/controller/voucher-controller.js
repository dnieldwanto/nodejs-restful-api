const voucherService = require("../service/vouchers-service");

const createVoucher = async (req, res, next) => {
    try {
        const body = req.body;
        const result = await voucherService.createVoucher(body);
        req.message = "Voucher created successfully"
        req.data = result;
        next();
    } catch (e) {
        next(e);
    }
}

module.exports = {
    createVoucher
}