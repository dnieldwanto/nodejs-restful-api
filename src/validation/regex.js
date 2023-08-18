module.exports = {
    validateUsername: /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,}$/,
    validatePassword: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
};