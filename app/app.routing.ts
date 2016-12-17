import { HomeComponent } from './pages/home.component';
import { ExamsIndexComponent } from './pages/exams/index.component';
import { ExamsTakeComponent } from './pages/exams/take.component';
import { ExamsResultComponent } from './pages/exams/result.component';
import { ExamsEditListComponent } from './pages/exams/editList.component';
import { ExamsCreateComponent } from './pages/exams/create.component';
import { ExamsEditComponent } from './pages/exams/edit.component';
import { UsersProfileComponent } from './pages/users/profile.component';
import { StopwatchComponent } from './pages/stopwatch.component';

export const routes = [
  { path: '', component: HomeComponent },
  { path: 'exams-index', component: ExamsIndexComponent },
  { path: 'exams-take/:id', component: ExamsTakeComponent },
  { path: 'exams-result', component: ExamsResultComponent },
  { path: 'exams-edit-list', component: ExamsEditListComponent },
  { path: 'exams-create', component: ExamsCreateComponent },
  { path: 'exams-edit/:id', component: ExamsEditComponent },
  { path: 'user-profile', component: UsersProfileComponent },
];

export const navigatableComponents = [
  HomeComponent,
  ExamsIndexComponent,
  ExamsTakeComponent,
  ExamsResultComponent,
  ExamsEditListComponent,
  ExamsCreateComponent,
  ExamsEditComponent,
  UsersProfileComponent,
  StopwatchComponent,
];
