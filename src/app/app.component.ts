import { Component } from '@angular/core';
import { EndpointService } from './services/endpoint.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'proxyuser';
  constructor(private endpointService: EndpointService) {
    console.log('start');
    this.endpointService.getUsers();
  }
  ngOnInit() {
    console.log('start 2');
  }
}
