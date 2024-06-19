import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { IUser } from 'src/app/model/user.dt';
import { EndpointService } from 'src/app/services/endpoint.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
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

  constructor(
    private endpointService: EndpointService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(user: IUser) {
    this.endpointService.createUser(user).subscribe({
      next: (res: boolean) => {
        if (res) this.router.navigate(['/dashboard']);
        else this.messageSubject.next('Cannot create new user');
      },
      error: (error: any) => this.messageSubject.next(error.message),
    });
  }
}
