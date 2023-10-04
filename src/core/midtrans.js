const midtransClient = require("midtrans-client");

const midtrans = new midtransClient.CoreApi({
    isProduction : false,
    serverKey : 'SB-Mid-server-YTwpAmC8quiaFEKRmMpQA1oe',
    clientKey : 'SB-Mid-client-9wslheKdWr5zvJoE'
})

module.exports = {
    midtrans
}