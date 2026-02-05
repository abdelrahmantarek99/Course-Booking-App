import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentCreateDto } from '../models/studentCreateDto';
import { StudentResponseDto } from '../models/studentResponseDto';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:5000/api/students';

  constructor(private http: HttpClient) { }

  getAll(): Observable<StudentResponseDto[]> {
    return this.http.get<StudentResponseDto[]>(this.apiUrl);
  }

  getById(id: number): Observable<StudentResponseDto> {
    return this.http.get<StudentResponseDto>(`${this.apiUrl}/${id}`);
  }

  create(dto: StudentCreateDto): Observable<StudentResponseDto> {
    return this.http.post<StudentResponseDto>(this.apiUrl, dto);
  }

  update(id: number, dto: StudentCreateDto): Observable<StudentResponseDto> {
    return this.http.put<StudentResponseDto>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
