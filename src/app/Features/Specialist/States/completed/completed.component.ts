import { Component, OnInit } from '@angular/core';
import { SpecialistServicesComponent } from "../../../../Core/Components/specialist-services/specialist-services.component";

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss'],
  imports: [SpecialistServicesComponent],
})
export class CompletedComponent implements OnInit {

  states = [6];
  constructor() { }

  ngOnInit() { }

}
