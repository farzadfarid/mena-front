import { Component, OnInit } from '@angular/core';
import {
  IonHeader, IonToolbar, IonButtons, IonMenuButton,
  IonTitle, IonContent,
} from '@ionic/angular/standalone';
import { ToastService } from 'src/app/Core/Services/toast.service';
@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
  ]
})
export class InboxComponent implements OnInit {

  constructor(private message: ToastService) { }


  ngOnInit() {
    this.message.showSuccess("hiiiiiiiii")
  }

}
