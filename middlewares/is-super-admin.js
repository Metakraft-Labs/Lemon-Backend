const catchAsync = require("../utilities/catch-async");
const { throwError } = require("../utilities/responses");

module.exports = catchAsync(async (req, res, next) => {
    const user = req.auth?.user;
    if (user) {
        if (user.type === "super-admin") {
            next();
        }
        else {
            throw throwError("User is not a super admin", "NOT_ALLOWED", 405);
        }
    }
    else {
        throw throwError("User is not logged in", "FORBIDDEN", 403);
    }
});