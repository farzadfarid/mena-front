import { Component } from '@angular/core';
import { SpecialistServicesComponent } from 'src/app/Core/Components/specialist-services/specialist-services.component';

@Component({
  selector: 'app-archive-services',
  templateUrl: './archive-services.component.html',
  styleUrls: ['./archive-services.component.scss'],
  standalone: true,
  imports: [SpecialistServicesComponent]
})
export class ArchiveServicesComponent {

  states = [3, 4, 5];


}
