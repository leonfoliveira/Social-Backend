"use strict";
exports.__esModule = true;
var knex_1 = require("knex");
var knexfile_1 = require("../../knexfile");
var initialize = function () {
    switch (process.env.NODE_ENV) {
        case 'test':
            return knex_1["default"](knexfile_1["default"].test);
        case 'production':
            return knex_1["default"](knexfile_1["default"].production);
        case 'development':
        default:
            return knex_1["default"](knexfile_1["default"].development);
    }
};
exports["default"] = initialize();
