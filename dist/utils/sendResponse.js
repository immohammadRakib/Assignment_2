"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = sendResponse;
function sendResponse(res, { message, data, error }, status = 200) {
    res.status(status).json({
        success: error ? false : true,
        message: message,
        data: error ? null : data,
    });
}
//# sourceMappingURL=sendResponse.js.map