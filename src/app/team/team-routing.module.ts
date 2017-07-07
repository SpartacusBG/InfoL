import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { extract } from '../core/i18n.service';
import { TeamComponent } from './team.component';

const routes: Routes = Route.withShell([
  { path: '', redirectTo: '/teams', pathMatch: 'full' },
  { path: 'teams', component: TeamComponent, data: { title: extract('Teams') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class TeamRoutingModule { }
