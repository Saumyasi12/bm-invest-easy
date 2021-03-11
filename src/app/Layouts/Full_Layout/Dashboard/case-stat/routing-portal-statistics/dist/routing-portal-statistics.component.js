"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RoutingPortalStatisticsComponent = void 0;
var core_1 = require("@angular/core");
var chartsConfig_1 = require("../ChartData/chartsConfig");
//import {routingp} from './routingportal'
var RoutingPortalStatisticsComponent = /** @class */ (function () {
    function RoutingPortalStatisticsComponent(chartService) {
        this.chartService = chartService;
        this.onClose = new core_1.EventEmitter();
        this.pageTitle = 'Routing Portal Statistics';
        this.pageSize = 5;
        this.skip = 0;
        this.headerstyle = { 'background-color': '#0D274D', 'color': '#fff', 'font-size': '12px' };
        this.datasourceRoutingPortal = null;
        this.routingPortalGridData = [];
    }
    RoutingPortalStatisticsComponent.prototype.onResize = function (event) {
        this.windowHeight = window.innerHeight - 330;
        this.pageSize = Math.ceil(this.windowHeight / 35);
    };
    RoutingPortalStatisticsComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Window resize
        this.windowHeight = window.innerHeight - 330;
        this.pageSize = Math.ceil(this.windowHeight / 35);
        //Window resize
        this.chartService.fetchRoutingPortalData().subscribe(function (ev) {
            _this.actualdata = ev[1];
            _this.datasourceRoutingPortal = {
                chart: __assign(__assign({}, chartsConfig_1.chartConfigUI.routerChart), { "legendPosition": "absolute", "legendXPosition": "10", "legendYPosition": "20", "pieRadius": "90%", "legendNumColumns": "1" }),
                data: ev[0]
            };
        });
        this.routingPortalChartConfig = {
            width: '100%',
            height: '145',
            type: 'doughnut2d',
            dataFormat: 'json'
        };
        this.chartService.fetchRoutingPortalGridData().subscribe(function (ev) {
            _this.routingPortalGridData = ev;
            _this.loadItems();
            // console.log(ev)
        });
    };
    RoutingPortalStatisticsComponent.prototype.pageChange = function (event) {
        this.skip = event.skip;
        this.loadItems();
    };
    RoutingPortalStatisticsComponent.prototype.loadItems = function () {
        this.gridView = {
            data: this.routingPortalGridData.slice(this.skip, this.skip + this.pageSize),
            total: this.routingPortalGridData.length
        };
    };
    RoutingPortalStatisticsComponent.prototype.goBack = function () {
        this.onClose.emit(false);
    };
    __decorate([
        core_1.Output()
    ], RoutingPortalStatisticsComponent.prototype, "onClose");
    __decorate([
        core_1.HostListener('window:resize', ['$event'])
    ], RoutingPortalStatisticsComponent.prototype, "onResize");
    RoutingPortalStatisticsComponent = __decorate([
        core_1.Component({
            selector: 'app-routing-portal-statistics',
            templateUrl: './routing-portal-statistics.component.html',
            styleUrls: ['./routing-portal-statistics.component.css']
        })
    ], RoutingPortalStatisticsComponent);
    return RoutingPortalStatisticsComponent;
}());
exports.RoutingPortalStatisticsComponent = RoutingPortalStatisticsComponent;
