import { Component, OnInit } from '@angular/core';
import { SpecialistServicesComponent } from "../../../../Core/Components/specialist-services/specialist-services.component";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
  imports: [SpecialistServicesComponent],
})
export class RequestsComponent implements OnInit {

  states = [1];
  constructor() { }

  ngOnInit() { }

}
