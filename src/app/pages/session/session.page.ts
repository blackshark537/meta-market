import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

type SessionType = 'login' | 'signup';

@Component({
  selector: 'app-session',
  templateUrl: './session.page.html',
  styleUrls: ['./session.page.scss'],
})
export class SessionPage implements OnInit {
  protected sessionType: SessionType = 'signup';

  constructor(
    protected readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sessionType = this.activatedRoute.snapshot.paramMap.get('type') as SessionType;
  }

}

