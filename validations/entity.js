const Joi = require("joi");

exports.list = {
    query: Joi.object({
        search: Joi.string().optional(),
        sortField: Joi.string().optional().default("created_at"),
        sortOrder: Joi.string().optional().default("desc"),
        page: Joi.number().optional().default(1),
        limit: Joi.number().optional().default(10),
        filters: Joi.object({
            type: Joi.string().valid("game", "ai", "metaverse").optional(),
            approved: Joi.boolean().forbidden().default(true),
        }).optional().default({ approved: true }),
    })
};

exports.get = {
    params: Joi.object({
        id: Joi.string().required()
    }),
    query: Joi.object({
        approved: Joi.boolean().forbidden().default(true),
    })
};

exports.create = {
    body: Joi.object({
        type: Joi.string().valid("game", "ai", "metaverse").required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        images: Joi.array().optional(),
        thumbnail: Joi.string().required(),
        zip: Joi.string().when("type", { is: "game", then: Joi.required(), otherwise: Joi.optional() }),
        iframe: Joi.string().optional(),
        link: Joi.string().optional(),
        socials: Joi.object({
            telegram: Joi.string().optional(),
            twitter: Joi.string().optional(),
            instagram: Joi.string().optional(),
            facebook: Joi.string().optional(),
            twitch: Joi.string().optional(),
            youtube: Joi.string().optional(),
            threads: Joi.string().optional()
        }).optional()
    })
};

exports.update = {
    body: Joi.object({
        name: Joi.string().optional(),
        images: Joi.array().optional(),
        description: Joi.array().optional(),
        thumbnail: Joi.string().optional(),
        zip: Joi.string().optional(),
        iframe: Joi.string().optional(),
        link: Joi.string().optional(),
        socials: Joi.object({
            telegram: Joi.string().optional(),
            twitter: Joi.string().optional(),
            instagram: Joi.string().optional(),
            facebook: Joi.string().optional(),
            twitch: Joi.string().optional(),
            youtube: Joi.string().optional(),
            threads: Joi.string().optional()
        }).optional()
    }),
    params: Joi.object({
        id: Joi.string().required()
    })
};

exports.delete = {
    params: Joi.object({
        id: Joi.string().required()
    })
};

exports.adminList = {
    query: Joi.object({
        search: Joi.string().optional(),
        sortField: Joi.string().optional().default("created_at"),
        sortOrder: Joi.string().optional().default("desc"),
        page: Joi.number().optional().default(1),
        limit: Joi.number().optional().default(10),
        filters: Joi.object({
            type: Joi.string().valid("game", "ai", "metaverse").optional(),
            approved: Joi.boolean().optional().default(true),
            status: Joi.string().optional().valid("pending", "active", "rejected"),
        }).optional(),
    })
};

exports.adminCreate = {
    body: Joi.object({
        type: Joi.string().valid("game", "ai", "metaverse").required(),
        approved: Joi.boolean().optional().default(false),
        comments: Joi.string().optional(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        images: Joi.array().optional(),
        thumbnail: Joi.string().required(),
        zip: Joi.string().when("type", { is: "game", then: Joi.required(), otherwise: Joi.optional() }),
        iframe: Joi.string().optional(),
        link: Joi.string().optional(),
        socials: Joi.object({
            telegram: Joi.string().optional(),
            twitter: Joi.string().optional(),
            instagram: Joi.string().optional(),
            facebook: Joi.string().optional(),
            twitch: Joi.string().optional(),
            youtube: Joi.string().optional(),
            threads: Joi.string().optional()
        }).optional()
    })
};

exports.adminUpdate = {
    body: Joi.object({
        approved: Joi.boolean().optional(),
        comments: Joi.string().optional(),
        name: Joi.string().optional(),
        description: Joi.string().optional(),
        images: Joi.array().optional(),
        thumbnail: Joi.string().optional(),
        zip: Joi.string().optional(),
        iframe: Joi.string().optional(),
        link: Joi.string().optional(),
        socials: Joi.object({
            telegram: {
                type: Joi.string().optional(),
            },
            twitter: {
                type: Joi.string().optional(),
            },
            instagram: {
                type: Joi.string().optional(),
            },
            facebook: {
                type: Joi.string().optional(),
            },
            twitch: {
                type: Joi.string().optional(),
            },
            youtube: {
                type: Joi.string().optional(),
            },
            threads: {
                type: Joi.string().optional(),
            }
        }).optional()
    }),
    params: Joi.object({
        id: Joi.string().required()
    })
};

exports.approve = {
    body: Joi.object({
        comments: Joi.string().required()
    }),
    params: Joi.object({
        id: Joi.string().required()
    })
};

exports.reject = {
    body: Joi.object({
        comments: Joi.string().required()
    }),
    params: Joi.object({
        id: Joi.string().required()
    })
};