"use strict";
exports.__esModule = true;
var uuidv4_1 = require("uuidv4");
var Follow = /** @class */ (function () {
    function Follow(props) {
        Object.assign(this, props);
        if (!props.id) {
            this.id = uuidv4_1.uuid();
        }
    }
    return Follow;
}());
exports["default"] = Follow;
