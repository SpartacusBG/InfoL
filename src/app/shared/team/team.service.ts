import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { TeamEvent } from './team.model';

@Injectable()
export class TeamService {
    private resourceUrl = 'http://pf.rails-stage.infoleven.eu:8084/teams';

    constructor(private http: Http) { }

    create(user: TeamEvent): Observable<Response> {
        return this.http.post( 'http://pf.rails-stage.infoleven.eu:8084/teams', user).map((res: Response) => res.json());;
    }

    find(teamId: any): Observable<TeamEvent> {
        return this.http.get(`${this.resourceUrl}/${teamId}`).map((res: Response) => res.json());
    }

    query(req?: any): any {
        const params: URLSearchParams = new URLSearchParams();
        if (req) {
            params.set('page', req.page);
            params.set('per_page', req.size);
            params.set('tag', 'test');
            params.set('event_name', 'drive-and-putt');
            if (req.sort) {
                 params.paramsMap.set('sort', req.sort);
            }
        }

        const options = {
            search: params
        };

        return this.http.get(this.resourceUrl, options);
    }

    update(teamEvent: TeamEvent): Observable<Response> {
        return this.http.put(this.resourceUrl, teamEvent);
    }

}
