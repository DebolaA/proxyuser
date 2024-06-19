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
import { IUser } from '../model/user.dt';

@Injectable({
  providedIn: 'root',
})
export class EndpointService {
  userList$ = new BehaviorSubject<IUser[]>([]);

  constructor(private http: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${env.BASE_URL}users`).pipe(
      map((data: IUser[]) => {
        console.log(data);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  createUser(user: IUser): Observable<boolean> {
    let userList: IUser[] = [];
    if (user) {
      this.userList$.subscribe((data: IUser[]) => {
        userList = data;
        userList.push(user);
        this.userList$.next(userList);
        return of(true);
      }),
        catchError((err) => {
          console.error(err);
          return of(false);
        });
    }
  }

  handleError(error: Error) {
    return throwError(() => {
      return `${error.message}`;
    });
  }
}
