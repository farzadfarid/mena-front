import { Component, OnInit } from '@angular/core';
import { SpecialistServicesComponent } from "../../../../Core/Components/specialist-services/specialist-services.component";

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss'],
  imports: [SpecialistServicesComponent],
})
export class ToDoComponent implements OnInit {
  states = [2];
  constructor() { }

  ngOnInit() { }

}
