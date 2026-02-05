import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InstructorService } from '../../core/services/instructor.service';
import { Instructor } from '../../core/models/instructor.model';

@Component({
  selector: 'app-instructors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './instructor.html',
  styleUrls: ['./instructor.css']


})
export class InstructorsComponent implements OnInit {
  instructors: Instructor[] = [];
  model: Instructor = { id: -1, name: '', email: '', bio: '' };

  constructor(private instructorService: InstructorService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.load();
  }

  private isValid(): boolean {
    if (!this.model.name?.trim()) return false;
    if (!this.model.email?.trim()) return false;
    if (!this.model.bio?.trim()) return false;
    return true;
  }


  load() {
    this.instructorService.getAll().subscribe({
      next: (res: Instructor[]) => {
        this.instructors = res;
        this.cdr.detectChanges(); // force Angular to notice change

      },
      error: () => alert('Failed to load instructors')
    });

  }

  save() {
    let successMessage = '';
    let errorMessage = '';

    //  Validation first
    if (!this.isValid()) {
      errorMessage = 'Name, Email, and Bio are required';
      alert(errorMessage);
      return;
    }

    if (this.model.id === -1) {
      // CREATE
      this.instructorService.create(this.model).subscribe({
        next: () => {
          successMessage = 'Instructor created successfully ✅';
          this.load();
          this.reset();
        },
        error: () => {
          errorMessage = 'Failed to create instructor ❌';
          alert(errorMessage);
        }
      });
    } else {
      // UPDATE
      this.instructorService.update(this.model.id, this.model).subscribe({
        next: () => {
          successMessage = 'Instructor updated successfully ✅';
          this.load();
          this.reset();
        },
        error: () => {
          errorMessage = 'Failed to update instructor ❌';
          alert(errorMessage);
        }
      });
    }
  }



  edit(i: Instructor) {
    this.model = { ...i };
  }

  delete(id: number) {
    this.instructorService.delete(id).subscribe({
      next: () => {
        this.load();
        alert('Instructor deleted successfully');
      },
      error: () => alert('Failed to delete instructor')
    });
  }


  reset() {
    this.model = { id: -1, name: '', email: '', bio: '' };
  }
}
