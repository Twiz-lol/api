"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const url = process.env.MONGODB || '';
function connectToDatabase() {
    try {
        const options = {
            autoIndex: true,
        };
        mongoose_1.default.connect(url, options);
        console.log("[Mongodb] connected.");
    }
    catch (error) {
        console.error("Mongoose connection error:", error);
    }
}
connectToDatabase();
