const catchAsync = require("../utilities/catch-async");
const { scoreService } = require("../services");
const { sendResponse } = require("../utilities/responses");

exports.list = catchAsync(async (req, res) => {
    const { page, limit, sortField, sortOrder, filters } = req.query;

    const { scores, pagination } = await scoreService.list({ page, limit, sortField, sortOrder, filters });

    return sendResponse(res, scores, { pagination });
});

exports.add = catchAsync(async (req, res) => {
    const data = req.body;
    const { id } = req.auth.user;

    const score = await scoreService.add({ entity_id: data.entity_id, user_id: id, data });

    return sendResponse(res, score);
});