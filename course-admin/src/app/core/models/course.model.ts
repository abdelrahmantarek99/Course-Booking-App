export interface Course {
  id: number;
  title: string;
  instructorId: number;
  instructorName?: string;
  durationHours: number;
  description: string;
  price: number;
}
