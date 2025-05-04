import { Component, OnInit } from '@angular/core';
import { CustomerServicesComponent } from "../../../../Core/Components/customer-services/customer-services.component";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
  imports: [CustomerServicesComponent],
})
export class RequestsComponent implements OnInit {

  states = [1];
  constructor() { }

  ngOnInit() { }

}
