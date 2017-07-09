import 'rxjs/add/operator/finally';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TeamService } from './../../shared/team/team.service';
import { TeamEvent, Player, HoleScore, PuttScore, Team } from './../../shared/team/team.model';
import { FlashMessagesService } from 'angular2-flash-messages';
import * as moment from 'moment';
 
// import { QuoteService } from './quote.service';

@Component({
  selector: 'edit-team-component',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.scss'],
})
export class EditTeamComponent implements OnInit {

  routeSub: any;
  currentTeam = new Team;
  currentPlayer = new Player;
  puttScore = new PuttScore;
  event = new TeamEvent;
  puttNumber: number;
  minutes = "00";
  seconds = "00";
  milliSeconds = "00";

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService,
    private flashMessagesService: FlashMessagesService
  ) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.findTeam(params.teamId);
    });

    const elm = document.body.querySelector("input[type=number]");
    elm.addEventListener('keyup', this.createValidator(elm));
     
  }

  model = 3;
  validate(value)  {
    value < 0 ? this.model = 0 : this.model = value;
    this.puttScore.putts = value;
  }

  formatDate(date) {
    const formattedDate = new Date(date);
    return formattedDate;
  }

  checkMinuntesLength(el) {
    this.minutes = this.checkInputLength(el, this.minutes);
  }

  checkSecondsLength(el) {
    this.seconds = this.checkInputLength(el, this.seconds);
  }

  checkMilliSecondsLength(el) {
    this.milliSeconds = this.checkInputLength(el, this.milliSeconds);
  }

  checkInputLength(el, item) {
    if (el.target.value.length < 2 && el.target.value.length >= 1) {
      item = "0" + item;
    }else if (el.target.value.length < 1) {
      item = "00" + item;
    }
    return item;
  }

  createValidator(element) {
    return () => {
        let min = parseInt(element.getAttribute("min")) || 0;
        let max = parseInt(element.getAttribute("max")) || 0;

        let value = parseInt(element.value) || min;
        element.value = value; // make sure we got an int

        if (value < min) element.value = min;
        if (value > max) element.value = max;
    }
  }

  save() {
    const dateAsMilliseconds = this.minutes + this.seconds + this.milliSeconds;
    this.puttScore.time = Number(dateAsMilliseconds);
    this.currentTeam.drive_and_putt_score = this.puttScore;
    this.currentTeam.players[0] = this.currentPlayer;
    this.event.team = this.currentTeam;

    this.teamService.update(this.event).subscribe((response) => this.onSaveSuccess(response), (err) => this.onSaveError(err));
  }

  private onSaveSuccess(resp) {
    this.flashMessagesService.show('Team saved', { cssClass: 'alert-success', timeout: 3000 })
  }

  private onSaveError(err) {

     this.flashMessagesService.show(err, { cssClass: 'alert-error', timeout: 3000 })
  }

  findTeam(teamId) {
    this.teamService.find(teamId).subscribe((data) => {
        this.currentTeam = data;
        this.currentPlayer = this.currentTeam.players[0];
        this.currentPlayer.birthdate = this.formatDate(this.currentPlayer.birthdate).toString();
        this.puttScore.putts = this.currentTeam.drive_and_putt_score.putts;

        let timeArray = this.currentTeam.drive_and_putt_score.time.toString().split('');
        for (let i = 0; i < timeArray.length; i++) {
          if (timeArray[i] == undefined) {
              timeArray[i] = '0';
          }
        }
        this.minutes = timeArray[0] + timeArray[1];
        this.seconds = timeArray[2] + timeArray[3];
        this.milliSeconds = timeArray[4] + timeArray[5];
    });
  }

}
