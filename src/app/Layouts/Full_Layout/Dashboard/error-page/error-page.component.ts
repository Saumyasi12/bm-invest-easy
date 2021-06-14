import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
public cover='/assets/Images/error.png'
  constructor() { 
    localStorage.removeItem("token");
        sessionStorage.clear();
  }

  ngOnInit(): void {

  }

}
