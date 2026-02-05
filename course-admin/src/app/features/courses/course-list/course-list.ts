import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CourseService } from '../../../core/services/course.service';
import { Course } from '../../../core/models/course.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-list.html',
  styleUrls: ['./course-list.css']
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private courseService: CourseService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses() {
    this.loading = true;
    this.error = null;

    this.courseService.getAll().subscribe({
      next: (data: Course[]) => {
        this.courses = data;
        console.log(this.courses);
        this.loading = false;
        this.cdr.detectChanges(); // force UI refresh

      },
      error: () => {
        this.error = 'Failed to load courses';
        this.loading = false;
        this.cdr.detectChanges(); // also refresh on error

      }
    });
  }


  deleteCourse(id?: number) {
    if (!id) return; 

    if (!confirm('Are you sure you want to delete this course?')) return;

    this.courseService.delete(id).subscribe({
      next: () => {
        alert('course deleted successfully');

        this.fetchCourses();
      },
      error: () => {
        this.error = 'Failed to delete course';
        alert(this.error);

        this.cdr.detectChanges(); // refresh on error

      }
    });
  }
}
