import { CommonModule, formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonSelect, IonDatetime, IonContent, IonDatetimeButton, IonGrid, IonRow, IonCol,
  IonModal, IonButton, IonSelectOption
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-search-specialists',
  templateUrl: './search-specialists.component.html',
  styleUrls: ['./search-specialists.component.scss'],
  standalone: true,
  imports: [IonSelect, IonDatetime, IonButton, TranslateModule,
    IonContent, IonGrid, IonRow, IonCol, CommonModule, FormsModule, IonSelectOption, IonDatetimeButton, IonModal]
})
export class SearchSpecialistsComponent implements OnInit {

  skills = ['Plumbing', 'Carpentry', 'Masonry', 'Electrician', 'Painting'];
  selectedSkill: string = '';
  selectedDate: string = '';

  @Output() searchEvent = new EventEmitter<{ skill: string; date: string }>();

  search() {
    const formattedDate = this.selectedDate ? formatDate(this.selectedDate, 'yyyy-MM-dd', 'en-US') : '';
    this.searchEvent.emit({ skill: this.selectedSkill, date: formattedDate });
  }

  ngOnInit() { }

}