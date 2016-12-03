import { HomeComponent } from './pages/home.component';
import { ExamsIndexComponent } from './pages/exams/index.component';
import { ExamsTakeComponent } from './pages/exams/take.component';
import { ExamsResultComponent } from './pages/exams/result.component';
import { ExamsNewComponent } from './pages/exams/new.component';

export const routes = [
  { path: '', component: HomeComponent },
  { path: 'exams-index', component: ExamsIndexComponent },
  { path: 'exams-take/:id', component: ExamsTakeComponent },
  { path: 'exams-result', component: ExamsResultComponent },
  { path: 'exams-new', component: ExamsNewComponent },
];

export const navigatableComponents = [
  HomeComponent,
  ExamsIndexComponent,
  ExamsTakeComponent,
  ExamsResultComponent,
  ExamsNewComponent,
];
