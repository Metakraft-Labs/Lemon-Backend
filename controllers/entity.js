const catchAsync = require("../utilities/catch-async");
const { entityService } = require("../services");
const { sendResponse } = require("../utilities/responses");

exports.list = catchAsync(async (req, res) => {
    const { page, limit, sortField, sortOrder, filters, search } = req.query;

    const { entities, pagination } = await entityService.list({ page, limit, sortField, sortOrder, filters, search });

    return sendResponse(res, entities, { pagination });
});

exports.get = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { approved } = req.query;

    const entity = await entityService.get({ id, approved });

    return sendResponse(res, entity);
});

exports.create = catchAsync(async (req, res) => {
    const data = req.body;
    const { id } = req.auth.user;

    const entity = await entityService.create({ user_id: id, data });

    return sendResponse(res, entity);
});

exports.update = catchAsync(async (req, res) => {
    const data = req.body;
    const { id } = req.params;

    const entity = await entityService.update({ id, data });

    return sendResponse(res, entity);
});

exports.delete = catchAsync(async (req, res) => {
    const { id } = req.params;

    const entity = await entityService.delete(id);

    return sendResponse(res, entity);
});

exports.approve = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { comments } = req.body;
    const { user_id } = req.auth.user;

    const entity = await entityService.update({ id: id, data: { comments, approved: true, approved_by: user_id, status: "active" } });

    return sendResponse(res, entity);
});

exports.reject = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { comments } = req.body;
    const { user_id } = req.auth.user;

    const entity = await entityService.update({ id: id, data: { comments, approved: false, approved_by: user_id, status: "rejected" } });

    return sendResponse(res, entity);
});