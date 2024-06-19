import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { IUser } from '../model/user.dt';

@Injectable({
  providedIn: 'root',
})
export class EndpointService {
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

  handleError(error: Error) {
    return throwError(() => {
      return `${error.message}`;
    });
  }
}
