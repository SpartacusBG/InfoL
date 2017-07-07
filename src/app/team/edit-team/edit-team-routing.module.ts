import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../../core/route.service';
import { extract } from '../../core/i18n.service';
import { EditTeamComponent } from './edit-team.component';

const routes: Routes = Route.withShell([
  { path: '', redirectTo: '/teams', pathMatch: 'full' },
  { path: 'edit-team', component: EditTeamComponent, data: { title: extract('Teams') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class EditTeamRoutingModule { }
