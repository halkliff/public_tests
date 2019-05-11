import {Component, OnInit} from '@angular/core';
import {MainScreenService, User} from "./service/main-screen.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'sp-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss']
})
export class MainScreenComponent implements OnInit {

  userList: User[];
  private currentUser = 0;

  constructor(protected service: MainScreenService) {
  }

  ngOnInit() {
    this.service.getUsers(this.currentUser).toPromise().then(
      (response) => {
        this.userList = response.data;
        this.currentUser = this.userList[this.userList.length - 1].id;
      },
      () => {
        alert('Whoops! Something went wrong. Let\'s reload the page');
        window.location.reload();
      }
    );
  }

  previousPage() {
    this.service.getUsers(this.currentUser - 30).toPromise().then(
      (response) => {
        this.userList = response.data;
        this.currentUser = this.userList[this.userList.length - 1].id;
      },
      (err: HttpErrorResponse) => {
        alert('Whoops! Something went wrong. Try to paginate to the previous page again!');
        console.error(err);
      }
    );
  }

  nextPage() {

    this.service.getUsers(this.currentUser + 30).toPromise().then(
      (response) => {
        this.userList = response.data;
        this.currentUser = this.userList[this.userList.length - 1].id;
      },
      (err: HttpErrorResponse) => {
        alert('Whoops! Something went wrong. Try to paginate to the next page again!');
        console.error(err);
      }
    );
  }

}
