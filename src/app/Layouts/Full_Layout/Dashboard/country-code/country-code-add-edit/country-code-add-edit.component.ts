import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { countryDataModel } from 'src/app/Models/countryData.model';
import { CountryCodeService } from 'src/app/Services/country-code.service';

@Component({
  selector: 'app-country-code-add-edit',
  templateUrl: './country-code-add-edit.component.html',
  styleUrls: ['./country-code-add-edit.component.css']
})
export class CountryCodeAddEditComponent implements OnInit {
  @Input() countryId=null;
  Message= "";
  disableReset=true;
  ErrorMessage= "";
  countryForm: FormGroup;
  selectedcountry: countryDataModel = { ID: "0",  CountryCode: "", CountryName: "", CountryShortName: "" };

  constructor(private fb: FormBuilder, private countryService : CountryCodeService) { }

  ngOnInit(): void {

    if (this.countryId === '0') {
      this.generateForm();
      this.disableReset=false;
    }
    else {
      this.selectedcountry = { ID: this.countryId, CountryCode: "", CountryName: "", CountryShortName: "" };
      this.countryService.fetchCountryDataByID(this.selectedcountry).subscribe(country => {
        this.selectedcountry = country;
        this.generateForm();
        this.disableReset=true;
      })
    }
  }

  generateForm() {    
    this.countryForm = this.fb.group({
      countryId: new FormControl(this.selectedcountry.ID),
      countryCode: new FormControl(this.selectedcountry.CountryCode, [Validators.required]),
      countryName: new FormControl(this.selectedcountry.CountryName, [Validators.required]),
      countryShortName: new FormControl(this.selectedcountry.CountryShortName, [Validators.required])
    });
  }


  resetForm() : void {
    this.countryForm.reset();

    }
    SubmitForm(){
      this.selectedcountry = {
        ID: this.countryForm.controls['countryId'].value, CountryCode: this.countryForm.controls['countryCode'].value,
        CountryName: this.countryForm.controls['countryName'].value, CountryShortName: this.countryForm.controls['countryShortName'].value
      }
      // this.selectedBot = { Id: this.botId, Name: "", Value: "", Description: "" };
      this.countryService.SaveCountry(this.selectedcountry).subscribe(flag => {
        if (flag == 1) {
          this.Message='Data saved successfully.'
         // this.showSuccess('Data saved successfully.')
        } else {
          this.ErrorMessage='Somthing went wrong.'
        }   
      })
      this.countryForm.reset();
    }
    }

