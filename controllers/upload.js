const catchAsync = require("../utilities/catch-async");
const { uploadService } = require("../services");
const { sendResponse } = require("../utilities/responses");

exports.upload = catchAsync(async (req, res) => {
    const { file } = req.files;

    const data = await uploadService.upload(file);

    return sendResponse(res, data);
});
