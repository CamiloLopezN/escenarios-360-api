require('dotenv').config();


module.exports.authorize = (authorizedUser) => {
    return async (req, res, next) => {
        return next();
    };
};
