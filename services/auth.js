const mongoose = require("mongoose");
const User = require("../models/users");
const mongoToJson = require("../utilities/mongo-to-json");
const { throwError } = require("../utilities/responses");

exports.login = async (wallet) => {
    let res = await User.findOne({ wallet });

    if (res) {
        res = mongoToJson(res);
    }

    return res;
};

exports.register = async ({ wallet, email, ref_code }) => {
    let res = await User.findOne({ email });

    if (!res) {
        let referrer;
        if (ref_code) {
            referrer = await User.findOne({ referrer_code: ref_code });
            if (!referrer) {
                throw throwError("Referal code does not exist", "NOT_FOUND", 404);
            }
        }


        res = await (new User({
            wallet, email,
            ...(referrer ? {referral: {
                code: ref_code,
                user: referrer._id
            }} : {}),
            referrer_code: new mongoose.Types.ObjectId()
        })).save();
    }

    res = mongoToJson(res);

    return res;
};