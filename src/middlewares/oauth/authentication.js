require('dotenv').config();

module.exports.authorize = (authorizedUser) => {
    return async (req, res, next) => {
        console.log(authorizedUser)
        return next();
    };
};
