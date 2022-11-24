import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from '../helpers/Message.service';
import { MessagePort } from './Ports';
import { effects } from './DomainServices';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './State';
import { environment } from 'src/environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot({...reducers}),
    EffectsModule.forRoot([...effects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
  ],
  providers:[
    
    {
      provide: MessagePort,
      useClass: MessageService
    },
  ]
})
export class CoreModule { }
