import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { configDataModel } from 'src/app/Models/configData.model';
import { ConfigCodeService } from 'src/app/Services/config-code.service';

@Component({
  selector: 'app-config-add-edit',
  templateUrl: './config-add-edit.component.html',
  styleUrls: ['./config-add-edit.component.css']
})
export class ConfigAddEditComponent implements OnInit {
  @Input() configId:number;
Message='';
ErrorMessage='';
  configForm: FormGroup;

  selectedconfig: configDataModel = { ID: "0", Name: "", Value: "", Description: "" };
  editName:boolean=true;
  constructor(private fb: FormBuilder, private configService : ConfigCodeService) { }

  ngOnInit(): void {
    if (this.configId === 0) {
      this.generateForm();
      this.editName=true;
    }
    else {     
      this.selectedconfig = { ID: this.configId.toString(), Name: "", Value: "", Description: "" };
      this.configService.fetchConfigDataByID(this.selectedconfig).subscribe(config => {      
        this.selectedconfig = config;
        this.generateForm();
        this.editName=false;
      })
    }
  }
  generateForm() {      
    this.configForm = this.fb.group({  
      configId: new FormControl(this.selectedconfig.ID),
      configName: new FormControl(this.selectedconfig.Name, [Validators.required]),
      configValue: new FormControl(this.selectedconfig.Value, [Validators.required]),
      configDescription: new FormControl(this.selectedconfig.Description)
    });
  }
  SubmitForm(){  
    this.selectedconfig = {
      ID: this.configForm.controls['configId'].value, Name: this.configForm.controls['configName'].value,
      Value: this.configForm.controls['configValue'].value, Description: this.configForm.controls['configDescription'].value
    }
    this.configService.SaveConfig(this.selectedconfig).subscribe(flag => {
      if (flag == 1) {
        this.Message='Data saved successfully.'       
      } else {
        this.ErrorMessage='Somthing went wrong.'
      }   
    })
    this.configForm.reset();
  }
 
  resetForm(){
    this.configForm.reset();
  }
}
