import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { TeamComponent } from './team.component';
import { EditTeamComponent } from './edit-team/edit-team.component';
import { TeamRoutingModule } from './team-routing.module';
import { EditTeamRoutingModule } from './edit-team/edit-team-routing.module';
@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    TeamRoutingModule,
    EditTeamRoutingModule
  ],
  declarations: [
    TeamComponent,
    EditTeamComponent
  ],
  providers: [
  ]
})
export class TeamModule { }
