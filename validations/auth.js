const Joi = require("joi");

exports.login = {
    body: Joi.object({
        wallet: Joi.string().required(),
    })
};

exports.register = {
    body: Joi.object({
        wallet: Joi.string().optional().allow(null).default(null),
        email: Joi.string().email().required(),
        ref_code: Joi.string().optional(),
    })
};