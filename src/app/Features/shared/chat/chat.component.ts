import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CometChat } from '@cometchat-pro/chat';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports: [FormsModule, CommonModule, TranslateModule]
})
export class ChatComponent implements OnInit, OnDestroy {


  @Input() receiverId!: string;
  @Input() receiverName!: string;
  @Input() receiverRole!: string;

  messages: any[] = [];
  newMessage: string = '';
  listenerId = 'chat-listener-' + new Date().getTime();

  ngOnInit(): void {
    this.fetchMessages();
    this.attachMessageListener();
  }

  ngOnDestroy(): void {
    CometChat.removeMessageListener(this.listenerId);
  }

  fetchMessages() {
    const limit = 50;
    const messagesRequest = new CometChat.MessagesRequestBuilder()
      .setUID(this.receiverId)
      .setLimit(limit)
      .build();

    messagesRequest.fetchPrevious().then(
      (msgs) => {
        this.messages = msgs;
      },
      (error) => {
        console.error("خطا در دریافت پیام‌ها:", error);
      }
    );
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;

    const textMessage = new CometChat.TextMessage(
      this.receiverId,
      this.newMessage,
      CometChat.RECEIVER_TYPE.USER
    );

    CometChat.sendMessage(textMessage).then(
      (message) => {
        this.messages.push(message);
        this.newMessage = '';
      },
      (error) => {
        console.error("خطا در ارسال پیام:", error);
      }
    );
  }

  attachMessageListener() {
    CometChat.addMessageListener(
      this.listenerId,
      new CometChat.MessageListener({
        onTextMessageReceived: (message: any) => {
          if (message.sender.uid === this.receiverId) {
            this.messages.push(message);
          }
        }
      })
    );
  }
}
