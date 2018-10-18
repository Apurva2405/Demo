"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    createdAt: Date,
    updatedAt: Date,
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true
    },
    salary: {
        type: Number,
        required: true
    }
});
exports["default"] = mongoose_1.model('User', UserSchema);
