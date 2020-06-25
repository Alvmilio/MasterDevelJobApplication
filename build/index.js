"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mainRoutes_1 = require("./mainRoutes");
var ApiServer = /** @class */ (function () {
    function ApiServer() {
        this.PORT = 3000;
        this.app = express_1.default();
        this.config();
    }
    ApiServer.prototype.config = function () {
        this.app.set('port', 3000);
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.json());
        this.app.use('/api/', mainRoutes_1.mainRoutes);
    };
    ApiServer.prototype.start = function () {
        var _this = this;
        this.app.listen(this.PORT, function () {
            console.log("ApiServer listening on port " + _this.PORT);
        });
    };
    return ApiServer;
}());
var serverInstance = new ApiServer();
serverInstance.start();
