import { Component, OnInit } from '@angular/core';
import { ChatComponent } from "../shared/chat/chat.component";
import { CometChat } from '@cometchat-pro/chat';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
  standalone: true,
  imports: [ChatComponent],
})
export class ChatRoomComponent implements OnInit {
  receiverId: any;
  receiverName: any;
  receiverRole: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.receiverId = params['receiverId'];
      this.receiverName = params['receiverName'];
      this.receiverRole = params['receiverRole'];
    });


    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

    // ✅ login کاربر فعلی با userInfo
    if (userInfo.userId) {
      const userUid = userInfo.userId.toString();
      const authKey = "b837fcafc04a75141f4994d85a370c3c77b173db";

      CometChat.login(userUid, authKey).then(
        (user) => {
          console.log("✅ کاربر لاگین شد در CometChat:", user);
        },
        (error) => {
          console.error("❌ خطا در لاگین:", error);
        }
      );
    }

    // if (userInfo.role === 'realcustomer' || userInfo.role === 'legalcustomer') {
    //   // مشتری هست، پس چت با متخصص
    //   this.receiverId = '1030'; // ✅ Emma Johnson
    //   this.receiverName = 'Emma Johnson';
    //   this.receiverRole = 'specialist';
    // } else if (userInfo.role === 'specialist') { 
    //   // متخصص هست، چت با مشتری تستی
    //   this.receiverId = '1007'; // ✅ Farzad MT
    //   this.receiverName = 'Farzad MT';
    //   this.receiverRole = 'realcustomer'; 
    // }
  }
}
