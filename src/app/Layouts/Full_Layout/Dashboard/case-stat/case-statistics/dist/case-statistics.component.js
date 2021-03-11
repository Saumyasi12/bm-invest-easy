"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CaseStatisticsComponent = void 0;
var core_1 = require("@angular/core");
var chartsConfig_1 = require("../ChartData/chartsConfig");
var casestatistics_1 = require("./casestatistics");
var CaseStatisticsComponent = /** @class */ (function () {
    function CaseStatisticsComponent(chartService) {
        this.chartService = chartService;
        this.onClose = new core_1.EventEmitter();
        this.viewfromclass = 'boxShadow';
        this.pageSize = 5;
        this.skip = 0;
        this.headerstyle = { 'background-color': '#0D274D', 'color': '#fff', 'font-size': '12px' };
        //private data!: Object[] ;
        this.datasourceCasestatisstics = null;
        this.caseStatistics = [];
        //Excel button work
        this.excelData = casestatistics_1.CaseStatVar;
        this.fields = Object.keys(this.excelData[0]);
    }
    CaseStatisticsComponent.prototype.onResize = function (event) {
        this.windowHeight = window.innerHeight - 330;
        this.pageSize = Math.ceil(this.windowHeight / 35);
    };
    CaseStatisticsComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Window resize
        this.windowHeight = window.innerHeight - 330;
        this.pageSize = Math.ceil(this.windowHeight / 35);
        //Window resize
        console.log(this.pageSize);
        this.chartService.fetchCaseStatusData().subscribe(function (ev) {
            // console.log(ev.chartData);
            _this.actualdata = ev[1];
            _this.datasourceCasestatisstics = {
                "chart": chartsConfig_1.chartConfigUI.caseStats,
                "categories": [
                    {
                        "category": [
                            {
                                "label": "RIYADH"
                            }
                        ]
                    }
                ],
                "dataset": ev[0]
            };
        });
        this.caseStatsChartConfig = {
            width: '100%',
            height: '145',
            type: 'stackedbar2d',
            dataFormat: 'json'
        };
        this.chartService.fetchCaseStatisticsData().subscribe(function (ev) {
            _this.caseStatistics = ev;
            _this.loadItems();
        });
    };
    CaseStatisticsComponent.prototype.pageChange = function (event) {
        this.skip = event.skip;
        this.loadItems();
    };
    CaseStatisticsComponent.prototype.loadItems = function () {
        this.gridView = {
            data: this.caseStatistics.slice(this.skip, this.skip + this.pageSize),
            total: this.caseStatistics.length
        };
    };
    CaseStatisticsComponent.prototype.goBack = function () {
        this.onClose.emit(false);
    };
    __decorate([
        core_1.Output()
    ], CaseStatisticsComponent.prototype, "onClose");
    __decorate([
        core_1.HostListener('window:resize', ['$event'])
    ], CaseStatisticsComponent.prototype, "onResize");
    CaseStatisticsComponent = __decorate([
        core_1.Component({
            selector: 'app-case-statistics',
            templateUrl: './case-statistics.component.html',
            styleUrls: ['./case-statistics.component.css']
        })
    ], CaseStatisticsComponent);
    return CaseStatisticsComponent;
}());
exports.CaseStatisticsComponent = CaseStatisticsComponent;
