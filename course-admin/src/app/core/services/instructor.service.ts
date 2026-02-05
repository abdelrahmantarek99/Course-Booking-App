import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Instructor } from '../models/instructor.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InstructorService {
  private apiUrl = 'http://localhost:5000/api/instructors';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(this.apiUrl);
  }

  create(data: Instructor): Observable<Instructor> {
    return this.http.post<Instructor>(this.apiUrl, data);
  }

  update(id: number, data: Instructor) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
