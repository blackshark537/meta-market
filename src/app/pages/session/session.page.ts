import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/helpers/Message.service';

type SessionType = 'login' | 'signup';

@Component({
  selector: 'app-session',
  templateUrl: './session.page.html',
  styleUrls: ['./session.page.scss'],
})
export class SessionPage implements OnInit {
  protected sessionType: SessionType = 'signup';

  constructor(
    protected readonly activatedRoute: ActivatedRoute,
    protected readonly msgCtrl: MessageService
  ) { }

  ngOnInit() {
    this.sessionType = this.activatedRoute.snapshot.paramMap.get('type') as SessionType;
    this.msgCtrl.presentToast("Por Favor, Inicia Session!");
  }

}

