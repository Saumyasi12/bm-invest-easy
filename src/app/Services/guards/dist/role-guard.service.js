"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RoleGuardService = void 0;
var core_1 = require("@angular/core");
var RoleGuardService = /** @class */ (function () {
    function RoleGuardService(_authService, _router) {
        this._authService = _authService;
        this._router = _router;
    }
    RoleGuardService.prototype.canActivate = function (next, state) {
        if (this._authService.decode().GroupPages.includes(next.data.url)) {
            return true;
        }
        // navigate to not found page
        this._router.navigate(['/errorpage']);
        return false;
    };
    RoleGuardService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], RoleGuardService);
    return RoleGuardService;
}());
exports.RoleGuardService = RoleGuardService;
