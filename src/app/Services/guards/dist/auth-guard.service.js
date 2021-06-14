"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthGuardService = void 0;
var core_1 = require("@angular/core");
var AuthGuardService = /** @class */ (function () {
    function AuthGuardService(_authService, _router) {
        this._authService = _authService;
        this._router = _router;
    }
    AuthGuardService.prototype.canActivate = function (next, state) {
        if (this._authService.isAuthenticated()) {
            return true;
        }
        // navigate to login page
        this._router.navigate(['/login']);
        // you can save redirect url so after authing we can move them back to the page they requested
        return false;
    };
    AuthGuardService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthGuardService);
    return AuthGuardService;
}());
exports.AuthGuardService = AuthGuardService;
