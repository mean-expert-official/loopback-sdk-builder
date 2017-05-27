"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var model_1 = require("@mean-expert/model");
var Account = (function () {
    function Account(model) {
        this.model = model;
    }
    Account.prototype.beforeSave = function (ctx, next) {
        console.log('Account: Before Save');
        next();
    };
    Account.prototype.myRemote = function (next) {
        this.model.find(next);
    };
    return Account;
}());
Account = __decorate([
    model_1.Model({
        hooks: {
            beforeSave: { name: 'before save', type: 'operation' }
        },
        remotes: {
            myRemote: {
                returns: { arg: 'result', type: 'array' },
                http: { path: '/my-remote', verb: 'get' }
            }
        }
    })
], Account);
module.exports = Account;
//# sourceMappingURL=account.js.map