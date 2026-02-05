import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnrollmentCreateDto } from '../models/enrollmentCreateDto';
import { EnrollmentResponseDto } from '../models/enrollmentResponseDto';

@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  private baseUrl = 'http://localhost:5000/api/enrollments';

  constructor(private http: HttpClient) { }

  create(dto: EnrollmentCreateDto) {
    return this.http.post<EnrollmentResponseDto>(this.baseUrl, dto);
  }

  getAll() {
    return this.http.get<EnrollmentResponseDto[]>(this.baseUrl);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
