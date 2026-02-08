import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../../core/services/course.service';
import { Instructor } from '../../../core/models/instructor.model';
import { InstructorService } from '../../../core/services/instructor.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './course-form.html',
})
export class CourseFormComponent implements OnInit {
  form!: FormGroup;
  instructors: Instructor[] = [];
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private instructorService: InstructorService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  resetForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      durationHours: [0, Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
      instructorId: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.resetForm();
  }


  ngAfterViewInit() {
    // fetch instructors safely
    this.instructorService.getAll().subscribe({
      next: (data: Instructor[]) => {
        this.instructors = data;
        this.cdr.detectChanges();

      },
      error: () => {
        const msg = 'Failed to load instructors';
        alert(msg);
        this.error = msg;
        this.cdr.detectChanges();
      }
    });
  }


  submit() {
    if (this.form.invalid) return;

    this.courseService.create(this.form.value).subscribe({
      next: () => {
        alert('Course created successfully');
        this.form.reset();
        this.cdr.detectChanges();
        // notify list to reload list
        this.courseService.notifyRefresh();
      },
      error: () => {
        let msg = 'Something went wrong while creating the course. please check your input';
        alert(msg);
        this.error = msg;
        this.cdr.detectChanges();

      }
    });
  }
}
