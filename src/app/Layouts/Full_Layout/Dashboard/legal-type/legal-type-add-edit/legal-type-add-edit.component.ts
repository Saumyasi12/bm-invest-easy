import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { legalDataModel } from 'src/app/Models/legalData.model';
import { LegalTypeService } from 'src/app/Services/legal-type.service';

@Component({
  selector: 'app-legal-type-add-edit',
  templateUrl: './legal-type-add-edit.component.html',
  styleUrls: ['./legal-type-add-edit.component.css']
})
export class LegalTypeAddEditComponent implements OnInit {

  @Input() legalId='';

  Message= "";
  ErrorMessage ="";
  legalForm: FormGroup;
  selectedlegal: legalDataModel = { ID: "0",  LegalType: "", Status: false, Description: "" };

  constructor(private fb: FormBuilder, private legalService : LegalTypeService) { }

  ngOnInit(): void {
    
    if (this.legalId === '0') {
      this.generateForm();
    }
    else {
      this.selectedlegal = { ID: this.legalId, LegalType: "", Status: false, Description: "" };
      this.legalService.fetchLegalDataByID(this.selectedlegal).subscribe(legal => {
        this.selectedlegal = legal;
        this.generateForm();
      })
    }
  }

  generateForm() {    
    this.legalForm = this.fb.group({
      legalId: new FormControl(this.selectedlegal.ID),
      legalType: new FormControl(this.selectedlegal.LegalType, [Validators.required]),
      status: new FormControl(this.selectedlegal.Status.toString(),[Validators.required]),
      description: new FormControl(this.selectedlegal.Description, [Validators.required])
    });
  }


  resetForm() : void {
    this.legalForm.reset();

    }
    SubmitForm(){
      this.selectedlegal = {
        ID: this.legalForm.controls['legalId'].value, LegalType: this.legalForm.controls['legalType'].value,
        Status: this.legalForm.controls['status'].value, Description: this.legalForm.controls['description'].value
      }
      // this.selectedBot = { Id: this.botId, Name: "", Value: "", Description: "" };
      this.legalService.SaveConfig(this.selectedlegal).subscribe(flag => {
        if (flag == 1) {
          this.Message='Data saved successfully.'
         // this.showSuccess('Data saved successfully.')
        } else {
          this.ErrorMessage='Somthing went wrong.'
        }   
      })
      this.legalForm.reset();
    }
    }

