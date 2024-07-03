import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { EndpointService } from './endpoint.service';
import { IUser } from '../model/user.dt';

describe('EndpointService', () => {
  let service: EndpointService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EndpointService],
    });
    service = TestBed.inject(EndpointService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('creates a service', () => {
    expect(service).toBeTruthy();
  });

  it('should get list of users from api', () => {
    //Arrange
    const testData = [
      {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
        },
      },
      {
        id: 2,
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.tv',
        address: {
          street: 'Victor Plains',
          suite: 'Suite 879',
          city: 'Wisokyburgh',
          zipcode: '90566-7771',
        },
      },
    ];
    let result: IUser[] | undefined;
    service.getUsers().subscribe({
      next: (res: IUser[] | undefined) => {
        result = res;
      },
      error: (error: Error) => (result = undefined),
    });

    const req = httpTestingController.expectOne(
      'https://jsonplaceholder.typicode.com/users'
    );
    expect(req.request.method).toEqual('GET');
    if (result) expect(result?.length).toBe(2);

    req.flush(testData);
    httpTestingController.verify();
  });

  it('should return user with id: 1', () => {
    //Arrange
    const testData = [
      {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
        },
      },
      {
        id: 2,
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.tv',
        address: {
          street: 'Victor Plains',
          suite: 'Suite 879',
          city: 'Wisokyburgh',
          zipcode: '90566-7771',
        },
      },
    ];
    let user = null;
    service.getUserWithId(1).subscribe({
      next: (user: IUser | null) => (user = user),
      error: (error: Error) => (user = null),
    });
    if (user) expect(user).toEqual(testData[1]);
    else expect(user).toBeNull;
  });

  it('should create a new user', () => {
    //Arrange
    const testData = [
      {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
        },
      },
      {
        id: 2,
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.tv',
        address: {
          street: 'Victor Plains',
          suite: 'Suite 879',
          city: 'Wisokyburgh',
          zipcode: '90566-7771',
        },
      },
    ];
    let user = testData[0];
    let result: boolean = false;

    service.createUser(user).subscribe({
      next: (res: boolean) => (result = res),
      error: (error: Error) => (result = false),
    });

    expect(service.userList$.value.length).toEqual(1);
    expect(service.userList$.value[0].name).toBe('Leanne Graham');
    expect(result).toBeTruthy();
  });

  it('should delete user with id 2', () => {
    //Arrange
    const testData = [
      {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
        },
      },
      {
        id: 2,
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.tv',
        address: {
          street: 'Victor Plains',
          suite: 'Suite 879',
          city: 'Wisokyburgh',
          zipcode: '90566-7771',
        },
      },
    ];
    const user = testData[1];
    let result: boolean = false;
    service.userList$.next(testData);
    service.deleteUser(user).subscribe({
      next: (res: boolean) => (result = res),
      error: (error: Error) => (result = false),
    });

    expect(result).toBeTruthy();
    expect(service.userList$.value.length).toEqual(1);
  });

  it('should update details of user with id 2', () => {
    //Arrange
    const testData: IUser[] = [
      {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
        },
      },
      {
        id: 2,
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.tv',
        address: {
          street: 'Victor Plains',
          suite: 'Suite 879',
          city: 'Wisokyburgh',
          zipcode: '90566-7771',
        },
      },
    ];
    let user: IUser = {
      id: 2,
      name: 'UPDATED NAME',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
      address: {
        street: 'Victor Plains',
        suite: 'Suite 879',
        city: 'Wisokyburgh',
        zipcode: '90566-7771',
      },
    };
    service.userList$.next(testData);
    let result: boolean = false;
    service.updateUser(user).subscribe({
      next: (res: boolean) => (result = res),
      error: (error: Error) => (result = false),
    });

    expect(service.userList$.value[1].name).toBe('UPDATED NAME');
    expect(result).toBeTruthy();
  });
});
