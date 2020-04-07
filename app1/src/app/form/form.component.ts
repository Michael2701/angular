import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  breweries: Object;
  checkoutForm;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService
  ) { 
    this.checkoutForm = this.formBuilder.group({
      name: '',
      address: ''
    });
  }

  ngOnInit(): void {
    this.http.getBeer().subscribe(data => {
      this.breweries = data;
      console.log(this.breweries);
    });
  }

  onSubmit(customerData){
    console.log(customerData);
  }

}
