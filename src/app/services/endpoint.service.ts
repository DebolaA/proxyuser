import { IUser } from './../model/user.dt';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, of } from 'rxjs';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EndpointService {
  userList$ = new BehaviorSubject<IUser[]>([]);

  constructor(private http: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    return this.http
      .get<IUser[]>(`${env.BASE_URL}users`)
      .pipe(catchError(this.handleError));
  }

  getUserWithId(id: number): Observable<IUser | null> {
    const list: IUser[] = this.userList$.value;
    const index = list.findIndex((x) => x.id === id);
    if (index > -1) return of(list[index]);
    else return of(null);
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

  updateUser(user: IUser): Observable<boolean> {
    let userList: IUser[] = this.userList$.value;
    if (user) {
      const index = userList.findIndex((x: IUser) => x.id === user.id);
      if (index > -1) userList[index] = user;
      this.userList$.next(userList);
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
