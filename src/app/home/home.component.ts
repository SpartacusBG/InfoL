import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
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
  checkbox;

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

  getAllInputsForValidation() {
    var eles = [];
    var inputs = document.getElementsByTagName("input");
    for(var i = 0; i < inputs.length; i++) {
      inputs[i].style.border = "0";
      eles.push(inputs[i]);
    }
    return eles;
  }

  save() {
    this.teamObject.team.players.push(this.playerObject);
    this.teamService.create(this.teamObject).subscribe((response) => this.onSaveSuccess(response), (err) => this.onSaveError(err));
    this.teamObject.team.players = [];
}

  removeDatePlaceHolderOnFocus(event) {
    event.target.nextElementSibling.style.display = 'none';
  }

  addDatePlaceHolderOnFocus(event) {
    if (!document.querySelector(".datePicker:valid")) {
      event.target.nextElementSibling.style.display = 'block';
    }
  }

  private onSaveSuccess(response) {
      this.isSaving = true;
      this.router.navigate(['/teams']);
  }

  private onSaveError(err) {
      let errorMessageArray = this.teamService.errorMessage;
      let allInputsArray = this.getAllInputsForValidation();

      allInputsArray.forEach((inputItem) => {
        errorMessageArray.forEach((messageItem) => {
          if (inputItem.name == messageItem.error) {
            this.flashMessagesService.show(messageItem.message, { cssClass: 'alert-error', timeout: 3000 });
            
            inputItem.style.border = "2px solid red";
          }
        });
      });
      

    this.isSaving = false;
  }

}
