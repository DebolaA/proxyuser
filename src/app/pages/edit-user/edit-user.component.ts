import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription, catchError, of } from 'rxjs';
import { IUser } from 'src/app/model/user.dt';
import { EndpointService } from 'src/app/services/endpoint.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  messageSubject = new BehaviorSubject<string>('');
  messageAction$ = this.messageSubject.asObservable();
  error: boolean = false;
  paramSub: Subscription;

  user: IUser | undefined;

  userForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    city: new FormControl('', [Validators.required]),
    zipcode: new FormControl('', [Validators.required]),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private endpointService: EndpointService
  ) {
    this.paramSub = this.route.params.subscribe((params: any) => {
      const id: number | undefined = params
        ? parseInt(params['id'])
        : undefined;
      if (id) {
        this.endpointService.getUserWithId(id).subscribe({
          next: (data: IUser | null) => {
            data
              ? this.populateForm(data)
              : this.messageSubject.next('No such user exists');
          },
          error: (error: Error) => {
            this.messageSubject.next(error.message);
          },
        });
      }
    });
  }

  ngOnInit(): void {}

  populateForm(user: IUser) {
    if (user) {
      this.userForm = new FormGroup({
        id: new FormControl(user.id),
        username: new FormControl(user.username, [Validators.required]),
        name: new FormControl(user.name, [Validators.required]),
        email: new FormControl(user.email, [
          Validators.required,
          Validators.email,
        ]),
        city: new FormControl(user?.address?.city, [Validators.required]),
        zipcode: new FormControl(user?.address?.zipcode, [Validators.required]),
        suite: new FormControl(user?.address?.suite),
        street: new FormControl(user?.address?.street),
      });
    }
  }

  updateUserDetails() {
    const user = this.userForm.value;
    const newUser: IUser = {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      address: {
        city: user.city,
        street: user.street,
        suite: user.suite,
        zipcode: user.zipcode,
      },
    };
    this.endpointService.updateUser(newUser).subscribe({
      next: (res: boolean) => {
        if (res) this.router.navigate(['/dashboard']);
        else this.messageSubject.next('Unable to update user details');
      },
      error: (error: Error) => {
        this.messageSubject.next('Unable to delete User details');
      },
    });
  }
}
