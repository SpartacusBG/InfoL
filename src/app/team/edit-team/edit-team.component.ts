import 'rxjs/add/operator/finally';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TeamService } from './../../shared/team/team.service';
import { TeamEvent, Player, HoleScore, PuttScore, Team } from './../../shared/team/team.model';
import { TimePipe } from '../../pipes/time.pipe';
import { FlashMessagesService } from 'angular2-flash-messages';
import * as moment from 'moment';
 
// import { QuoteService } from './quote.service';

@Component({
  selector: 'edit-team-component',
  templateUrl: './edit-team.component.html',
  providers: [TimePipe],
  styleUrls: ['./edit-team.component.scss'],
})
export class EditTeamComponent implements OnInit {

  routeSub: any;
  currentTeam = new Team;
  currentPlayer = new Player;
  time = this.getMilliseconds(new Date());
  // time = moment(new Date().toDateString()).format('mm:ss:sss');
  formattedTime = moment(this.time).format('mm:ss:sss');
  puttScore = new PuttScore;
  event = new TeamEvent;
  puttNumber: number;;

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService,
    private flashMessagesService: FlashMessagesService
  ) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.findTeam(params.teamId);
    });

    
  }

  msToTime(duration) {
    var milliseconds = parseInt(((duration%1000)/100).toString())
        , seconds = parseInt(((duration/1000)%60).toString())
        , minutes = parseInt(((duration/(1000*60))%60).toString())
        , hours = parseInt(((duration/(1000*60*60))%24).toString());

    hours = (hours < 10) ? Number("0") + hours : hours;
    minutes = (minutes < 10) ? Number("0") + minutes : minutes;
    seconds = (seconds < 10) ? Number("0") + seconds : seconds;

    console.log( hours + ":" + minutes + ":" + seconds + ":" + milliseconds);
}

  getMilliseconds(date) {
    var m = moment(date);

    var ms = m.milliseconds() + 1000 * (m.seconds() + 60 * (m.minutes() + 60 * m.hours()));

    return ms
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

  splitTime() {
    var arr = this.formattedTime.split(":");
    var newTime = '';
    for (var i = 0; i < arr.length; i++) {
      newTime += arr[i];
    }
    return newTime;
  }

  save() {
    this.puttScore.time = Number(this.splitTime());
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
        this.puttNumber = this.currentTeam.drive_and_putt_score.putts;
        // this.time = moment(new Date(this.currentTeam.drive_and_putt_score.time).toDateString()).format('mm:ss:sss');
        // this.time = this.getMilliseconds(new Date(this.currentTeam.drive_and_putt_score.time));
        this.formattedTime = moment(new Date(this.currentTeam.drive_and_putt_score.time)).format('mm:ss:sss');
      //  console.log(moment(new Date(this.currentTeam.drive_and_putt_score.time)).format('mm:ss:sss'));
        console.log(this.currentTeam.drive_and_putt_score.time);
        this.msToTime(this.currentTeam.drive_and_putt_score.time)
    });
  }

}
