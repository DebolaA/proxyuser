import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/model/user.dt';
import { EndpointService } from 'src/app/services/endpoint.service';
import { UnSub } from 'src/app/utils/unsubscribe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends UnSub implements OnInit {
  userList: IUser[] = [];
  constructor(private endpointService: EndpointService) {
    super();
  }

  ngOnInit(): void {
    this.endpointService.getUsers().subscribe((data: IUser[]) => {
      this.userList = data;
    });
  }
}
