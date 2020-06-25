"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mainController_1 = require("./mainController");
var mainRoutes = /** @class */ (function () {
    function mainRoutes() {
        this.router = express_1.Router();
        this.setRoutes();
    }
    mainRoutes.prototype.setRoutes = function () {
        this.router.put('/credential', mainController_1.mainController.putCredential);
        this.router.post('/message', mainController_1.mainController.postMessage);
        this.router.get('/message/:id', mainController_1.mainController.getMessageByID);
        this.router.get('/messages/:tag', mainController_1.mainController.getMessagesByTag);
    };
    return mainRoutes;
}());
