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

  // it('should get list of users from api', () => {
  //   const result = service.userList$.value;

  //   expect(result).toEqual(testData);

  //   const req = httpTestingController.expectOne(
  //     'https://jsonplaceholder.typicode.com/users'
  //   );
  //   expect(req.request.method).toEqual('GET');

  //   req.flush(testData);
  //   httpTestingController.verify();
  // });

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
    let user = testData[1];
    (user.id = 11), (user.name = 'Larrit Olorinla');

    service.createUser(user);
    expect(service.userList$.value.length).toEqual(3);
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
    let user = testData[2];
    service.deleteUser(user);
    expect(service.userList$.value.length).toEqual(1);
  });

  it('should update details of user with id 2', () => {
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
    let user = testData[2];
    (user.id = 10), (user.name = 'UPDATED NAME');
    service.updateUser(user);

    expect(testData[2].id).toBe(10);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
