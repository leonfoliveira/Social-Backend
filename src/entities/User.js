"use strict";
exports.__esModule = true;
var uuidv4_1 = require("uuidv4");
var bcrypt_1 = require("bcrypt");
var User = /** @class */ (function () {
    function User(props) {
        Object.assign(this, props);
        if (!props.id) {
            this.id = uuidv4_1.uuid();
        }
        if (props.password && !props.salt) {
            this.salt = bcrypt_1["default"].genSaltSync();
            this.password = bcrypt_1["default"].hashSync(this.password, this.salt);
        }
        if (!props.followers) {
            this.followers = 0;
        }
        if (!props.following) {
            this.following = 0;
        }
    }
    return User;
}());
exports["default"] = User;
