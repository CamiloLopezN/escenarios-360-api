require('dotenv').config();
const axios = require('axios');

module.exports.authorize = () => {
    return async (req, res, next) => {
        try {
            return await axios.get(process.env.API_AUTH, {
                headers: {
                    Authorization:
                    req.headers.authorization
                }
            }).then(async res => {
                if (res.data.status === true)
                    return next();
                else
                    return next('Usuario inválido')
            });
        } catch (e) {
            return res.status(500).json({message: 'Internal server error'});
        }
    };
};
