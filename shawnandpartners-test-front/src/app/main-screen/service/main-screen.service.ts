import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: 'User';
  site_admin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MainScreenService {

  constructor(private http: HttpClient) {
  }

  getUsers(since: number): Observable<any> {
    return this.http.get(`https://shawnandpartners-test.herokuapp.com/api/users?since=${since}`);
  }

  getUserDetails(username: string): Observable<any> {
    return this.http.get(`https://shawnandpartners-test.herokuapp.com/api/users/${username}/details`);
  }

  getUserRepos(username: string): Observable<any> {
    return this.http.get(`https://shawnandpartners-test.herokuapp.com/api/users/${username}/repos`);
  }

}
