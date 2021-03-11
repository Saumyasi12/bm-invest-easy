import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { CaseReadyAction } from 'src/app/Models/caseStats.Model';
import { ChartService } from 'src/app/Services/charts/chart.service';
//import {Caseready} from './casereadyforaction'

@Component({
  selector: 'app-case-ready-for-action',
  templateUrl: './case-ready-for-action.component.html',
  styleUrls: ['./case-ready-for-action.component.css']
})
export class CaseReadyForActionComponent implements OnInit {
  @Output() onClose = new EventEmitter<boolean>();

  pageTitle= 'Case Ready For Action';

  public gridView!: GridDataResult;
  public pageSize = 5;
  public skip = 0;
  public headerstyle={'background-color': '#0D274D','color': '#fff','font-size': '12px',};
  caseReadyActionList: CaseReadyAction[] =[];

  pageSizeCount: number;
  windowHeight: number;


  @HostListener('window:resize', ['$event']) onResize(event) { 
    
    this.windowHeight = window.innerHeight-105;
    this.pageSize  = Math.ceil( this.windowHeight /35);
  }
  
  
  constructor(private chartService: ChartService) {
   
   }

   ngOnInit(): void {

    //Window resize
    this.windowHeight = window.innerHeight-105;
    this.pageSize  = Math.ceil( this.windowHeight /35);
    //Window resize
   this.chartService.fetchCaseReadyActionData().subscribe(ev=>{
     this.caseReadyActionList = ev;
     this.loadItems();
   })
  }

 


  public pageChange(event: PageChangeEvent): void {
      this.skip= event.skip;
      this.loadItems();
  }
  private loadItems(): void {
      this.gridView= {
          data: this.caseReadyActionList.slice(this.skip, this.skip + this.pageSize),
          total: this.caseReadyActionList.length
      };
  }

  

  goBack(): void{

    this.onClose.emit(false);
        
  }

}
