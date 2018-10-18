"use strict";
exports.__esModule = true;
var express_1 = require("express");
var User_1 = require("../models/User");
var UserRouter = /** @class */ (function () {
    function UserRouter() {
        this.router = express_1.Router();
        this.routes();
    }
    UserRouter.prototype.all = function (req, res) {
        User_1["default"].find()
            .then(function (data) {
            return res.status(200).json({ data: data });
        })["catch"](function (error) {
            res.status(500).json({ error: error });
            return error;
        });
    };
    UserRouter.prototype.one = function (req, res) {
        var _id = req.params._id;
        User_1["default"].findOne({ _id: _id })
            .then(function (data) {
            res.status(200).json({ data: data });
        })["catch"](function (error) {
            return res.status(500).json({ error: error });
        });
    };
    UserRouter.prototype.create = function (req, res) {
        console.log(req.body);
        var _a = req.body, name = _a.name, address = _a.address, email = _a.email, phone = _a.phone, salary = _a.salary;
        console.log(name, address, email, phone, salary);
        var user = new User_1["default"]({
            name: name,
            address: address,
            email: email,
            phone: phone,
            salary: salary
        });
        user
            .save()
            .then(function (data) {
            res.status(200).json({ data: data });
        })["catch"](function (error) {
            console.log(error);
            res.status(500).json({ error: error });
        });
    };
    UserRouter.prototype.update = function (req, res) {
        var _id = req.params._id;
        User_1["default"].findOneAndUpdate({ _id: _id }, req.body)
            .then(function (data) {
            res.status(200).json({ data: data });
        })["catch"](function (error) {
            res.status(500).json({ error: error });
        });
    };
    UserRouter.prototype["delete"] = function (req, res) {
        var _id = req.params._id;
        User_1["default"].findOneAndRemove({ _id: _id })
            .then(function () {
            res.status(200).end();
        })["catch"](function (error) {
            res.status(500).json({ error: error });
        });
    };
    UserRouter.prototype.routes = function () {
        this.router.get('/', this.all);
        this.router.get('/byId/:_id', this.one);
        this.router.post('/', this.create);
        this.router.put('/:_id', this.update);
        this.router["delete"]('/:_id', this["delete"]);
    };
    return UserRouter;
}());
exports.UserRouter = UserRouter;
var userRoutes = new UserRouter();
userRoutes.routes();
exports["default"] = userRoutes.router;
