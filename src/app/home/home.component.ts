import 'rxjs/add/operator/finally';

import { Component, OnInit } from '@angular/core';
import { TeamEvent, Player, HoleScore, PuttScore, Team } from './../shared/team/team.model';
import { TeamService } from './../shared/team/team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  playerObject = new Player;
  isSaving: boolean;
  teamObject = new TeamEvent;

  constructor(
    private teamService: TeamService,
    private router: Router,
    ) {}

  ngOnInit() {
    this.teamObject.team = new Team;
    this.teamObject.team.players = new Array<Player>();  
    this.isSaving = false;
  }

  save() {
    this.teamObject.team.players.push(this.playerObject);
    this.teamService.create(this.teamObject).subscribe((response) => this.onSaveSuccess(), () => this.onSaveError());
  }

  private onSaveSuccess() {
      this.isSaving = false;
      this.router.navigate(['/teams']);
  }

  private onSaveError() {
      this.isSaving = false;
  }

}
