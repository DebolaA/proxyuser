import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './create-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateUserRoutingModule } from './create-user-routing.module';

@NgModule({
  declarations: [CreateUserComponent],
  imports: [
    CommonModule,
    CreateUserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class CreateUserModule {}
