import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MovieUploadService} from './service/movie-upload.service';
import {PaintUploadService} from './service/paint-upload.service';
import {HistoryFindService} from './service/history-find.service';
import {StateSubjectService} from './service/state-subject.service';
import {HistoryComponent} from './content/history/history.component';
import {SliderModule} from 'primeng/slider';
import {NavigationComponent} from './content/navigation/navigation.component';
import {EditorComponent} from './content/editor/editor.component';
import {PaintComponent} from './content/paint/paint.component';
import {PaletteComponent} from './content/palette/palette.component';
import {TopComponent} from './content/top/top.component';
import {MovieService} from './model/movie';
import {PaintService} from './model/paint';
import {HistoryService} from './model/history';
import {StateService} from './model/state';

@NgModule({
  declarations: [
    AppComponent,
    HistoryComponent,
    NavigationComponent,
    EditorComponent,
    PaintComponent,
    PaletteComponent,
    TopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    SliderModule
  ],
  providers: [
    {provide: MovieService, useClass: MovieUploadService},
    {provide: PaintService, useClass: PaintUploadService},
    {provide: HistoryService, useClass: HistoryFindService},
    {provide: StateService, useClass: StateSubjectService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
