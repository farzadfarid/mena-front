import { Component, OnInit } from '@angular/core';
import { CustomerServicesComponent } from "../../../../Core/Components/customer-services/customer-services.component";

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss'],
  imports: [CustomerServicesComponent],
})
export class CompletedComponent implements OnInit {
  states = [6];
  constructor() { }

  ngOnInit() { }

}
