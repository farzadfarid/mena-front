import { Component } from '@angular/core';
import { CustomerServicesComponent } from "../../../../Core/Components/customer-services/customer-services.component";

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss'],
  imports: [CustomerServicesComponent],
})
export class ToDoComponent {
  states = [2];
  constructor() { }

}
