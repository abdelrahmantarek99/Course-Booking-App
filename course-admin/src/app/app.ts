import { Component, signal } from '@angular/core';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AdminLayoutComponent],
  template: '<app-admin-layout></app-admin-layout>'
})
export class App {
  protected readonly title = signal('CourseBooking Admin UI');
}
