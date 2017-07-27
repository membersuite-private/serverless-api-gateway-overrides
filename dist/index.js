"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var _ = require("lodash");
var ServerlessPlugin = (function () {
    function ServerlessPlugin(serverless) {
        this.serverless = serverless;
        this.hooks = {
            'after:package:initialize': this.afterInit.bind(this),
            'before:package:finalize': this.beforeDeploy.bind(this)
        };
    }
    ServerlessPlugin.prototype.afterInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var apiGatewayOverrides, template, stage, prop, func;
            return __generator(this, function (_a) {
                apiGatewayOverrides = this.serverless.service.custom.apiGatewayOverrides;
                template = this.serverless.service.provider.compiledCloudFormationTemplate;
                stage = this.serverless.service.provider.stage;
                this.serverless.cli.log('Applying Lambda Function Name Overrides');
                for (prop in this.serverless.service.functions) {
                    func = this.serverless.service.functions[prop];
                    if (func) {
                        func.name = func.name.replace(stage + "-", '');
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    ServerlessPlugin.prototype.beforeDeploy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var apiGatewayOverrides, template;
            return __generator(this, function (_a) {
                apiGatewayOverrides = this.serverless.service.custom.apiGatewayOverrides;
                template = this.serverless.service.provider.compiledCloudFormationTemplate;
                this.serverless.cli.log('Applying API Gateway Overrides');
                _.extend(template.Resources, {
                    ApiGatewayRestApi: {
                        Type: 'AWS::ApiGateway::RestApi',
                        Properties: {
                            Name: apiGatewayOverrides.name
                        }
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    return ServerlessPlugin;
}());
module.exports = ServerlessPlugin;
//# sourceMappingURL=index.js.map