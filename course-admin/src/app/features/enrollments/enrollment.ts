import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { StudentService } from '../../core/services/student.service';
import { CourseService } from '../../core/services/course.service';
import { EnrollmentService } from '../../core/services/enrollment.service';
import { StudentResponseDto } from '../../core/models/studentResponseDto';
import { EnrollmentResponseDto } from '../../core/models/enrollmentResponseDto';
import { Course } from '../../core/models/course.model';

@Component({
  selector: 'app-enrollment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './enrollment.html',
  styleUrls: ['./enrollment.css']
})

export class EnrollmentComponent implements OnInit {
  // Use inject() for modern, clean dependency injection
  private fb = inject(FormBuilder);
  private studentService = inject(StudentService);
  private courseService = inject(CourseService);
  private enrollmentService = inject(EnrollmentService);

  enrollments: EnrollmentResponseDto[] = [];

  students: any[] = [];
  courses: any[] = [];
  success = '';
  error = '';

  // Use .nonNullable so controls reset to '' instead of null
  form = this.fb.nonNullable.group({
    studentId: ['', Validators.required],
    courseId: ['', Validators.required]
  });
  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadStudents();
    this.loadCourses();
    this.loadEnrollments();
  }

  loadEnrollments() {
    this.enrollmentService.getAll().subscribe({
      next: (res: EnrollmentResponseDto[]) => { this.enrollments = [...res]; this.cdr.detectChanges(); },
      error: () => { this.error = 'Failed to load enrollments'; this.cdr.detectChanges(); }
    });
  }

  deleteEnrollment(id: number) {
    if (!confirm('Delete this enrollment?')) return;

    this.enrollmentService.delete(id).subscribe({
      next: () => {
        this.success = 'Enrollment deleted ✅';
        this.loadEnrollments();
      },
      error: () => {
        this.error = 'Failed to delete enrollment';
        this.cdr.detectChanges();
      }
    });
  }

  loadStudents() {
    this.studentService.getAll().subscribe({
      next: (res: StudentResponseDto[]) => {
        this.students = res;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load students';
        this.cdr.detectChanges();
      }
    });
  }

  loadCourses() {
    this.courseService.getAll().subscribe({
      next: (res: Course[]) => {
        this.courses = res;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load courses';
        this.cdr.detectChanges();
      }
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.success = '';
    this.error = '';

    // 1. Get the raw string values from the form
    const rawData = this.form.getRawValue();

    // 2. Transform strings into Integers
    const enrollmentData = {
      studentId: Number(rawData.studentId),
      courseId: Number(rawData.courseId)
    };

    // 3. Send the numeric data to the service
    this.enrollmentService.create(enrollmentData).subscribe({
      next: () => {
        this.success = 'Student enrolled successfully ✅';
        this.form.reset();
        this.loadEnrollments();
      },
      error: (err: any) => {
        if (err.status === 409) {
          this.error = 'Student is already enrolled in this course ❌';
        } else {
          this.error = 'Enrollment failed ❌';
        }
        this.cdr.detectChanges();
      }
    });

  }
}
