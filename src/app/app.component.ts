import { Component } from '@angular/core';
import { EndpointService } from './services/endpoint.service';
import { IUser } from './model/user.dt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'proxyuser';
  constructor(private endpointService: EndpointService) {
    console.log('start');
    this.endpointService.getUsers().subscribe({
      next: (data: IUser[]) => {
        this.endpointService.userList$.next(data);
      },
      error: (err: Error) => console.log(err),
    });
  }
  ngOnInit() {}
}
