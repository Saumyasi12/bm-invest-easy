import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { configDataModel } from 'src/app/Models/configData.model';
import { ConfigCodeService } from 'src/app/Services/config-code.service';

@Component({
  selector: 'app-country-code-add-edit',
  templateUrl: './country-code-add-edit.component.html',
  styleUrls: ['./country-code-add-edit.component.css']
})
export class CountryCodeAddEditComponent implements OnInit {
  @Input() countryId=null;

  countryForm: FormGroup;
  selectedcountry: configDataModel = { Id: "0",  Name: "", Value: "", Description: "" };

  constructor(private fb: FormBuilder, private configService : ConfigCodeService) { }

  ngOnInit(): void {
    if (this.countryId === null) {
      this.generateForm();
    }
    else {
      this.selectedcountry = { Id: this.countryId, Name: "", Value: "", Description: "" };
      this.configService.fetchConfigDataByID(this.selectedcountry).subscribe(country => {
        this.selectedcountry = country;
        this.generateForm();
      })
    }
  }

  generateForm() {    
    this.countryForm = this.fb.group({
      countryId: new FormControl(this.selectedcountry.Id),
      countryCode: new FormControl(this.selectedcountry.Name, [Validators.required]),
      countryName: new FormControl(this.selectedcountry.Value, [Validators.required]),
      countryShortName: new FormControl(this.selectedcountry.Description, [Validators.required])
    });
  }


  resetForm() : void {
    this.countryForm.reset();

    }
    SubmitForm(){
      console.log("Form Value")
      this.countryForm.reset();
    }
}
