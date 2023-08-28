const catchAsync = require("../utilities/catch-async");
const { uploadService } = require("../services");
const { sendResponse } = require("../utilities/responses");

exports.upload = catchAsync(async (req, res) => {
    const { file } = req.files;

    const data = await uploadService.upload(file);

    return sendResponse(res, data);
});

exports.s3 = catchAsync(async (req, res) => {
    const { slug } = req.body;
    const { file } = req.files;

    const data = await uploadService.s3(file, slug);

    return sendResponse(res, data);
});

exports.singleS3 = catchAsync(async (req, res) => {
    const { file } = req.files;

    const data = await uploadService.singleS3(file);

    return sendResponse(res, data);
});
