import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  IonModal,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [IonButton, IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar, TranslateModule],
})
export class ModalComponent implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  @Input() content: any;
  @Input() title: any;
  page: any;

  async canDismiss(data?: undefined, role?: string) {
    return role !== 'gesture';
  }

  openModal() {
    this.modal.present(); // نمایش مودال
  }

  closeModal() {
    this.modal.dismiss(); // بستن مودال
  }


  ngOnInit() { }
}
