import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { IUser } from 'src/app/model/user.dt';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  messageSubject = new BehaviorSubject<string>('');
  messageAction$ = this.messageSubject.asObservable();
  error: boolean = false;

  user: IUser | undefined;

  userForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    addres: new FormControl(null),
  });

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}

  onSubmit(user: IUser) {}
}
