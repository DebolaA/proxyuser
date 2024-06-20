import { IUser } from './../model/user.dt';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  Observable,
  catchError,
  map,
  throwError,
  BehaviorSubject,
  of,
} from 'rxjs';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EndpointService {
  userList$ = new BehaviorSubject<IUser[]>([]);

  constructor(private http: HttpClient) {}

  getUsers(): void {
    this.http
      .get<IUser[]>(`${env.BASE_URL}users`)
      .pipe(catchError(this.handleError))
      .subscribe({
        next: (data: IUser[]) => {
          this.userList$.next(data);
        },
      });
  }

  createUser(user: IUser): Observable<boolean> {
    let userList: IUser[] = this.userList$.value;
    if (user) {
      userList.push(user);
      this.userList$.next(userList);
      return of(true);
    }
    return of(false);
  }

  deleteUser(user: IUser): Observable<boolean> {
    let userList: IUser[] = this.userList$.value;
    if (user) {
      const newList = userList.filter((x: IUser) => x.id !== user.id);
      this.userList$.next(newList);
      return of(true);
    }
    return of(false);
  }

  getArrayLength(): number {
    const list = this.userList$.value;
    if (list && list.length) return list.length;
    else return 0;
  }

  handleError(error: Error) {
    return throwError(() => {
      return `${error.message}`;
    });
  }
}
