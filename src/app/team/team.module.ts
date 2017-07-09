import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { TeamComponent } from './team.component';
import { EditTeamComponent } from './edit-team/edit-team.component';
import { TeamRoutingModule } from './team-routing.module';
import { EditTeamRoutingModule } from './edit-team/edit-team-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { TimePipe } from '../pipes/time.pipe';
import {MomentModule} from 'angular2-moment/moment.module';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { SpinnerModule } from 'angular2-spinner/dist';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    TeamRoutingModule,
    EditTeamRoutingModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    FormsModule,
    MomentModule,
    FlashMessagesModule,
    SpinnerModule
  ],
  declarations: [
    TeamComponent,
    EditTeamComponent
  ],
  providers: [
  ]
})
export class TeamModule { }
