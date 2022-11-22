import { Component, Input, OnInit } from '@angular/core';
import { iBanner } from 'src/app/core/Domain/Interfaces';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit, iBanner {
  @Input('attributes') attr?: iBanner | any;
  constructor() { }

  ngOnInit() {}

  get title(): string{
    return this.attr.title;
  }

  get subtitle(): string {
    return this.attr.subtitle;
  };

  get dead_line(): Date {
    return this.attr.dead_line as Date
  };

  get type(): 'banner-card' | 'banner-foto' | 'banner-slide'{
    return this.attr.type;
  };

  get enabled(): boolean {
    return this.attr.enabled;
  }

  foto: string = '';

  url: string = '';

}
