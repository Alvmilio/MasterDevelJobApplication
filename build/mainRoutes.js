"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mainController_1 = require("./mainController");
var MainRoutes = /** @class */ (function () {
    function MainRoutes() {
        this.router = express_1.Router();
        this.setRoutes();
    }
    MainRoutes.prototype.setRoutes = function () {
        this.router.put('/credential', mainController_1.mainController.putCredential);
        this.router.post('/message', mainController_1.mainController.postMessage);
        this.router.get('/message/:id', mainController_1.mainController.getMessageByID);
        this.router.get('/messages/:tag', mainController_1.mainController.getMessagesByTag);
    };
    return MainRoutes;
}());
exports.mainRoutes = new MainRoutes().router;
