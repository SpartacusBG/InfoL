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
  page: any;
  predicate: any;
  reverse: any;
  p: number = 1;
  teams = new TeamEvent;
  spinner: boolean = true;

  constructor(
    private teamService: TeamService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
  }

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
        this.teamService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()}).subscribe(
            (res: Response) => this.onSuccess(res.json(), res.headers),
            (res: Response) => this.onError(res.json())
        );
    }

  sort() {
      const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
      if (this.predicate !== 'id') {
          result.push('id');
      }
      return result;
  }

  private onSuccess(data: any, headers: any) {
      this.totalItems = headers.get('X-Total-Count');
      this.queryCount = this.totalItems;
      this.teams = data;
      this.spinner = false;
  }

  private onError(error: any) {
      // this.alertService.error(error.error, error.message, null);
  }
    transition() {
        this.router.navigate(['/user-management'], { queryParams:
                {
                    page: this.page,
                    sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
                }
        });
        this.loadAll();
    }
}
