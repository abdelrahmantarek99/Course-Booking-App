// src/app/features/courses/courses.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseListComponent } from './course-list/course-list';
import { CourseFormComponent } from './course-form/course-form';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule,
    CourseListComponent,
    CourseFormComponent
  ],
  template: `
    <h2>Courses Management</h2>
        <app-course-form></app-course-form>
        <app-course-list></app-course-list>
    <hr>
  `
})
export class CoursesComponent { }
