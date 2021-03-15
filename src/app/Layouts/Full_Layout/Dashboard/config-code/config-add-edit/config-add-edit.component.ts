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
  @Input() configId=null;

  configForm: FormGroup;

  selectedconfig: configDataModel = { Id: "0", Name: "", Value: "", Description: "" };

  constructor(private fb: FormBuilder, private configService : ConfigCodeService) { }

  ngOnInit(): void {
    if (this.configId === null) {
      this.generateForm();
    }
    else {
      this.selectedconfig = { Id: this.configId, Name: "", Value: "", Description: "" };
      this.configService.fetchConfigDataByID(this.selectedconfig).subscribe(config => {
        this.selectedconfig = config;
        this.generateForm();
      })
    }
  }

  generateForm() {    
    this.configForm = this.fb.group({
      configId: new FormControl(this.selectedconfig.Id),
      configName: new FormControl(this.selectedconfig.Name, [Validators.required]),
      configValue: new FormControl(this.selectedconfig.Value, [Validators.required]),
      configDescription: new FormControl(this.selectedconfig.Description, [Validators.required])
    });
  }

  

}
