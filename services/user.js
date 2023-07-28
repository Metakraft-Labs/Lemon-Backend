const User = require("../models/users");
const mongoToJson = require("../utilities/mongo-to-json");
const { throwError } = require("../utilities/responses");
const { flatten } = require("../utilities/objects");

exports.update = async (user, data) => {
    if (data.wallet && user.wallet) {
        throw throwError("User already has a wallet", "BAD_REQUEST", 400);
    }

    data = flatten(data);
    let res = await User.findByIdAndUpdate(user.id, data, { new: true });

    if (!res) {
        throw throwError("User does not exist", "NOT_FOUND", 404);
    }

    res = mongoToJson(res);

    return res;
};