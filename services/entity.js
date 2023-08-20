const mongoose = require("mongoose");
const Entity = require("../models/entities");
const generatePagination = require("../utilities/generate-pagination");
const { throwError } = require("../utilities/responses");
const { flatten } = require("../utilities/objects");
const toJSON = require("../utilities/mongo-to-json");

exports.list = async ({ page, limit, sortOrder, sortField, filters = {}, search }) => {
    const { page: pageNumber, limit: perPage, skip, sort } = generatePagination.getPagination({ page, limit, sortOrder, sortField });
    const searchRegex = RegExp(search, "ig");

    const query = [
        {
            $match: {
                ...filters,
                $or: [
                    {
                        name: { $regex: searchRegex }
                    },
                    {
                        description: { $regex: searchRegex }
                    }
                ]
            }
        },
        {
            $facet: {
                entities: [
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
                        $set: {
                            user: {
                                $arrayElemAt: ["$user", 0]
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
                            thumbnail: 1,
                            description: 1,
                            type: 1,
                            created_at: 1,
                            updated_at: 1,
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

    const res = await Entity.aggregate(query);

    let entities = res[0].entities;
    const total = res[0].total;

    const pagination = generatePagination({ page: pageNumber, limit: perPage, skip, total });

    return { entities, pagination };
};

exports.create = async ({ user_id, data }) => {
    let res = await (new Entity({
        user_id,
        slug: new mongoose.Types.ObjectId(),
        ...data
    })).save();

    res = toJSON(res);

    return res;
};

exports.get = async ({ id, approved }) => {
    let entity = await Entity.findOne({ _id: id, approved });

    if (entity) {
        entity = toJSON(entity);
        return entity;
    }
    else {
        throw throwError("The entity does not exist", "NOT_FOUND", 404);
    }
};

exports.update = async ({ id, data }) => {
    data = flatten(data);
    let entity = await Entity.findOneAndUpdate({ _id: id }, { ...data }, { new: true });

    if (entity) {
        entity = toJSON(entity);
        return entity;
    }
    else {
        throw throwError("The entity does not exist", "NOT_FOUND", 404);
    }
};

exports.delete = async (id) => {
    let entity = await Entity.findOneAndDelete({ _id: id });

    if (entity) {
        return true;
    }
    else {
        throw throwError("The entity does not exist", "NOT_FOUND", 404);
    }
};