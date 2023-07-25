const { userService } = require("../services");
const catchAsync = require("../utilities/catch-async");
const { sendResponse } = require("../utilities/responses");

exports.update = catchAsync(async (req, res) => {
    const data = req.body;

    const user = await userService.update(req.auth.user, data);

    sendResponse(res, user);
});