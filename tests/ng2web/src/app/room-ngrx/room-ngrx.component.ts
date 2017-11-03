import { Component, OnInit, OnDestroy } from '@angular/core';
import { Room, Message, Account, FireLoopRef } from '../shared/sdk/models';
import { LoggerService, AccountApi, RealTime, SDKModels } from '../shared/sdk/services';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-room',
  templateUrl: './room-ngrx.component.html'
})

export class RoomNgrxComponent implements OnInit, OnDestroy {

  private roomRef: FireLoopRef<Room>;
  private message: Message = new Message();
  private messageRef: FireLoopRef<Message>;
  private replyRefs: { [key: number]: FireLoopRef<Message> } = {};
  private room: Room = new Room();
  private subscriptions: Subscription[] = new Array<Subscription>();

  constructor(
    private accountApi: AccountApi,
    private route: ActivatedRoute,
    private router: Router,
    private logger: LoggerService,
    private realTime: RealTime,
    private models: SDKModels
  ) {
    this.logger.info('Room Module Loaded');
  }

  ngOnInit() {
    this.realTime.onReady().subscribe(() => {
      this.roomRef = this.realTime.FireLoop.ref<Room>(Room);
      this.route.params.subscribe((room: Room) => {
        this.subscriptions.push(this.roomRef.on('value', {
          where: { id: room.id }
        }).subscribe((list: Room[]) => {
          this.room = list.pop();
          this.messageRef = this.roomRef.make(this.room).child<Message>('messages');
          this.listenMessages();
        }, err => alert(err.message)));
      });
      this.roomRef.onRemote('findByRoom').subscribe((room: Room) => {
        this.logger.info(`OnRemote Method Result`);
        this.logger.info(room);
      });
    }, (error: any) => {
      console.log('ERROR: ', error);
    });
  }

  findByRoom(): void {
    let subscription: Subscription = this.roomRef
        .remote('findByRoom', [this.room], true)
        .subscribe((room: Room) => {
          this.logger.info(`Remote Method Result`);
          this.logger.info(room);
          subscription.unsubscribe();
        });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
    this.roomRef.dispose();
    this.messageRef.dispose();
    Object.keys(this.replyRefs).forEach((id: any) => this.replyRefs[id].dispose());
    this.replyRefs = {};
  }

  send(): void {
    this.messageRef.create(this.message).subscribe((instance: Message) => {
      this.logger.info('Message stored');
      this.replyRefs[instance.id] = this.messageRef.make(instance).child<Message>('replies');
      this.message = new Message();
    }).unsubscribe();
  }

  sendReply(parent: Message, text: string): void {
    this.replyRefs[parent.id].create(new Message({ text: text })).subscribe((instance: Message) => {
      this.logger.info('Reply stored');
      text = '';
    }).unsubscribe();
  }

  listenMessages() {
    this.subscriptions.push(
      this.messageRef.on('change')
        .subscribe((messages: Message[]) => {
          this.room.messages = messages;
          this.room.messages.forEach((message: Message) => {
            this.replyRefs[message.id] = this.messageRef.make(message).child<Message>('replies');
            this.subscriptions.push(this.replyRefs[message.id].on('change').subscribe((replies: Message[]) => {
              message.replies = replies;
            }));
          });
        })
    );
  }
}
