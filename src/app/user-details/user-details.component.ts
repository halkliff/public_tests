import {Component, OnInit} from '@angular/core';
import {MainScreenService, User} from '../main-screen/service/main-screen.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'sp-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  user: User;
  userRepos: any[] = [];

  constructor(protected service: MainScreenService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const username = this.activatedRoute.snapshot.paramMap.get('username');
    this.service.getUserDetails(username).toPromise().then(
      (response) => {
        this.user = response.data;
        this.service.getUserRepos(username).toPromise().then(
          (res) => this.userRepos = res,
          () => {
            alert('Whoops! Couldn\'t load the user repositories.');
          }
        );
      },
      () => {
        alert('Whoops! Something went wrong. Let\'s reload the page');
        window.location.reload();
      }
    );
  }

}
