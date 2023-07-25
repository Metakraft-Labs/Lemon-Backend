const { authService } = require("../services");
const sessionService = require("../services/sessions");
const catchAsync = require("../utilities/catch-async");
const { sendResponse } = require("../utilities/responses");

exports.login = catchAsync(async (req, res) => {
    const { wallet } = req.body;
    const user = await authService.login(wallet);

    let token = null;
    if (user) {
        const ip = (
            req.headers["x-forwarded-for"] ||
            req.socket.remoteAddress ||
            ""
        );
        const user_agent = req.headers['user-agent'];

        token = await sessionService.create(user.id, ip, user_agent);
    }

    return sendResponse(res, token);
});

exports.register = catchAsync(async (req, res) => {
    const { wallet, email, ref_code } = req.body;
    const user = await authService.register({ wallet, email, ref_code });

    const ip = (
        req.headers["x-forwarded-for"] ||
        req.socket.remoteAddress ||
        ""
    );
    const user_agent = req.headers['user-agent'];

    token = await sessionService.create(user.id, ip, user_agent);

    return sendResponse(res, token);
});