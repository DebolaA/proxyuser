import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/model/user.dt';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  @Input() user: IUser | undefined = undefined;
  @Output() deleteUser = new EventEmitter<IUser>();
  constructor(private router: Router) {}

  ngOnInit(): void {}

  removeUser(event: Event) {
    this.deleteUser.emit(this.user);
  }

  editUser(event: Event) {
    // const target = (event.target as Element).className;
    this.router.navigate(['/edit-user', this.user?.id]);
  }
}
