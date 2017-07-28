import 'rxjs/add/operator/finally';

import { Component, OnInit } from '@angular/core';
import { TeamEvent, Player, HoleScore, PuttScore, Team } from './../shared/team/team.model';
import { TeamService } from './../shared/team/team.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ITEMS_PER_PAGE } from './../shared/constraints/pagination.constants';

@Component({
  selector: 'team-component',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  totalItems: any;
  queryCount: any;
  itemsPerPage: any;
  predicate: any;
  reverse: any;
  p: number = 0;
  teams = new TeamEvent;
  spinner: boolean = true;
  previousPage: any;

  constructor(
    private teamService: TeamService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
  }

  ngOnInit() {
    this.loadAll(0);
  }

  loadAll(event) {
        this.teamService.query({
            page: event,
            size: this.itemsPerPage}).subscribe(
            (res: Response) => this.onSuccess(res.json()),
            (res: Response) => this.onError(res.json())
        );
    }

  private onSuccess(response) {
      this.totalItems = response.total;
      this.teams = response;
      this.spinner = false;
  }

  private onError(error: any) {
      alert(error.error);
  }


  getServerData(event) {
      this.loadAll(event);   
  }

}
