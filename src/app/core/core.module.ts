import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import SWorker from 'simple-web-worker';

import { TitleService } from './http/title/title.service';

@NgModule({
  declarations: [],
  providers: [
    TitleService,
    { provide: 'SWorker', useValue: SWorker },
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ]
})
export class CoreModule {}
