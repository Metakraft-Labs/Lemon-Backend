const User = require("../models/users");
const sessionService = require("../services/sessions");
const catchAsync = require("../utilities/catch-async");
const { throwError } = require("../utilities/responses");
const { verifyToken } = require("../utilities/jwt");

module.exports = catchAsync(async (req, res, next) => {
    const token = req.header('authorization');
    if (token) {
        let sessionId;

        try {
            const data = verifyToken(token.replace("Bearer ", ""));
            sessionId = data.session;
        }
        catch (err) {
            throw throwError("Invalid auth token provided", "BAD_REQUEST", 400);
        }

        const ip = (
            req.headers["x-forwarded-for"] ||
            req.socket.remoteAddress ||
            ""
        );
        const user_agent = req.headers["user-agent"];

        const session = await sessionService.verifySession(sessionId, ip, user_agent);
        let user = await User.findById(session.user_id);

        if (!user) {
            throw throwError("User does not exist", "NOT_FOUND", 404);
        }
        user = user.toObject();
        user.id = user._id;
        const referrals = await User.find({ "referral.user": user.id }).select("name").lean().exec();
        user.referrals = referrals;
        delete user["_id"]; delete user["__v"]; delete user["password"];
        
        req.auth = { ...(req.auth || {}), user: user };
        next();
    }
    else {
        throw throwError("Invalid session", "FORBIDDEN", 403);
    }
});