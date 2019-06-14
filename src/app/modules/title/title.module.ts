import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatSidenavModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatTableModule,
  MatToolbarModule,
  MatSelectModule,
  MatDialogModule,
} from '@angular/material';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';

import { TitleComponent } from './components/title/title.component';
import { ListComponent } from './components/title/list/list.component';
import { FiltersComponent } from './components/title/filters/filters.component';
import { TitleEffects } from './store/title.effects';
import { titleReducer } from './store/title.reducer';
import { CoreModule } from 'src/app/core/core.module';
import { EditTitleComponent } from './components/title/list/edit-title/edit-title.component';

@NgModule({
  declarations: [ TitleComponent, ListComponent, FiltersComponent, EditTitleComponent ],
  entryComponents: [ EditTitleComponent ],
  exports: [ TitleComponent ],
  imports: [
    CommonModule,
    CoreModule,
    CdkTableModule,
    MatTableModule,
    MatToolbarModule,
    MatSelectModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([ TitleEffects ]),
    StoreModule.forFeature('title', titleReducer),
  ]
})
export class TitleModule {}
