import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { TeamEvent } from './team.model';

@Injectable()
export class TeamService {
    private resourceUrl = 'http://pf.rails-stage.infoleven.eu:8084/teams';

    constructor(private http: Http) { }

    create(user: TeamEvent): Observable<Response> {
        return this.http.post( 'http://pf.rails-stage.infoleven.eu:8084/teams', user);
    }

    // update(user: User): Observable<Response> {
    //     return this.http.put(this.resourceUrl, user);
    // }

    // find(login: string): Observable<User> {
    //     return this.http.get(`${this.resourceUrl}/${login}`).map((res: Response) => res.json());
    // }

    query(req?: any): any {
        const params: URLSearchParams = new URLSearchParams();
        if (req) {
            params.set('page', req.page);
            params.set('per_page', req.size);
            params.set('tag', 'tag');
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

    // delete(login: string): Observable<Response> {
    //     return this.http.delete(`${this.resourceUrl}/${login}`);
    // }
}
