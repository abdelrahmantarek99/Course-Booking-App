import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesComponent } from '../../features/courses/courses';
import { InstructorsComponent } from '../../features/instructors/instructor';
import { StudentsComponent } from '../../features/students/student';
import { EnrollmentComponent } from '../../features/enrollments/enrollment';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,
    CoursesComponent,
    InstructorsComponent,
    StudentsComponent,
    EnrollmentComponent
  ],
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.css']
})
export class AdminLayoutComponent {

  activeTab:
    | 'welcome'
    | 'courses'
    | 'instructors'
    | 'students'
    | 'enrollments' = 'welcome';

  selectTab(tab: any) {
    this.activeTab = tab;
  }
}
