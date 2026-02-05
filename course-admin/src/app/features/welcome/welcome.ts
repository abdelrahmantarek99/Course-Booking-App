// src/app/features/welcome/welcome.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Welcome to the Course Booking Admin</h1>
    <p>This admin panel allows you to manage courses, instructors, students, and bookings.</p>
    <ul>
      <li>Courses: Create, edit, delete courses</li>
      <li>Instructors: Manage instructor profiles</li>
      <li>Students: Manage student information</li>
      <li>Bookings: Manage which students booked which courses</li>
    </ul>
  `
})    
export class WelcomeComponent { }
