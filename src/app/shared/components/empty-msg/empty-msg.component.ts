import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-msg',
  templateUrl: './empty-msg.component.html',
  styleUrls: ['./empty-msg.component.scss'],
})
export class EmptyMsgComponent {
  @Input("trigger") cantidad: number | undefined;
  @Input("msg") message = "No hay productos en oferta";

}
