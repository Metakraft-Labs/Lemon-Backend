const Joi = require("joi");

exports.list = {
    query: Joi.object({
        search: Joi.string().optional(),
        sortField: Joi.string().optional().default("created_at"),
        sortOrder: Joi.string().optional().default("desc"),
        page: Joi.number().optional().default(1),
        limit: Joi.number().optional().default(10),
        filters: Joi.object({
            entity_id: Joi.string().optional(),
            user_id: Joi.string().default(true),
        }).optional(),
    })
};

exports.add = {
    body: Joi.object({
        entity_id: Joi.string().required(),
        score: Joi.object({
            score: Joi.number().required(),
            date: Joi.date().required(),
        }).optional(),
        timeplayed: Joi.object({
            time: Joi.number().required(),
            date: Joi.date().required(),
        }).optional()
    })
};