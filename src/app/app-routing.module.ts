import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HistoryComponent} from './content/history/history.component';
import {EditorComponent} from './content/editor/editor.component';
import {TopComponent} from './content/top/top.component';

const routes: Routes = [
  {path: 'edit', component: EditorComponent},
  {path: 'edit/:id', component: EditorComponent},
  {path: 'history/:id', component: HistoryComponent},
  {path: '', component: TopComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
