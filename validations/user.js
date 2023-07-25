const Joi = require("joi");

exports.update = {
    body: Joi.object({
        wallet: Joi.string()
    })
};