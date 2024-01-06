"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ApiD = new mongoose_1.default.Schema({
    allowedDomains: [String],
    secret: String,
});
const Domains = mongoose_1.default.model('profiles', ApiD);
console.log('[Domains]: Started');
exports.default = Domains;
