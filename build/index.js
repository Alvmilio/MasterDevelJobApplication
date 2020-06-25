"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ApiServer = /** @class */ (function () {
    function ApiServer() {
        this.app = express_1.default();
        this.config();
    }
    ApiServer.prototype.config = function () {
        this.app.set('port', 3000);
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.json());
    };
    return ApiServer;
}());
