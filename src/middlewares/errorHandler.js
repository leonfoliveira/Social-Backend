"use strict";
exports.__esModule = true;
var celebrate_1 = require("celebrate");
exports["default"] = (function (error, _req, res, next) {
    if (res.headersSent) {
        return next(error);
    }
    if (celebrate_1.isCelebrate(error)) {
        error.status = 400;
    }
    return res.status(error.status || 500).send({ error: error.message });
});
