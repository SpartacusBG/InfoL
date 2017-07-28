import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { TeamEvent } from './team.model';

@Injectable()
export class TeamService {
    private resourceUrl = 'http://pf.rails-stage.infoleven.eu:8084/teams';
    public errorMessage;

    constructor(private http: Http) { }

    create(user: TeamEvent): Observable<Response> {
        return this.http.post( 'http://pf.rails-stage.infoleven.eu:8084/teams', user).catch((err:Response) =>{
            this.errorMessage = err.json();
            return Observable.throw(new Error(this.errorMessage));
         });;
    }

    find(teamId: any): Observable<TeamEvent> {
        return this.http.get(`${this.resourceUrl}/${teamId}`).map((res: Response) => res.json());
    }

    setParams(req) {
        const params: URLSearchParams = new URLSearchParams();
        if (req) {
            params.set('page', req.page);
            params.set('per_page', req.size);
            params.set('tag', 'test');
            params.set('event_name', 'drive-and-putt');
            if (req.query) {
                params.set('name', req.query);
            }
        }
        return params;
    }

    search(req?: any): any {
        const options = {
            search: this.setParams(req)
        };
        return this.http.get('http://pf.rails-stage.infoleven.eu:8084/teams/search', options);
    }

    query(req?: any): any {
        const options = {
            search: this.setParams(req)
        };

        return this.http.get(this.resourceUrl, options);
    }

    update(teamEvent: TeamEvent): Observable<Response> {
        return this.http.put(this.resourceUrl, teamEvent).map(response => response.json());
            
    }

}
