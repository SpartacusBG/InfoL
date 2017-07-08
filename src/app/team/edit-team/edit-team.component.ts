import 'rxjs/add/operator/finally';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TeamService } from './../../shared/team/team.service';
import { TeamEvent, Player, HoleScore, PuttScore, Team } from './../../shared/team/team.model';

// import { QuoteService } from './quote.service';

@Component({
  selector: 'edit-team-component',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.scss']
})
export class EditTeamComponent implements OnInit {

  routeSub: any;
  currentTeam = new TeamEvent;

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService,
  ) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.findTeam(params.teamId);
    });
  }

  findTeam(teamId) {
    this.teamService.find(teamId).subscribe((user) => {
            this.currentTeam = user;
            console.log(this.currentTeam);
        });
  }

}
