import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, filter, map, of } from 'rxjs';
import { IUser } from 'src/app/model/user.dt';
import { EndpointService } from 'src/app/services/endpoint.service';
import { UnSub } from 'src/app/utils/unsubscribe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends UnSub implements OnInit {
  errorMessageSubject = new BehaviorSubject<string>('');
  errorMessageAction$ = this.errorMessageSubject.asObservable();

  dashboardUserList = new BehaviorSubject<IUser[]>([]);
  dashboardUserList$ = this.dashboardUserList.asObservable();
  constructor(private endpointService: EndpointService) {
    super();
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.endpointService.userList$
      .pipe(
        catchError((error) => {
          this.errorMessageSubject.next(error);
          return of([]);
        })
      )
      .subscribe({
        next: (users: IUser[]) => {
          console.log(users);
          this.dashboardUserList.next(users);
        },
        error: (error: any) => console.log(error),
      });
  }

  deleteUser(user: IUser): void {
    this.dashboardUserList$
      .pipe(
        catchError((error) => {
          this.errorMessageSubject.next(error);
          return of([]);
        })
      )
      .subscribe({
        next: (users: IUser[]) => {
          const res: IUser[] = users.filter(
            (selectedUser: IUser) => selectedUser.id !== user.id
          );
          this.endpointService.userList$.next(res);
        },
        error: (error: any) =>
          this.errorMessageSubject.next('Unable to delete User'),
      });
  }
}
