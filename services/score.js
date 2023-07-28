const Score = require("../models/scores");
const generatePagination = require("../utilities/generate-pagination");
const { throwError } = require("../utilities/responses");
const toJSON = require("../utilities/mongo-to-json");

exports.list = async ({ page, limit, sortOrder, sortField, filters = {} }) => {
    const { page: pageNumber, limit: perPage, skip, sort } = generatePagination.getPagination({ page, limit, sortOrder, sortField });

    const query = [
        {
            $match: {
                ...filters
            }
        },
        {
            $facet: {
                scores: [
                    {
                        $sort: sort
                    },
                    {
                        $skip: skip
                    },
                    {
                        $limit: perPage
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "user_id",
                            foreignField: "_id",
                            as: "user"
                        }
                    },
                    {
                        $lookup: {
                            from: "entities",
                            localField: "entity_id",
                            foreignField: "_id",
                            as: "entity"
                        }
                    },
                    {
                        $set: {
                            user: {
                                $arrayElemAt: ["$user", 0]
                            },
                            entity: {
                                $arrayElemAt: ["$entity", 0]
                            }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            id: "$_id",
                            name: 1,
                            user: {
                                id: "$user._id",
                                name: "$user.name",
                                photo: "$user.photo",
                            },
                            entity: {
                                id: "$entity._id",
                                name: "$entity.name"
                            },
                            scores: 1,
                            timesplayed: 1,
                        }
                    }
                ],
                total: [
                    {
                        $count: "total"
                    }
                ]
            }
        },
        {
            $set: {
                total: {
                    $ifNull: [{ $arrayElemAt: ["$total.total", 0] }, 0]
                }
            }
        }
    ];

    const res = await Score.aggregate(query);

    let scores = res[0].scores;
    const total = res[0].total;

    const pagination = generatePagination({ page: pageNumber, limit: perPage, skip, total });

    return { scores, pagination };
};

exports.add = async ({ entity_id, user_id, data }) => {
    let res = await Score.findOneAndUpdate({ entity_id, user_id }, { $push: { ...(data.score ? {scores: data.score} : {}), ...(data.timeplayed ? {timesplayed: data.timeplayed} : {}) } }, { new: true, upsert: true });

    res = toJSON(res);

    return res;
};