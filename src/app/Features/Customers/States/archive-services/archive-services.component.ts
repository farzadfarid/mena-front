import { Component, OnInit } from '@angular/core';
import { CustomerServicesComponent } from "../../../../Core/Components/customer-services/customer-services.component";

@Component({
  selector: 'app-archive-services',
  templateUrl: './archive-services.component.html',
  styleUrls: ['./archive-services.component.scss'],
  imports: [CustomerServicesComponent],
})
export class ArchiveServicesComponent implements OnInit {
  states = [3, 4, 5];
  constructor() { }

  ngOnInit() { }

}
