import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../core/services/student.service';
import { StudentCreateDto } from '../../core/models/studentCreateDto';
import { StudentResponseDto } from '../../core/models/studentResponseDto';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student.html',
  styleUrls: ['./student.css']

})
export class StudentsComponent implements OnInit {

  students: StudentResponseDto[] = [];

  model = {
    id: -1,
    name: '',
    email: '',
    phone: ''
  };

  constructor(private service: StudentService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getAll().subscribe({
      next: (res: StudentResponseDto[]) => {
        this.students = res;
        this.cdr.detectChanges();
        },

      error: (err: any) => alert('Failed to load students')
    });
  }

  save() {
    // validation before API call
    if (!this.model.name || !this.model.email || !this.model.phone) {
      alert('Name, Email, and Phone are required');
      return;
    }

    const payload: StudentCreateDto = {
      name: this.model.name,
      email: this.model.email,
      phone: this.model.phone
    };

    if (this.model.id === -1) {
      // CREATE
      this.service.create(payload).subscribe({
        next: () => {
          alert('Student created successfully ✅');
          this.load();
          this.reset();
          this.cdr.detectChanges();
        },
        error: (err: any) => alert(err.error || 'Failed to create student')
      });
    } else {
      // UPDATE
      this.service.update(this.model.id, payload).subscribe({
        next: () => {
          alert('Student updated successfully ✅');
          this.load();
          this.reset();
          this.cdr.detectChanges();
        },
        error: (err: any) => alert(err.error || 'Failed to create student')
      });
    }
  }

  edit(student: StudentResponseDto) {
    this.model = {
      id: student.id,
      name: student.name,
      email: student.email,
      phone: student.phone
    };
  }

  delete(id: number) {
    if (!confirm('Delete this student?')) return;

    this.service.delete(id).subscribe({
      next: () => {
        alert('Student deleted ✅');
        this.load();
        this.cdr.detectChanges();
      },
      error: () => alert('Failed to delete student')
    });
  }

  reset() {
    this.model = { id: -1, name: '', email: '', phone: '' };
  }
}
