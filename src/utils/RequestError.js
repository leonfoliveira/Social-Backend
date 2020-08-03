"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var RequestError = /** @class */ (function (_super) {
    __extends(RequestError, _super);
    function RequestError(status, message) {
        var _this = _super.call(this, message) || this;
        _this.status = status;
        _this.message = message;
        return _this;
    }
    RequestError.REPEATED_EMAIL = new RequestError(400, 'email already exists');
    RequestError.REPEATED_TAG = new RequestError(400, 'tag already exists');
    RequestError.REPEATED_FOLLOW = new RequestError(400, 'already following');
    RequestError.USER_NOT_FOUND = new RequestError(404, 'user not found');
    RequestError.POST_NOT_FOUND = new RequestError(404, 'post not found');
    RequestError.FOLLOWER_NOT_FOUND = new RequestError(404, 'follower not found');
    RequestError.TARGET_NOT_FOUND = new RequestError(404, 'target not found');
    RequestError.FOLLOW_NOT_FOUND = new RequestError(404, 'follow not found');
    RequestError.INVALID_CREDENTIAL = new RequestError(401, 'invalid email or incorrect password');
    RequestError.INVALID_TOKEN = new RequestError(401, 'invalid token');
    RequestError.UPDATE_NOT_USER = new RequestError(403, 'cannot update other user');
    RequestError.DELETE_NOT_USER = new RequestError(403, 'cannot delete other user');
    RequestError.FOLLOW_ITSELF = new RequestError(400, 'cannot follow itself');
    RequestError.UPDATE_POST_NOT_OWNER = new RequestError(403, "cannot update other user's post");
    RequestError.DELETE_POST_NOT_OWNER = new RequestError(403, "cannot delete other user's post");
    RequestError.DELETE_FOLLOW_NOT_FOLLOWER = new RequestError(403, "cannot delete other user's follow");
    RequestError.EMPTY_UPDATE_BODY = new RequestError(400, 'empty update body');
    return RequestError;
}(Error));
exports["default"] = RequestError;
