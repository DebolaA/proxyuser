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

  userList = new BehaviorSubject<IUser[]>([]);
  userList$ = this.endpointService.getUsers();
  constructor(private endpointService: EndpointService) {
    super();
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userList$
      .pipe(
        catchError((error) => {
          this.errorMessageSubject.next(error);
          return of([]);
        })
      )
      .subscribe({
        next: (users: IUser[]) => {
          console.log(users);
          this.userList.next(users);
        },
        error: (error: any) => console.log(error),
      });
  }

  deleteUser(user: IUser): void {
    this.userList$ = this.userList$.pipe(
      map((users: IUser[]) => {
        return users.filter(
          (selectedUser: IUser) => selectedUser.id !== user.id
        );
      }),
      catchError((error) => {
        this.errorMessageSubject.next(error);
        return of([]);
      })
    );
  }
}
