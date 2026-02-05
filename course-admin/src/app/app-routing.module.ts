// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout';
import { CoursesComponent } from './features/courses/courses';
import { InstructorsComponent } from './features/instructors/instructor';
import { WelcomeComponent } from './features/welcome/welcome'; 

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'welcome', pathMatch: 'full' }, // default -> welcome page
      { path: 'welcome', component: WelcomeComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'instructors', component: InstructorsComponent },
      // future: students and bookings can be added here
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
