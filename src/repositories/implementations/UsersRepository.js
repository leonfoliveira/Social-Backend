"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var User_1 = require("../../entities/User");
var database_1 = require("../../database");
var UsersRepository = /** @class */ (function () {
    function UsersRepository() {
        this.baseSelectQuery = database_1["default"]
            .select(['users.*', 'followers', 'following'])
            .from('users')
            .leftJoin(database_1["default"]
            .select('targetId')
            .count('* as followers')
            .from('follows')
            .groupBy('targetId')
            .as('followers_counter'), 'followers_counter.targetId', 'users.id')
            .leftJoin(database_1["default"]
            .select('followerId')
            .count('* as following')
            .from('follows')
            .groupBy('followerId')
            .as('following_counter'), 'following_counter.followerId', 'users.id')
            .where({ deletedAt: null });
    }
    UsersRepository.prototype.parseUser = function (user) {
        return new User_1["default"](__assign(__assign({}, user), { followers: user.followers ? parseInt(user.followers, 10) : 0, following: user.following ? parseInt(user.following, 10) : 0 }));
    };
    UsersRepository.prototype.index = function (page, perPage) {
        return __awaiter(this, void 0, void 0, function () {
            var limit, offset, users, count;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        limit = perPage;
                        offset = (page - 1) * limit;
                        return [4 /*yield*/, this.baseSelectQuery
                                .clone()
                                .limit(limit)
                                .offset(offset)];
                    case 1:
                        users = _a.sent();
                        return [4 /*yield*/, database_1["default"]
                                .count()
                                .from('users')
                                .where({ deletedAt: null })
                                .first()];
                    case 2:
                        count = (_a.sent()).count;
                        return [2 /*return*/, {
                                users: users.map(function (user) { return _this.parseUser(user); }),
                                count: count,
                                pages: Math.ceil(count / perPage)
                            }];
                }
            });
        });
    };
    UsersRepository.prototype.leading = function (page, perPage) {
        return __awaiter(this, void 0, void 0, function () {
            var limit, offset, users, count;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        limit = perPage;
                        offset = (page - 1) * limit;
                        return [4 /*yield*/, this.baseSelectQuery
                                .clone()
                                .whereNotNull('followers')
                                .orderBy('followers', 'desc')
                                .limit(limit)
                                .offset(offset)];
                    case 1:
                        users = _a.sent();
                        return [4 /*yield*/, database_1["default"]
                                .count()
                                .from('users')
                                .where({ deletedAt: null })
                                .first()];
                    case 2:
                        count = (_a.sent()).count;
                        return [2 /*return*/, {
                                users: users.map(function (user) { return _this.parseUser(user); }),
                                count: count,
                                pages: Math.ceil(count / perPage)
                            }];
                }
            });
        });
    };
    UsersRepository.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.baseSelectQuery
                            .clone()
                            .where({ id: id, deletedAt: null })
                            .first()];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, undefined];
                        }
                        return [2 /*return*/, this.parseUser(user)];
                }
            });
        });
    };
    UsersRepository.prototype.findByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.baseSelectQuery
                            .clone()
                            .where({ email: email, deletedAt: null })
                            .first()];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, undefined];
                        }
                        return [2 /*return*/, this.parseUser(user)];
                }
            });
        });
    };
    UsersRepository.prototype.findByTag = function (tag) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.baseSelectQuery
                            .clone()
                            .where({ tag: tag, deletedAt: null })
                            .first()];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, undefined];
                        }
                        return [2 /*return*/, this.parseUser(user)];
                }
            });
        });
    };
    UsersRepository.prototype.save = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var createdUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1["default"]
                            .insert({
                            id: user.id,
                            email: user.email,
                            name: user.name,
                            tag: user.tag,
                            password: user.password,
                            salt: user.salt
                        })
                            .into('users')
                            .returning([
                            'id',
                            'email',
                            'name',
                            'tag',
                            'createdAt',
                            'updatedAt',
                        ])];
                    case 1:
                        createdUser = (_a.sent())[0];
                        return [2 /*return*/, this.parseUser(createdUser)];
                }
            });
        });
    };
    UsersRepository.prototype.update = function (id, user) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var updatedUser, followers, following;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, database_1["default"]('users')
                            .update({
                            email: (_a = user.email) !== null && _a !== void 0 ? _a : user.email,
                            name: (_b = user.name) !== null && _b !== void 0 ? _b : user.name,
                            password: (_c = user.password) !== null && _c !== void 0 ? _c : user.password,
                            salt: (_d = user.salt) !== null && _d !== void 0 ? _d : user.salt
                        })
                            .where({ id: id, deletedAt: null })
                            .returning([
                            'id',
                            'email',
                            'name',
                            'tag',
                            'createdAt',
                            'updatedAt',
                        ])];
                    case 1:
                        updatedUser = (_e.sent())[0];
                        return [4 /*yield*/, database_1["default"]
                                .count()
                                .from('follows')
                                .where({ targetId: id })
                                .first()];
                    case 2:
                        followers = (_e.sent()).count;
                        return [4 /*yield*/, database_1["default"]
                                .count()
                                .from('follows')
                                .where({ followerId: id })
                                .first()];
                    case 3:
                        following = (_e.sent()).count;
                        return [2 /*return*/, this.parseUser(__assign(__assign({}, updatedUser), { followers: followers, following: following }))];
                }
            });
        });
    };
    UsersRepository.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1["default"]('users')
                            .update({ deletedAt: new Date() })
                            .where({ id: id, deletedAt: null })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return UsersRepository;
}());
exports["default"] = UsersRepository;
