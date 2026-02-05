import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';

import { StudentService } from '../../core/services/student.service';
import { CourseService } from '../../core/services/course.service';
import { EnrollmentService } from '../../core/services/enrollment.service';


@Component({
  selector: 'app-enrollment' ,
  templateUrl: './enrollment.html',
  imports: [ReactiveFormsModule],
  styleUrls: ['./enrollment.css']
})

export class EnrollmentComponent implements OnInit {

  students: any[] = [];
  courses: any[] = [];

  form: FormGroup;

  error = '';
  success = '';

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService
  ) {
    this.form = this.fb.group({
      studentId: ['', Validators.required],
      courseId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadStudents();
    this.loadCourses();
  }

  loadStudents() {
    this.studentService.getAll().subscribe({
      next: (res: any) => this.students = res,
      error: () => this.error = 'Failed to load students'
    });
  }

  loadCourses() {
    this.courseService.getAll().subscribe({
      next: (res: any) => this.courses = res,
      error: () => this.error = 'Failed to load courses'
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.error = '';
    this.success = '';

    this.enrollmentService.create(this.form.value).subscribe({
      next: () => {
        this.success = 'Student enrolled successfully ✅';
        this.form.reset();
      },
      error: (err: any) => {
        if (err.status === 409) {
          this.error = 'Student is already enrolled in this course';
        } else {
          this.error = 'Enrollment failed';
        }
      }
    });
  }
}

