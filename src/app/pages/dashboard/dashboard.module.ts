import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { UserCardComponent } from 'src/app/components/user-card/user-card.component';

@NgModule({
  declarations: [DashboardComponent, UserCardComponent],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
