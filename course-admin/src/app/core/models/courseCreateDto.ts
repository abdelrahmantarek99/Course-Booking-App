export interface CourseCreateDto {
  title: string;
  durationHours: number;
  description: string;
  price: number;
  instructorId: number;
}
