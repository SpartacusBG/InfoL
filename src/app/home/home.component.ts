import 'rxjs/add/operator/finally';

import { Component, OnInit } from '@angular/core';
import { TeamEvent, Player, HoleScore, PuttScore, Team } from './../shared/team/team.model';
import { TeamService } from './../shared/team/team.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

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
    private flashMessagesService: FlashMessagesService
    ) {}

  ngOnInit() {
    this.teamObject.team = new Team;
    this.teamObject.team.players = new Array<Player>();  
    this.isSaving = false;
  }

  save() {
    this.teamObject.team.players.push(this.playerObject);
    this.teamService.create(this.teamObject).subscribe((response) => this.onSaveSuccess(), (err) => this.onSaveError(err));
  }

  removeDatePlaceHolderOnFocus(event) {
    event.target.nextElementSibling.style.display = 'none';
  }

  addDatePlaceHolderOnFocus(event) {
    if (!document.querySelector(".datePicker:valid")) {
      event.target.nextElementSibling.style.display = 'block';
    }
  }

  private onSaveSuccess() {
      this.isSaving = true;
      this.router.navigate(['/teams']);
  }

  private onSaveError(err) {
    console.log(err);
     this.flashMessagesService.show(err, { cssClass: 'alert-error', timeout: 3000 })
    this.isSaving = false;
  }

}
